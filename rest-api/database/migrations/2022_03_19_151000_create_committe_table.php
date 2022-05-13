<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommitteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('committe', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('president')->nullable();
            $table->json('members')->nullable();
        });

        DB::table('committe')->insert(
            array(
                'president' => '',
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
        Schema::dropIfExists('committe');
    }
}
