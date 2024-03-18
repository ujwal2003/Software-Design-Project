// sign up
export interface RegistrationRequest {
    username: string,
    password: string
};

export interface RegistrationFail {
    failType: "error" | "exists",
    message: string,
    err?: any
};

export interface RegistrationResponse {
    success: boolean,
    response: string | RegistrationFail
};

// sign in
export type LoginRequest = RegistrationRequest;

export interface LoginFailure {
    failType: "error" | "invalid_user" | "invalid_pass",
    message: string
};

export interface LoginSuccess {
    refreshToken: string,
    accessToken: string
};

export interface LoginResponse<T extends LoginSuccess | LoginFailure> {
    success: boolean,
    response: T
};

// sign out
export interface LogOutRequest {
    username: string,
    refreshToken: string
};

export interface LogOutResponse {
    success: boolean,
    message: string
};