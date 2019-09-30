<?php

namespace App;

use App\Traits\DeviceAuthTrait;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

class MobileDevice extends Model
{
    use HasApiTokens, DeviceAuthTrait;

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
