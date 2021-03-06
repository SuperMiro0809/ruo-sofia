<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApplicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->date('dateOut')->nullable();
            $table->timestamps();
            $table->string('adress');
            $table->string('tel');
            $table->json('workplace');
            $table->json('education');
            $table->json('diploma');
            $table->string('ruoNumber')->unique();
            $table->string('ruoNumberOut')->nullable()->unique();
            $table->boolean('inProtocol')->default(false);
            $table->unsignedBigInteger('protocol_id')->nullable();
            $table->unsignedBigInteger('teacher_id');

            $table->foreign('teacher_id')->references('id')->on('teachers');
            $table->foreign('protocol_id')->references('id')->on('protocols');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applications');
    }
}
