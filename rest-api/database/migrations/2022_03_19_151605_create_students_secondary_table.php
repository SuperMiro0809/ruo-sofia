<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsSecondaryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students_secondary', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->string('egn')->unique();
            $table->date('dateOfBirth');
            $table->string('citizenship');
            $table->string('school');
            $table->string('cityAndCountry');
            $table->string('registerNumber');
            $table->date('dateOut');
            $table->string('documentNumber')->nullable();
            $table->date('documentDate');
            $table->string('inNumber');
            $table->date('inDate');
            $table->string('admits');
            $table->string('profession')->nullable();
            $table->string('speciality')->nullable();
            $table->json('grades');
            $table->unsignedBigInteger('protocol_id')->nullable();

            $table->foreign('protocol_id')->references('id')->on('protocols_secondary');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students_secondary');
    }
}
