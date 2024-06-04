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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('amount_paid');
            $table->enum('payment_status', ['Lunas', 'Belum Lunas']);
            $table->date('new_bill_date')->nullable();
            $table->date('start_bill_date')->nullable();
            $table->string('bill_payer');
            $table->enum('description', ['Satpam', 'Kebersihan']);
            $table->unsignedBigInteger('house_id')->nullable();
            $table->foreign('house_id')->references('id')->on('houses')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment');
    }
};
