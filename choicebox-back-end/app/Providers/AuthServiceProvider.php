<?php

namespace App\Providers;

use App\Intervention;
use App\Policies\DeploymentPolicy;
use App\Policies\InterventionPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Intervention::class => InterventionPolicy::class,
        Deployment::class => DeploymentPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Encapsulate all passport routes in provider-selection middleware, so
        // that multiple models can apply for tokens
        Route::group(['middleware' => 'passport-devices'], function () {
            Passport::routes();
        });
    }
}
