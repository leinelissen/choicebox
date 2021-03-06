export enum DeviceType {
    iOS = 'IOS',
    android = 'ANDROID',
}

export enum DeviceActions {
    register = 'DEVICE_REGISTER',
    setDevice = 'DEVICE_SET',
    getAccessToken = 'DEVICE_GET_ACCESS_TOKEN',
    setAccessToken = 'DEVICE_SET_ACCESS_TOKEN',
}

export interface Device {
    key: string;
    secret: string;
    type: DeviceType;
}

export interface Token {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

export interface DeviceState {
    device?: Device;
    expo_token?: string;
    token?: Token;
}

export interface DeviceSetAction {
    type: DeviceActions.setDevice;
    payload: Device;
}

export interface DeviceSetAccessTokenAction {
    type: DeviceActions.setAccessToken;
    payload: Token;
}
