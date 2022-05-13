<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePublicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('institution');
            $table->date('startDate');
            $table->date('endDate');
            $table->string('theme');
            $table->string('published');
            $table->string('approve')->nullable();
            $table->string('notApprove')->nullable();
            $table->integer('credits')->nullable();
            $table->unsignedBigInteger('teacher_id');
            $table->unsignedBigInteger('application_id');
            
            $table->foreign('teacher_id')->references('id')->on('teachers');
            $table->foreign('application_id')->references('id')->on('applications');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('publications');
    }
}
