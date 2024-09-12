<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\House;
use App\Models\Income;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;


class PaymentController extends Controller
{
    public function sendBill(Request $request)
    {
        try {
            $request->validate([
                'simulate_date_now' => 'required|string|max:255',
                'bill_detail' => 'required',
            ]);

            $getOccupiedHouse = House::join('residents', 'residents.id', '=', 'houses.resident_id')->select('*', 'houses.id as house_id')->get();

            if (count($getOccupiedHouse) == 0)
                return response()->json(['message' => 'Tidak Ada Rumah yang Ditinggali 😣']);
            foreach ($getOccupiedHouse as $key => $house) {


                $getLatestPayment = House::join('payments', 'payments.house_id', '=', 'houses.id')
                    ->where('houses.id', $house->house_id)
                    ->select('payments.new_bill_date as payment_update', 'payments.payment_status', 'houses.payment_type as payment_type');

                if ($house->payment_type == "Monthly") {
                    $getLatestPayment = $getLatestPayment->where('payment_type', 'Monthly');
                } else {
                    $getLatestPayment = $getLatestPayment->where('payment_type', 'Yearly');
                }
                $getLatestPayment = $getLatestPayment->orderBy('payments.updated_at', 'desc')->first();
                if (
                    !$getLatestPayment ||
                    Carbon::parse($getLatestPayment->payment_update)  <=  Carbon::parse(
                        $request->input('simulate_date_now')
                    )
                ) {
                    error_log($house->house_id);
                    if ($house->payment_type == "Monthly") {
                        foreach ($request->input('bill_detail') as $key => $amount) {
                            $payment = new Payment();
                            $payment->amount_paid = (int) $amount;
                            $payment->payment_status = 'Belum Lunas';
                            $payment->bill_payer = $house->full_name;
                            $payment->house_id = $house->house_id;
                            $payment->description = $key == 0 ? "Satpam" : "Kebersihan";
                            $payment->new_bill_date = Carbon::parse($request->input('simulate_date_now'))->addMonth();
                            $payment->start_bill_date = Carbon::parse($request->input('simulate_date_now'));
                            $payment->save();
                        }
                    } else {
                        foreach ($request->input('bill_detail') as $key => $amount) {
                            $payment = new Payment();
                            $payment->amount_paid = (int) $amount * 12;
                            $payment->payment_status = 'Belum Lunas';
                            $payment->bill_payer = $house->full_name;
                            $payment->house_id = $house->house_id;
                            $payment->description = $key == 0 ? "Satpam" : "Kebersihan";
                            $payment->new_bill_date = Carbon::parse($request->input('simulate_date_now'))->addYear();
                            $payment->start_bill_date = Carbon::parse($request->input('simulate_date_now'));
                            $payment->save();
                        }
                    }
                }
            }
            return response()->json(['message' => 'Tagihan Bulan Ini Berhasil Dikirmkan 🤑']);
        } catch (ValidationException $exception) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $exception->errors()
            ], 422);
        }
    }

    public function paidOff(Request $request, $id)
    {
        $payment = Payment::find($id);
        Income::create([
            'income_date' => $payment->start_bill_date,
            'income_description' => 'Iuran ' . $payment->description,
            'income_amount' => $payment->amount_paid
        ]);
        $payment->update([
            'payment_status' => 'Lunas',
            'updated_at' => Carbon::now()
        ]);
        return response()->json([
            'status' => 200,
            'message' => 'Berhasil! Penghuni ini sudah lunas iuran ' . $payment->description .  ' 😍',
        ]);
    }

    public function editPayment(Request $request)
    {
            $request->validate([
                'new_bill_date' => 'required|string|max:255',
                'bills' => 'required',
                'ids' => 'required',
            ]);

            foreach ($request->input('ids') as $key => $amount) {     
            $payment = Payment::find($amount);
            $payment->update([
                'new_bill_date' => $request->input("new_bill_date"),
                'amount_paid' => $request->input('bills')[$key],
                'updated_at' => Carbon::now()
            ]);}

             return response()->json([
                'status' => 200,
                'message' => 'Berhasil mengubah periode iuran ✨',
            ]);

    }

    public function expense(Request $request)
    {
        try {
            $request->validate([
                'expense_date' => 'required',
                'expense_description' =>  'required|string|max:255',
                'expense_amount' => 'required|numeric'
            ]);
            Expense::create([
                'expense_date' => Carbon::parse($request->input('expense_date')),
                'expense_description' =>  $request->input('expense_description'),
                'expense_amount' => $request->input('expense_amount'),
                'created_at'=> Carbon::now(),
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Pengeluaran Anda Ditambahkan ✨',
            ]);
        } catch (ValidationException $exception) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $exception->errors()
            ], 422);
        }
    }
    public function report(Request $request)
    {
        $expense = Expense::get()->toArray();
        $income = Income::get()->toArray();

        $totalReport =
            array_merge($expense, $income);
        
        foreach ($totalReport as $key => $valueReport) {
            if (array_key_exists('expense_date', $totalReport[$key])){
                $date =  $totalReport[$key]['expense_date'];
                 $totalReport[$key]['sort_date'] =  $date;
                 $totalReport[$key]['expense_date'] = Carbon::parse($date)->format('M, Y');
                
            }else{
                 $date =  $totalReport[$key]['income_date'];
                  $totalReport[$key]['sort_date'] =  $date;
                  $totalReport[$key]['income_date'] = Carbon::parse($date)->format('M, Y');
            }
        }

        $grouped = array_reduce($totalReport, function ($carry, $item) {
            $date = isset($item['income_date']) ? $item['income_date'] : $item['expense_date'];
            $carry[$date]['income_sum'] = isset($carry[$date]['income_sum']) ? $carry[$date]['income_sum'] : 0;
            $carry[$date]['expense_sum'] = isset($carry[$date]['expense_sum']) ? $carry[$date]['expense_sum'] : 0;
            if (isset($item['income_amount'])) {
                $carry[$date]['income_sum'] += (int) $item['income_amount']; 
            } else {
                $carry[$date]['expense_sum'] += (int) $item['expense_amount']; 
            }
            $carry[$date]['balance'] = $carry[$date]['income_sum'] - $carry[$date]['expense_sum'];
            $carry[$date]['sort_date'] =  $item['sort_date'];
            $carry[$date]['date'] = $date;
            $carry[$date]['items'][] = $item;
            return $carry;
        }, []);

        $dates = array();
        foreach ($grouped as $key => $row) {
            $dates[$key] = Carbon::parse(($row['sort_date']));
        }
        array_multisort($dates, SORT_ASC, $grouped);
        return array_values($grouped);
    }
}
