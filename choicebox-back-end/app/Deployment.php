<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Deployment extends Model
{
    /**
     * The attributes of the model that can be freely assigned
     *
     * @var array
     */
    protected $fillable = [
        'participant_identifier',
        'deployment_start',
        'deployment_end',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'deployment_start' => 'datetime',
        'deployment_end' => 'datetime',
    ];

    /**
     * Get the hardware device associated with the deployment
     *
     * @return App\HardwareDevice
     */
    public function hardwareDevice()
    {
        return $this->belongsTo(HardwareDevice::class);
    }

    /**
     * Get the mobile device associated with the deployment
     *
     * @return App\MobileDevice
     */
    public function mobileDevice()
    {
        return $this->belongsTo(MobileDevice::class);
    }

    /**
     * Retrieve the interactions that are associatd with this deployment
     *
     * @return App\Interaction
     */
    public function interactions()
    {
        return $this->hasMany(Interaction::class);
    }

    /**
     * Retrieve the interventions that have been planned for this deployment
     *
     * @return App\Intervention
     */
    public function interventions()
    {
        return $this->hasMany(Intervention::class);
    }

    /**
     * Utility function to determine whether this deployment is currently active
     *
     * @return boolean
     */
    public function isCurrentlyActive()
    {
        return $this->deployment_start <= Carbon::now()
            && $this->deployment_end >= Carbon::now();
    }
}