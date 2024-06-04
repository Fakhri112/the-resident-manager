<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\Resident;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ResidentController extends Controller
{
    public function index()
    {
        $residents = Resident::all();
        foreach ($residents as $key => $resident) {
            $residents[$key]['ktp_photo'] = url('storage/ktp_photo/' . $resident['ktp_photo']);
        }
        return $residents;
    }


    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'full_name' => 'required|string|max:255',
                'ktp_photo' => 'required|file|mimes:jpg,jpeg,png',
                'residency_status' => 'required|in:Contract,Permanent',
                'phone_number' => 'required|string|max:255',
                'marital_status' => 'required|in:Married,Single',
            ]);

            $resident = Resident::create($validatedData);

            $photoName = $resident->id . '.' . $request->ktp_photo->getClientOriginalExtension();
            $request->ktp_photo->storeAs('public/ktp_photo', $photoName);
            $resident->ktp_photo = $photoName;
            $resident->save();

            return response()->json([
                'status' => 200,
                'message' => 'Data Penghuni Ditambahkan 😁',
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
                'full_name' => 'required|string|max:255',
                'residency_status' => 'required|in:Contract,Permanent',
                'phone_number' => 'required|string|max:255',
                'marital_status' => 'required|in:Married,Single',
            ]);

            Resident::find($id)->update($validatedData);

            if ($request->hasFile('ktp_photo')) {
                $request->validate([
                    'ktp_photo' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
                ]);

                $getfilename = Resident::find($id)->ktp_photo;
                Storage::disk('local')->delete('public/ktp_photo/' . $getfilename);
                $photoName = $id . '.' . $request->ktp_photo->getClientOriginalExtension();
                $request->ktp_photo->storeAs('public/ktp_photo', $photoName);
                Resident::find($id)->update([
                    'ktp_photo' => $photoName,
                    'updated_at' => Carbon::now()
                ]);
            }

            return response()->json(['message' => 'Data Penghuni Berhasil diperbaruhi 😁']);
        } catch (ValidationException $exception) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $exception->errors()
            ], 422);
        }
    }
    public function destroy(int $id)
    {
        $resident = Resident::findOrFail($id);
        $house = House::where('resident_id', $id)->first();
        if (optional($house)->resident_id) return response()->json(['message' => 'Penghuni Masih Menempati Rumah Di Jalan '.$house->address.' 🏡', 'status'=>422]);

        Storage::delete('public/ktp_photo/' . $resident->ktp_photo);
        $resident->delete();

        return response()->json(['message' => 'Data Penghuni Berhasil dihapus 😉']);
    }
}
