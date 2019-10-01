<?php

namespace App\Listeners;

use App\Events\NewAccessRequest;
use App\Notifications\NewAccessRequestNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendNewAccessRequestNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(NewAccessRequest $event)
    {
        $event->hardwareDevice->notify(new NewAccessRequestNotification($event->intervention));
        $event->mobileDevice->notify(new NewAccessRequestNotification($event->intervention));
    }
}
