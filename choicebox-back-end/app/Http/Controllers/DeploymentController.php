<?php

namespace App\Http\Controllers;

use App\Deployment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DeploymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Auth::user()->deployment;
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Deployment  $deployment
     * @return \Illuminate\Http\Response
     */
    public function show(Deployment $deployment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Deployment  $deployment
     * @return \Illuminate\Http\Response
     */
    public function edit(Deployment $deployment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Deployment  $deployment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Deployment $deployment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Deployment  $deployment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Deployment $deployment)
    {
        //
    }
}
