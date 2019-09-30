const { parsed : {
    WS_HOST,
    AUTH_HOST,
    APP_KEY,
    CLIENT_ID,
    CLIENT_SECRET,
    HARDWARE_DEVICE_KEY,
    HARDWARE_DEVICE_SECRET,
} } = require('dotenv').config();

const fetch = require('node-fetch');
const Pusher = require('pusher-js');

// Flag for debugging the Pusher SDK
Pusher.log = console.log;

/**
 * Retrieve Access Token
 * ============================================================================
 * First, we must retrieve an access token from the back-end API. This is so
 * that we can authenticate the private channel on which all relevant
 * information for this particular deployment will be sent.
 * 
 */

// This is the JSON response the API expects
const OAuthBody = {
    grant_type: 'password',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    username: HARDWARE_DEVICE_KEY,
    password: HARDWARE_DEVICE_SECRET,
    scope: '*',
    provider: 'hardware',
};

// Retrieve the access token from the API
const accessTokenRequest = fetch(`${AUTH_HOST}/oauth/token`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(OAuthBody),
})
    // Parse the JSON response
    .then(response => response.json())
    .then(response => {
        // GUARD: Check if we actually received the correct response
        if (response.error || !response.access_token) {
            console.error(response);
            throw new Error('Error retrieving access token', response);
        }

        // Log success
        console.log('[SYSTEM] Successfully retrieved access token.')

        return response.access_token;
    })
    .catch(err => {
        console.error('[ERROR] ', err.message);
        process.exit(0);
    });
;

/**
 * Init Pusher
 * ============================================================================
 * Now that we have the access token, we can start connecting to the pusher
 * server that is instantiated by the back-end. We set the access_token in any
 * authentication headers so that they succeeed for the relevant private channels.
 * 
 */

const socketConnection = accessTokenRequest
    .then(accessToken => {
        console.log(accessToken);
        // Create a socket using the following config
        const socket = new Pusher(APP_KEY, {
            wsHost: WS_HOST,
            wsPort: 6001,
            authEndpoint: `${AUTH_HOST}/broadcasting/auth`,
            auth: {
                headers: {
                    // Set the Authorization header so that the device is
                    // recognised as trying to access the private channel
                    Authorization: `Bearer ${accessToken}`,
                    // NOTE: This is apparently essential to this whole ordeal.
                    // My guess is that Laravel for some reason refuses to parse
                    // the body as x-www-form-urlencoded by default.
                    // Alternatively, the native Node environment might be
                    // weirdly not including this crucial header.
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        });

        // Bind errors and state changes, and log them to console
        socket.connection.bind('error', (message) => console.error('[ERROR] ', message));
        socket.connection.bind('state_change', (message) => console.log('[STATE CHANGE] ', message));

        // Also bind a handler for when the socket is connected to the server
        socket.connection.bind('connected', () => {
            // Then subscribe to the private channel for the hardware device
            const channel = socket.subscribe(`private-HardwareDevice.${HARDWARE_DEVICE_KEY}`);
            
            // And bind the handler for any received messages
            channel.bind('new-message', (message) => console.log('[NEW MESSAGE] ', message));
        });

        return socket;
    });
