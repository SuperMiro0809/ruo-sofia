<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeachersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->date('dateOfBirth');
            $table->string('firstName');
            $table->string('middleName');
            $table->string('lastName');

            $table->json('applications');
            $application_id = DB::connection()->getQueryGrammar()->wrap('applications->application_id');
            $table->unsignedBigInteger('application_id')->storedAs($application_id);

            $table->foreign('application_id')->references('id')->on('applications');
        });

        Schema::table('applications', function (Blueprint $table) {
            $table->foreign('teacher_id')->references('id')->on('teachers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::table('applications', function(Blueprint $table){
            $table->dropForeign(['teacher_id']);
        });

        Schema::dropIfExists('applications');
        Schema::enableForeignKeyConstraints();

        Schema::dropIfExists('teachers');
    }
}
