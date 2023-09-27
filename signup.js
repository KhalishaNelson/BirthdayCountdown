import {apiKey, databaseUrl} from './firebase.js'
const signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

$(document).ready(() => {

    $('#signup-btn').on('click', () => {
        const $username = $('#username').val()
        const $birthday = $('#birthday').val()
        const $email = $('#email').val()
        const $password = $('#pass').val()

        const userData = {
            Name: $username,
            Birthday: $birthday,
            Email: $email, 
            Password: $password 
            }

        const url = signupUrl + apiKey;

        fetch(url, {
            method:'POST',
            body: JSON.stringify({email:$email,password:$password,returnSecureToken:true})
        })
        .then(res=>{
            return res.json()
        })
        .then(response=>{
            const userKey = response.localId
            const token = response.idToken
            const dataUrl = databaseUrl+'/Users/'+userKey+'/.json?auth='+ token
            
            fetch(dataUrl,{
                method: 'PUT',
                body: JSON.stringify(userData)
            })
            .then(response=>{
                return response.json()
            })
            .then(response=>{
                localStorage.setItem('token', token)
                localStorage.setItem('name', response.Name)
                localStorage.setItem('birthday', response.Birthday)
                window.location.href="countdown.html"
            })
        })
    })

    $('#alreadyuser-btn').on('click', () => {
        window.location.href = "index.html"
    })
 })
