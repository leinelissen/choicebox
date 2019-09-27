<?php

namespace App;

use App\Events\MobileDeviceCreating;
use Illuminate\Database\Eloquent\Model;

class MobileDevice extends Model
{
    /**
     * The constant that are available for the type field
     *
     * @var array
     */
    public $types = [
        'ios' => 'IOS',
        'android' => 'ANDROID',
    ];

    /**
     * List the parameters that can be freely filled in the model
     *
     * @var array
     */
    protected $fillable = [
        'type',
        'expo_token',
    ];

    /**
     * Retrieve the deployment associated with this device
     *
     * @return void
     */
    public function deployment()
    {
        return $this->belongsTo(Deployment::class);
    }
}
