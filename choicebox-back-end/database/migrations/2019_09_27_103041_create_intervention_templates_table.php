<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInterventionTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('intervention_templates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('type');
            $table->string('default_title');
            $table->text('default_message');
            $table->string('default_parameters');
            $table->string('json_schema');
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
        Schema::dropIfExists('intervention_templates');
    }
}
