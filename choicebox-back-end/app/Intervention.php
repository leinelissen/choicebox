<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Intervention extends Model
{
    /**
     * The constant that are available for the type field
     *
     * @var array
     */
    public $types = [
        'hardware' => 'HARDWARE',
        'mobile' => 'MOBILE',
    ];

    /**
     * The attributes that can be freely assigned to the model
     *
     * @var array
     */
    public $fillable = [
        'title',
        'message',
        'parameters',
        'scheduled_for_dispatch_at',
        'dispatched_at',
        'responded_at',
        'accepted_intervention',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'scheduled_for_dispatch_at' => 'datetime',
        'dispatched_at' => 'datetime',
        'responded_at' => 'datetime',
        'parameters' => 'array'
    ];

    /**
     * Retrieve the deployment associated with the intervention
     *
     * @return App\Deployment
     */
    public function deployment()
    {
        return $this->belongsTo(Deployment::class);
    }

    /**
     * Retrieve the intervention template on which this intervention is based
     *
     * @return App\InterventionTemplate
     */
    public function interventionTemplate()
    {
        return $this->belongsTo(InterventionTemplate::class);
    }
}
