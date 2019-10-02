<?php

namespace App;

use App\Traits\DeviceAuthTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class HardwareDevice extends Model implements DeviceInterface
{
    use HasApiTokens, DeviceAuthTrait, Notifiable;

    /**
     * List the parameters that can be freely filled in the model
     *
     * @var array
     */
    protected $fillable = [
        //
    ];

    /**
     * List the attributes that should be hidden when serialising
     *
     * @var array
     */
    protected $hidden = [
        'secret'
    ];

    /**
     * List the relationships that should always be loaded by default for this model
     *
     * @var array
     */
    protected $with = [
        'deployment'
    ];

    /**
     * Return the the channel on which events for this device should be broacast
     *
     * @return string
     */
    public function receivesBroadcastNotificationsOn()
    {
        return 'HardwareDevice.' . $this->attributes['key'];
    }

    /**
     * Retrieve the deployment associated with this device
     *
     * @return void
     */
    public function deployment()
    {
        return $this->hasOne(Deployment::class);
    }
}
