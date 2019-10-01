<?php

namespace App\Notifications;

use App\Channels\ExpoChannel;
use App\HardwareDevice;
use App\Intervention;
use App\MobileDevice;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class NewAccessRequestNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $intervention;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Intervention $intervention)
    {
        $this->intervention = $intervention;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        if ($notifiable instanceof HardwareDevice) {
            return ['broadcast'];
        } else if ($notifiable instanceof MobileDevice) {
            return [ExpoChannel::class];
        }

        return null;
    }

    /**
     * Dispatch the notification to a broadcast channel
     *
     * @param mixed $notifiable
     * @return BroadcastMessage
     */
    public function toBroadcast($notifiable)
    {
        // TODO: Rewrite the broadcast message so that it is in a format in
        // which the Choicebox is directed to flash lights in a pattern for a
        // set amount of time.
        return new BroadcastMessage([
            'type' => 'NewAccessRequest',
            'request' => $this->intervention,
        ]);
    }

    /**
     * Dispatch the notification to an Expo application
     *
     * @param mixed $notifiable
     * @return ExpoMessage
     */
    public function toExpoPush($notifiable)
    {
        return [
            'title' => 'New Access Request',
            'body' => 'A new access request has been received. Click the notification to inspect it.',
            'badge' => 1,
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
