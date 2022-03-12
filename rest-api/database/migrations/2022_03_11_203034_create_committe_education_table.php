<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommitteEducationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('committe_education', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('president')->nullable();
            $table->json('vicePresidents')->nullable();
            $table->json('members')->nullable();
        });

        DB::table('committe_education')->insert(
            array(
                'president' => '',
                'vicePresidents' => json_encode(['', '']),
                'members' => json_encode(['', '', '', ''])
            )
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('committe_education');
    }
}
