<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInterventionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interventions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('deployment_id')->references('id')->on('deployments');
            $table->unsignedBigInteger('intervention_template_id')->references('id')->on('deployments');
            $table->string('title');
            $table->text('message');
            $table->json('parameters');
            $table->dateTime('scheduled_for_dispatch_at');
            $table->dateTime('dispatched_at')->nullable();
            $table->dateTime('responded_at')->nullable();
            $table->boolean('accepted_intervention')->nullable();
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
        Schema::dropIfExists('interventions');
    }
}
