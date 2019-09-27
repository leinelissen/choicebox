<?php

namespace App\Observers;

use App\MobileDevice;

class MobileDeviceObserver
{
    /**
     * Handle the mobile device "created" event.
     *
     * @param  \App\MobileDevice  $mobileDevice
     * @return void
     */
    public function created(MobileDevice $mobileDevice)
    {
        $mobileDevice->key = Str::uuid();
        $mobileDevice->secret = Str::random(64);
    }

    /**
     * Handle the mobile device "updated" event.
     *
     * @param  \App\MobileDevice  $mobileDevice
     * @return void
     */
    public function updated(MobileDevice $mobileDevice)
    {
        //
    }

    /**
     * Handle the mobile device "deleted" event.
     *
     * @param  \App\MobileDevice  $mobileDevice
     * @return void
     */
    public function deleted(MobileDevice $mobileDevice)
    {
        //
    }

    /**
     * Handle the mobile device "restored" event.
     *
     * @param  \App\MobileDevice  $mobileDevice
     * @return void
     */
    public function restored(MobileDevice $mobileDevice)
    {
        //
    }

    /**
     * Handle the mobile device "force deleted" event.
     *
     * @param  \App\MobileDevice  $mobileDevice
     * @return void
     */
    public function forceDeleted(MobileDevice $mobileDevice)
    {
        //
    }
}
