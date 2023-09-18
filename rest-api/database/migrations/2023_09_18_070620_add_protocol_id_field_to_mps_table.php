<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProtocolIdFieldToMpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('mps', function (Blueprint $table) {
            $table->unsignedBigInteger('protocol_id')->nullable();

            $table->foreign('protocol_id')->references('id')->on('protocols_mps');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mps', function (Blueprint $table) {
            $table->dropColumn('protocol_id');
        });
    }
}
