<?php

namespace App;

use App\Traits\DeviceAuthTrait;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

class HardwareDevice extends Model
{
    use HasApiTokens, DeviceAuthTrait;

    /**
     * List the parameters that can be freely filled in the model
     *
     * @var array
     */
    protected $fillable = [
        //
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
