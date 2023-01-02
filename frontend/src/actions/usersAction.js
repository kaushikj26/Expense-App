import axios from 'axios'
import {updateLoginToken} from './loginAction'

export const startRegisterUsers = (formData,tag) =>{
    return (dispatch)=>{
        axios.post('http://localhost:3080/api/users/register',formData)
            .then((response)=>{
                tag()
            })
            .catch((err)=>{
                alert(err.message)
            })
    }
}

export const startLoginUsers = (formData,clearForm) =>{
    return (dispatch)=>{
        axios.post('http://localhost:3080/api/users/login',formData)
            .then((response)=>{
                const token = response.data
                clearForm()
                console.log('loginaction')
                localStorage.setItem('token',JSON.stringify(token))
                dispatch(updateLoginToken(token))
            })
            .catch((err)=>{
                alert(`login - ${err.message}`)
            })
    }
}

export const startGetUser=(logintoken)=>{
    return(dispatch)=>{
        axios.get(`http://localhost:3080/api/user`,{
            headers : {
                'Authorisation' : logintoken.token
            }
        })
            .then((response)=>{
                const result = response.data
                console.log('useraction')
                dispatch(updateUserProfile(result))
            })
            .catch((err)=>{
                alert(err.message)
            })
    }
}


const updateUserProfile=(data)=>{
    return({
        type : 'SET_USER-PROFILE',
        payload : data
    })
}