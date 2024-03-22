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