<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

use App\Interaction;

// Channel for sending commands to a hardware device
Broadcast::channel('HardwareDevice.{key}', function ($device, $key) {
    return (string) $device->key === (string) $key;
});

// Presence channel for checking whether devices are online in a deployment
Broadcast::channel('Deployment.{id}', function ($device, $id) {
    return (int) $device->deployment->id === (int) $id
        ? [
            'id' => $device->id,
            'key' => $device->key, 
            'type' => Interaction::mapClassToType($device), 
        ]
        : false;
});
