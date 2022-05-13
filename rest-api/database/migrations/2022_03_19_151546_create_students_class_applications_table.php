<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsClassApplicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students_class_applications', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('registerNumber');
            $table->date('dateOut');
            $table->string('documentNumber')->nullable();
            $table->date('documentDate');
            $table->string('inNumber');
            $table->date('inDate');
            $table->string('class');
            $table->string('admits');
            $table->date('equivalenceExamsDate')->nullable();
            $table->json('equivalenceExams');
            $table->json('grades');
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('protocol_id')->nullable();
            
            $table->foreign('student_id')->references('id')->on('students_class');
            $table->foreign('protocol_id')->references('id')->on('protocols_class');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students_class_applications');
    }
}
