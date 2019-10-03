export interface DeploymentState {
    deployment_start?: string;
    deployment_end?: string;
    id?: number;
}

export enum DeploymentActions {
    retrieve = 'DEPLOYMENT_RETRIEVE',
    set = 'DEPLOYMENT_SET',
};

export interface DeploymentRetrieveAction {
    type: DeploymentActions.retrieve;
}

export interface DeploymentSetAction {
    type: DeploymentActions.set;
    payload: DeploymentState;
}
