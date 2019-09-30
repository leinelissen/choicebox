<?php

namespace App\Http\Controllers;

use Exception;
use App\HardwareDevice;
use App\MobileDevice;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MobileDeviceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate data
        $data = $request->validate([
            'hardware_key' => 'required|string|min:16|max:200',
            'type' => [
                'required',
                Rule::in([
                    MobileDevice::$types_ios,
                    MobileDevice::$types_android,
                ]),
            ],
            'expo_token' => 'required|string|min:16|max:200',
        ]);

        // Retrieve the hardware device that was referenced to
        $hardwareDevice = HardwareDevice::where('key', $data['hardware_key'])
            ->with('deployment')
            ->first();
            
        // GUARD: Device must exist
        if (is_null($hardwareDevice)) {
            throw new Exception('The hardware device key does not exist');
        }

        // GUARD: Device must have an deployment
        $deployment = $hardwareDevice->deployment;
        if (is_null($deployment)) {
            throw new Exception('The hardware device has no linked deployment');
        }

        // GUARD: Deployment must be currently active
        if (!$deployment->isCurrentlyActive()) {
            throw new Exception('This deployment is not active at this moment');
        }

        // Create mobile device and relationship to deployment
        $mobileDevice = $deployment->mobileDevice()->create($data);

        return $mobileDevice;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\MobileDevice  $mobileDevice
     * @return \Illuminate\Http\Response
     */
    public function show(MobileDevice $mobileDevice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\MobileDevice  $mobileDevice
     * @return \Illuminate\Http\Response
     */
    public function edit(MobileDevice $mobileDevice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\MobileDevice  $mobileDevice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MobileDevice $mobileDevice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\MobileDevice  $mobileDevice
     * @return \Illuminate\Http\Response
     */
    public function destroy(MobileDevice $mobileDevice)
    {
        //
    }
}
