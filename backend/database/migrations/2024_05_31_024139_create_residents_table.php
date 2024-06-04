<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('residents', function (Blueprint $table) {

            $table->id();
            $table->string('full_name');
            $table->string('ktp_photo');
            $table->enum('residency_status', ['Contract', 'Permanent']);
            $table->string('phone_number');
            $table->enum('marital_status', ['Married', 'Single']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resident');
    }
};
