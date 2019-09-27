<?php

namespace App;

use App\Events\HardwareDeviceCreating;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class HardwareDevice extends Model
{
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
