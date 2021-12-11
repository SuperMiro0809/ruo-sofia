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
            $table->bigIncrements('id');
            $table->unsignedBigInteger('teacher_id');
            $table->timestamps();
            $table->string('adress');
            $table->string('tel');
            $table->json('workplace');
            $table->json('education');
            $table->json('diploma');
            $table->string('number')->nullable();
            $table->string('ruoNumber')->nullable();
            $table->string('approve')->nullable();
            $table->string('notApprove')->nullable();
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
