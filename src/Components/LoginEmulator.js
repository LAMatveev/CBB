export function applyLogin(email, password) {
    return fetch(`http://localhost:3000/res/templates/Admins.json`)
        .then((res) => res.json()).then((res) => {
            if (email === 'admin@cbb.com' && password === 'adminpassword') {
                return 'supertoken'
            } else {
                if (res.children.find((e) => e.email === email && e.password === password)) {
                    return 'admintoken'
                } else return null
            }
        })
    /*let data = {
            email: email,
            password: password
        }
        return fetch(window.location, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(res => {
                if (res.message) {
                    setText(res.message)
                } else {
                    localStorage.setItem("token", res.token)
                    history.push('/Attributes')
                }
            })*/
}

export function checklogin(token) {
    if (token === 'supertoken') return 0
    else if (token === 'admintoken') return 1
    else return 403
    /*
        return fetch(window.location, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                token : token
            }
        })
            .then(resp => resp.json())
            .then(res => {
               return res.reponse
            })*/
}