<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProtocolsSecondaryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('protocols_secondary', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('number');
            $table->date('date');
            $table->date('startDate');
            $table->date('endDate');
            $table->string('orderNumber');
            $table->date('orderDate');
            $table->string('president');
            $table->json('vicePresidents');
            $table->json('members');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('protocols_secondary');
    }
}
