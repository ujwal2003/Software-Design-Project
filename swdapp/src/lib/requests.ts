export async function postRequest(apiRoute: string, jsonData: Object) {
    const res = await fetch(apiRoute, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });

    return res;
}

export async function deleteRequest(apiRoute: string, jsonData: Object) {
    const res = await fetch(apiRoute, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });

    return res;
}

export async function patchRequest(apiRoute: string, jsonData: Object) {
    const res = await fetch(apiRoute, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });

    return res;
}

export async function getRequest(apiRoute: string, jsonData: Object, getHeaders: Object|null = null) {
    const reqHeaders = new Headers();

    if(getHeaders) {
        for(const [key, value] of Object.entries(getHeaders)) {
            reqHeaders.append(key, value.toString());
        }
    }

    const res = await fetch(apiRoute, {
        method: 'GET',
        headers: reqHeaders
    });

    return res;
}