<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProtocolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('protocols', function (Blueprint $table) {
            $table->bigIncrements('id');
            // $table->unsignedBigInteger('application_id');
            $table->json('applications');
            $application_id = DB::connection()->getQueryGrammar()->wrap('applications->application_id');
            $table->unsignedBigInteger('application_id')->storedAs($application_id);
            $table->timestamps();
            $table->integer('number');
            $table->date('date');
            $table->string('about');
            $table->string('president');
            $table->json('members');

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
        Schema::dropIfExists('protocols');
    }
}