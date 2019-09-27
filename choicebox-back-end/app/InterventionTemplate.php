<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InterventionTemplate extends Model
{
    /**
     * The constant that are available for the type field
     *
     * @var array
     */
    public $types = [
        'access_request' => 'ACCESS_REQUEST',
        'ai' => 'AI',
        'offer_commercial' => 'OFFER_COMMERCIAL',
        'offer_research' => 'OFFER_RESEARCH',
    ];

    /**
     * The attributes that can be freely assigned
     *
     * @var array
     */
    protected $fillable = [
        'type',
        'default_title',
        'default_message',
        'default_parameters',
        'json_schema',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'default_parameters' => 'array',
        'json_schema' => 'array',
    ];

    /**
     * Retrieve the interventions that have been based on this template
     *
     * @return App\Intervention
     */
    public function intervention()
    {
        return $this->hasMany(Intervention::class);
    }
}
