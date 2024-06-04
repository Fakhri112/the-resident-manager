<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

use function Laravel\Prompts\error;

class HouseController extends Controller
{


    public function getUnoccupied()
    {
        $houses = House::where('occupancy_status', 'Unoccupied')->select("*", 'houses.id as house_id')->get()->toArray();

        if (count($houses)==0) return [];
        foreach ($houses as $key => $value) {
            $houses[$key]['payment'] = [];
        }
        $payment = Payment::orderBy('id', 'desc')->get();
        foreach ($payment as $key => $valuePayment) {
            $indexSearch = array_search($valuePayment->house_id, array_column($houses, 'house_id'));
            $finishReplace = false;
            foreach ($houses[$indexSearch]['payment'] as $key => $valueHouse) {
                if ($valuePayment['start_bill_date'] == $valueHouse['start_bill_date']) {
                    $houses[$indexSearch]['payment'][$key]['amount_paid'] = (int) $houses[$indexSearch]['payment'][$key]['amount_paid'] + (int) $valuePayment['amount_paid'];
                    $houses[$indexSearch]['payment'][$key]['description'] = 'Satpam dan Kebersihan';
                    $houses[$indexSearch]['payment'][$key]['ids'] = [$houses[$indexSearch]['payment'][$key]['id'], $valuePayment['id']];
                    unset($houses[$indexSearch]['payment'][$key]['id']);
                    $finishReplace = true;
                }
            }
            if (!$finishReplace) $houses[$indexSearch]['payment'][] = $valuePayment;
        }
        return $houses;
    }

    public function getOccupied()
    {
        $houses = House::join('residents', 'residents.id', '=', 'houses.resident_id')->select("*", 'houses.id as house_id')->get()->toArray();
        if (count($houses)==0) return [];
        foreach ($houses as $key => $value) {
            $houses[$key]['payment'] = [];
        }
        $payment = Payment::orderBy('id', 'desc')->get();
        foreach ($payment as $key => $valuePayment) {
            $indexSearch = array_search($valuePayment->house_id, array_column($houses, 'house_id'));
            $finishReplace = false;
            foreach ($houses[$indexSearch]['payment'] as $key => $valueHouse) {
                if ($valuePayment['start_bill_date'] == $valueHouse['start_bill_date']) {
                    $houses[$indexSearch]['payment'][$key]['amount_paid'] = (int) $houses[$indexSearch]['payment'][$key]['amount_paid'] + (int) $valuePayment['amount_paid'];
                    $houses[$indexSearch]['payment'][$key]['description'] = 'Satpam dan Kebersihan';
                    $houses[$indexSearch]['payment'][$key]['ids'] = [$houses[$indexSearch]['payment'][$key]['id'], $valuePayment['id']];
                    unset($houses[$indexSearch]['payment'][$key]['id']);
                    $finishReplace = true;
                }
            }
            if (!$finishReplace) $houses[$indexSearch]['payment'][] = $valuePayment;
        }
        return $houses;
    }



    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'address' => 'required|string|max:255',
                'number' =>  'required|string|max:10',
                'occupancy_status' => 'required|in:Occupied,Unoccupied',
                'payment_type' => 'required|in:Monthly,Yearly',
            ]);

            if ($request->input('occupancy_status') === 'Occupied') {
                $validatedData['resident_id'] = $request->validate([
                    'resident_id' => 'required',
                ])['resident_id'];
            }

            House::create($validatedData);

            return response()->json([
                'status' => 200,
                'message' => 'Data Rumah Ditambahkan 😄',
            ]);
        } catch (ValidationException $exception) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $exception->errors()
            ], 422);
        }
    }


    public function update(Request $request, $id)
    {
        try {

            $validatedData = $request->validate([
                'address' => 'required|string|max:255',
                'number' =>  'required|string|max:10',
                'occupancy_status' => 'required|in:Occupied,Unoccupied',
                'payment_type' => 'required|in:Monthly,Yearly',
            ]);

            $queryHousePayment = House::join('payments', 'payments.house_id', '=', 'houses.id');

            $getLatestPayment = $queryHousePayment->where('houses.id', $id)->first();

            if (
                optional($getLatestPayment)->payment_type == "Yearly" &&
                $request->input('payment_type') == "Monthly" &&
                optional($getLatestPayment)->payment_status == "Belum Lunas" &&
                Carbon::parse(optional($getLatestPayment)->start_bill_date) < Carbon::parse(optional($getLatestPayment)->new_bill_date)
            ) {
                return response()->json(['message' => 'Lunasi Terlebih Dahulu Tagihan Tahunannya 😪', 'status' => 422]);
            }

            $getPaidOffData = $queryHousePayment->where('payments.payment_status', "Belum Lunas")->first();
            //return response()->json(['message' => 'Data Rumah Berhasil diperbaruhi 😁', 'data'=> $getPaidOffData]);


            if (
                optional($getLatestPayment)->occupancy_status == "Occupied" &&
                $request->input('occupancy_status') == "Unoccupied" &&
                optional($getPaidOffData)->payment_status == "Belum Lunas"
            ) {
                return response()->json(['message' => 'Lunasi Terlebih Dahulu Tagihan Sebelumnya 😪', 'status' => 422]);
            }

            if ($request->input('occupancy_status') === 'Occupied') {
                $validatedData['resident_id'] = $request->validate([
                    'resident_id' => 'required',
                ])['resident_id'];
            } else {
                $validatedData['resident_id'] = NULL;
            }

            House::find($id)->update($validatedData);
            return response()->json(['message' => 'Data Rumah Berhasil diperbaruhi 😁']);
        } catch (ValidationException $exception) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $exception->errors()
            ], 422);
        }
    }
    public function destroy(int $id)
    {
        Payment::where('house_id', $id);
        $house = House::findOrFail($id);
        $house->delete();

        return response()->json(['message' => 'Data Rumah Berhasil dihapus 😉']);
    }
}
