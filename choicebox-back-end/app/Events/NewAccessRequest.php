<?php

namespace App\Events;

use App\Intervention;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewAccessRequest
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $intervention;
    public $hardwareDevice;
    public $mobileDevice;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Intervention $intervention)
    {
        $this->intervention = $intervention->load(['deployment.hardwareDevice', 'deployment.mobileDevice']);
        $this->hardwareDevice = $this->intervention->deployment->hardwareDevice;
        $this->mobileDevice = $this->intervention->deployment->mobileDevice;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel("HardwareDevice.{$this->deployment->hardwareDevice->key}");
    }
}
