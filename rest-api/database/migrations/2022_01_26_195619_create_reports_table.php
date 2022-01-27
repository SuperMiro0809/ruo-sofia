<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('institution');
            $table->date('startDate');
            $table->date('endDate');
            $table->integer('lessonHours');
            $table->string('theme');
            $table->string('approve')->nullable();
            $table->string('notApprove')->nullable();
            $table->integer('credits')->nullable();
            $table->unsignedBigInteger('teacher_id');
            $table->unsignedBigInteger('application_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reports');
    }
}
