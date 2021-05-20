export function applyLogin(email, password){
    let data = {
        email: email,
        password: password
    }
    fetch(window.location, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(resp => resp.json())
        .then(res => {
            return res.token
        })
}

export function checklogin(token) {
    fetch(window.location, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: token
        }
    })
        .then(resp => resp.json())
        .then(res => {
            return parseInt(res.reponse)
        })
}