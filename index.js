import { apiKey, databaseUrl } from './firebase.js'
const signinUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='

$(document).ready(() => {
    $('#signin-btn').on('click', () => {

        const $email = $('#signin-email').val()
        const $password = $('#signin-pass').val()
        const url = signinUrl + apiKey

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ email: $email, password: $password, returnSecureToken: true })
        })
        .then(res => {
            return res.json()
        })
        .then(response => {
            const userKey = response.localId

            // Save user's info into database
            const token = response.idToken
            const url = databaseUrl + '/Users/' + userKey + '/.json?auth=' + token

            // Gets the user's info from database
            fetch(url)
            .then(response => {
                return response.json()
            })
            .then(response => {
                    localStorage.setItem('token', token)
                    localStorage.setItem('name', response.Name)
                    localStorage.setItem('birthday', response.Birthday)
                    window.location.href = "countdown.html"
            })
            .catch(error => {
                console.log(error.message)
            })
        })
    })

    $('#newacct-btn').on('click', () => {
        window.location.href = "signup.html"
    })
 })