<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Config;

class PassportCustomProvider
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Retrieve parameters
        $params = $request->all();

        // Check if a provider has been set, if it has, overwrite the provider config
        if (array_key_exists('provider', $params)) {
            // Overwrite the Auth provider
            Config::set('auth.guards.api.provider', $params['provider']);
        }

        return $next($request);
    }
}
