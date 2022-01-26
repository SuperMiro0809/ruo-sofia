<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeachingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teachings', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('institution');
            $table->integer('eik');
            $table->string('period');
            $table->integer('lessonHours');
            $table->string('theme');
            $table->string('approve');
            $table->string('notApprove');
            $table->integer('credits');
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
        Schema::dropIfExists('teachings');
    }
}
