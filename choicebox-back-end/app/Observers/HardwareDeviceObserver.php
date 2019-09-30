<?php

namespace App\Observers;

use App\HardwareDevice;
use Illuminate\Support\Str;

class HardwareDeviceObserver
{
    /**
     * Handle the hardware device "created" event.
     *
     * @param  \App\HardwareDevice  $hardwareDevice
     * @return void
     */
    public function creating(HardwareDevice $hardwareDevice)
    {
        $hardwareDevice->key = Str::uuid();
        $hardwareDevice->secret = Str::random(64);
    }

    /**
     * Handle the hardware device "updated" event.
     *
     * @param  \App\HardwareDevice  $hardwareDevice
     * @return void
     */
    public function updated(HardwareDevice $hardwareDevice)
    {
        //
    }

    /**
     * Handle the hardware device "deleted" event.
     *
     * @param  \App\HardwareDevice  $hardwareDevice
     * @return void
     */
    public function deleted(HardwareDevice $hardwareDevice)
    {
        //
    }

    /**
     * Handle the hardware device "restored" event.
     *
     * @param  \App\HardwareDevice  $hardwareDevice
     * @return void
     */
    public function restored(HardwareDevice $hardwareDevice)
    {
        //
    }

    /**
     * Handle the hardware device "force deleted" event.
     *
     * @param  \App\HardwareDevice  $hardwareDevice
     * @return void
     */
    public function forceDeleted(HardwareDevice $hardwareDevice)
    {
        //
    }
}
