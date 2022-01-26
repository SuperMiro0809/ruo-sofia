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
            $table->string('period');
            $table->string('theme');
            $table->string('published');
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
        Schema::dropIfExists('publications');
    }
}
