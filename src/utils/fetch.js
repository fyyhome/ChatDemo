export const host = '192.168.1.104';


export const post = function(url, params, theme = {
    contentType: 'application/json'
}) {
    return fetch(url.includes('http') ? url : `http://${host}:8898${url}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': theme.contentType
        },
        body: theme.contentType === 'application/json' ? JSON.stringify(params) : params
    })
    .then(res => res.json())
    .catch(error => error);
}

