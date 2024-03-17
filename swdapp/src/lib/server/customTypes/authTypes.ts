// sign up
export interface RegistrationRequest {
    username: string,
    password: string
};

export interface RegistrationFailResponse {
    failType: "error" | "exists",
    message: string,
    err?: any
}

export interface RegistrationResponse {
    success: boolean,
    response: string | RegistrationFailResponse
};

// sign in
type LoginRequest = RegistrationRequest;

export interface LoginFailResponse {
    failType: "error" | "invalid_user" | "invalid_pass",
    message: string
}

export interface LoginResponse {
    success: boolean,
    response: string | LoginFailResponse
}