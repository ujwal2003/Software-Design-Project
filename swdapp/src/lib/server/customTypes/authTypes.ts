export interface RegistrationRequest {
    username: string,
    password: string
};

export interface FailResponse {
    failType: "error" | "exists",
    message: string,
    err?: any
}

export interface RegistrationResponse {
    success: boolean,
    response: string | FailResponse
};