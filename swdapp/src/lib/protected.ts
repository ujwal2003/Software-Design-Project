import { getCookie, setCookie } from "./cookieUtil";
import { postRequest } from "./requests";

export async function isClientAllowed(pathReset: string = '') {
    const cookieData = getCookie('user_session');
    if(!cookieData)
        return false;

    const sessionData = JSON.parse(cookieData);

    const sessionUsername = sessionData.username;
    const userRefreshToken = sessionData.refreshToken;
    let userAccessToken = sessionData.accessToken;

    let accessTokenValidJSON = await (await postRequest(`${pathReset}api/auth/session/status/`, {
        accessToken: userAccessToken,
        refreshToken: userRefreshToken
    })).json();

    if(!accessTokenValidJSON.success)
        return false;

    if(!accessTokenValidJSON.valid) {
        const regenAccTokenJSON = await (await postRequest(`${pathReset}api/auth/session/status/`, {
            username: sessionUsername,
            refreshToken: userRefreshToken
        })).json();

        if(!regenAccTokenJSON.success)
            return false;

        userAccessToken = regenAccTokenJSON.newAccessToken;
        setCookie('user_session', {
            username: sessionUsername,
            accessToken: regenAccTokenJSON.newAccessToken,
            refreshToken: userRefreshToken
        });

        accessTokenValidJSON = await (await postRequest(`${pathReset}api/auth/session/status/`, {
            accessToken: userAccessToken,
            refreshToken: userRefreshToken
        })).json();

        if(!accessTokenValidJSON.success)
            return false;
    }

    return true;
}