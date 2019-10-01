<?php

namespace App\Channels;

use Exception;
use GuzzleHttp\Client;
use Illuminate\Notifications\Notification;

class ExpoChannel
{
    protected static $EXPO_BASE_URI = 'https://exp.host/';

    /**
     * Send the given notification.
     *
     * @param  mixed  $notifiable
     * @param  \Illuminate\Notifications\Notification  $notification
     * @return void
     */
    public function send($notifiable, Notification $notification)
    {
        $pushNotification = $notification->toExpoPush($notifiable);

        // GUARD: The notifiable must have an expo token
        if (is_null($notifiable->expo_token)) {
            throw new Exception('The notifiable for which an Expo push notification needs to be sent has no token');
        }

        // GUARD: The notification must have a body
        if (is_null($pushNotification['body'])) {
            throw new Exception('Expo push notification must have a body');
        }

        // Prepare the data
        $data = [
            'to' => $notifiable->expo_token,
            'sound' => $pushNotification['sound'] ?? 'default',
            'body' => $pushNotification['body'],
            'title' => $pushNotification['title'] ?? null,
            'badge' => $pushNotification['badge'] ?? 0,
            'data' => $pushNotification['intervention'] ?? $pushNotification['data'] ?? null,
        ];

        // Send the request out to Expo
        $client = new Client(['base_uri' => ExpoChannel::$EXPO_BASE_URI]);
        $response = $client->post('--/api/v2/push/send', [ 'form_params' => $data ]);
        
        // Verify the response
        if ($response->getStatusCode() !== 200) {
            $body = (string) $response->getBody();
            throw new Exception("Sending Expo push notification failed: {$body}");
        }

        // TODO: Expo supports notification receipts. The response contains an
        // id which can be checked for delivery against the Expo back-end. This
        // requires storing this id and asyncronously updating its status.
    }
}