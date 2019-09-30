<?php

namespace App\Http\Controllers;

use Exception;
use App\Interaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InteractionController extends Controller
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
        $data = $request->input('data');

        // Retrieve the device that is submitting the data
        // NOTE: This is either a MobileDevice or HardwareDevice
        $device = Auth::user()->load('deployment');

        // GUARD: Device must have a linked deployment
        $deployment = $device->deployment;
        if (is_null($deployment)) {
            throw new Exception('No deployment is associated with the currently authenticated device');
        }

        // GUARD: Deployment must be active
        if (!$deployment->isCurrentlyActive()) {
            throw new Exception('Deployment is currently not active');
        }

        // Create interaction
        $deployment->interactions()->create([
            'data' => $data,
            'type' => Interaction::mapClassToType($device),
        ]);

        return [
            'success' => true
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Interaction  $interaction
     * @return \Illuminate\Http\Response
     */
    public function show(Interaction $interaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Interaction  $interaction
     * @return \Illuminate\Http\Response
     */
    public function edit(Interaction $interaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Interaction  $interaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Interaction $interaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Interaction  $interaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Interaction $interaction)
    {
        //
    }
}
