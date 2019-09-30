<?php

namespace App\Traits;

trait DeviceAuthTrait {
    /**
     * Find the device instance for the given username.
     *
     * @param  string  $key
     * @return \App\MobileDevice
     */
    public function findForPassport($key)
    {
        return $this->where('key', $key)->first();
    }

    /**
    * Validate the password of the device for the Passport password grant.
    *
    * @param  string $secret
    * @return bool
    */
    public function validateForPassportPasswordGrant($secret)
    {
        return $secret === $this->secret;
    }

    /**
     * Get the unique identifier for the device.
     *
     * @return string
     */
    public function getAuthIdentifier()
    {
        return $this->attributes['key'];
    }

    /**
     * Get the name of the unique identifier for the device
     *
     * @return string
     */
    public function getAuthIdentifierName()
    {
        return 'key';
    }
}