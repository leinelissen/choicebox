<?php

namespace App\Http\Controllers;

use App\Intervention;
use App\Deployment;
use Carbon\Carbon;
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
        $this->authorize('isActive', Deployment::class);

        $device = Auth::user()->load(['deployment', 'deployment.interventions' => function ($query) {
            $query->whereNotNull('interventions.dispatched_at');
        }]);

        return $device->deployment->interventions;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function unanswered()
    {
        $this->authorize('isActive', Deployment::class);

        $device = Auth::user()->load(['deployment.interventions' => function ($query) {
            $query->whereNotNull('interventions.dispatched_at')
                ->whereNull('interventions.responded_at');
        }]);

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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Intervention  $intervention
     * @return \Illuminate\Http\Response
     */
    public function respond(Request $request, Intervention $intervention)
    {
        $this->authorize('isActive', Deployment::class);
        $this->authorize('respond', $intervention);

        $data = $request->validate([
            'accepted_intervention' => 'required|boolean'
        ]);

        // GUARD: Deployment must be currently active
        if (!$intervention->deployment->isCurrentlyActive()) {
            throw new Exception('This deployment is not active at this moment');
        }

        // Modify the intervention with the new response
        $intervention->responded_at = Carbon::now();
        $intervention->accepted_intervention = (boolean) $data['accepted_intervention'];

        return $intervention;
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
