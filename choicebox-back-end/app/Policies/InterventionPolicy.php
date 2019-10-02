<?php

namespace App\Policies;

use App\DeviceInterface;
use App\Intervention;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class InterventionPolicy
{
    use HandlesAuthorization;
    
    /**
     * Determine whether the requesting device is allowed to respond
     *
     * @param MobileDevice $device
     * @param Intervention $intervention
     * @return boolean
     */
    public function respond(DeviceInterface $device, Intervention $intervention)
    {
        return $device->deployment->id === $intervention->deployment_id
            ? Response::allow()
            : Response::deny('The intervention does not belong to the deployment linked to the authenticated device.');
    }
}
