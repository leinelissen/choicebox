<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeploymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deployments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('participant_identifier');
            $table->unsignedBigInteger('hardware_device_id')->references('id')->on('hardware_devices')->nullable();
            $table->unsignedBigInteger('mobile_device_id')->references('id')->on('mobile_devices')->nullable();
            $table->dateTime('deployment_start')->nullable();
            $table->dateTime('deployment_end')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deployments');
    }
}
