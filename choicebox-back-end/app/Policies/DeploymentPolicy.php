<?php

namespace App\Policies;

use App\DeviceInterface;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class DeploymentPolicy
{
    use HandlesAuthorization;

    /**
     * Authorisation functin to check whether the deployment is currently active
     *
     * @param DeviceInterface $device
     * @return void
     */
    public function isActive(DeviceInterface $device)
    {
        // GUARD: Device must have an deployment
        $deployment = $device->deployment;
        if (is_null($deployment)) {
            return Response::deny('The authenticated device has no linked deployment');
        }

        // GUARD: Deployment must be currently active
        if (!$deployment->isCurrentlyActive()) {
            return Response::deny('The deployment that is linked to the currently authenticated device is not active at this moment');
        }

        return Response::allow();
    }
}
