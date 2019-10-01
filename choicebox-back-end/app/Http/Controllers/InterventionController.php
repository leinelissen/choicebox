<?php

namespace App\Http\Controllers;

use App\Intervention;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InterventionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $device = Auth::user()->load(['deployment', 'deployment.interventions' => function ($query) {
            $query->whereNotNull('interventions.dispatched_at');
        }]);

        // GUARD: Device must have an deployment
        $deployment = $device->deployment;
        if (is_null($deployment)) {
            throw new Exception('The hardware device has no linked deployment');
        }

        // GUARD: Deployment must be currently active
        if (!$deployment->isCurrentlyActive()) {
            throw new Exception('This deployment is not active at this moment');
        }

        return $deployment->interventions;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function unanswered()
    {
        $device = Auth::user()->load(['deployment.interventions' => function ($query) {
            $query->whereNotNull('interventions.dispatched_at')
                ->whereNull('interventions.responded_at');
        }]);

        // GUARD: Device must have an deployment
        $deployment = $device->deployment;
        if (is_null($deployment)) {
            throw new Exception('The hardware device has no linked deployment');
        }

        // GUARD: Deployment must be currently active
        if (!$deployment->isCurrentlyActive()) {
            throw new Exception('This deployment is not active at this moment');
        }

        return $device->deployment->interventions;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Intervention  $intervention
     * @return \Illuminate\Http\Response
     */
    public function show(Intervention $intervention)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Intervention  $intervention
     * @return \Illuminate\Http\Response
     */
    public function edit(Intervention $intervention)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Intervention  $intervention
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Intervention $intervention)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Intervention  $intervention
     * @return \Illuminate\Http\Response
     */
    public function destroy(Intervention $intervention)
    {
        //
    }
}
