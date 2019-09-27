<?php

namespace App\Providers;

use App\HardwareDevice;
use App\MobileDevice;
use App\Observers\HardwareDeviceObserver;
use App\Observers\MobileDeviceObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        HardwareDevice::observe(HardwareDeviceObserver::class);
        MobileDevice::observe(MobileDeviceObserver::class);
    }
}
