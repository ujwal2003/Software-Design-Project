/**
 * 
 * @param name name of the cookie
 * @param value value of the cookie (if it is JSON it must be passed in as a string with `JSON.stringify`)
 * @param durationMillis how long the cookie will last in milliseconds, default is 5 minutes
 */
export function setCookie(name: string, value: any, durationMillis: number = 5*60*1000) {
    const expires = new Date(Date.now() + durationMillis).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

/**
 * 
 * @param name name of cookie you are trying to retrieve
 * @returns value of the cookie or null (is value is JSON it must be parsed)
 */
export function getCookie(name: string) {
    const cookies = document.cookie.split(';');
    for(const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }

    return null;
}


export function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}