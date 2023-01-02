import React,{useState, useEffect} from "react";
import {Link, Route} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import '../App.css'

import Home from "./Home";
import Settings from "./Settings";
import Profile from "./Profile";
import Register from "./Register";
import Login from "./Login";

import {updateLoginToken} from '../actions/loginAction'
import { startGetCategories } from "../actions/categoriesAction";
import { startGetExpenses } from "../actions/expensesAction";
import { startGetUser } from "../actions/usersAction";
import { startGetBudget } from "../actions/budgetActions";

const MainMenu=(props)=>{
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginToken, setLoginToken] = useState({})
  const dispatch = useDispatch()
  const store = useSelector((state)=>{
    return state
  })

  useEffect(()=>{
    const logintoken = JSON.parse(localStorage.getItem('token'))
    console.log(store)
    if(logintoken){
      console.log('fg', logintoken)
      setLoginToken(logintoken)
      updateLoginToken(logintoken)
      setIsLoggedIn(true)
    }
  },[isLoggedIn])

  useEffect(()=>{
    if(Object.keys(loginToken).length > 0){
      console.log('error', loginToken)
      dispatch(startGetUser(loginToken))
      dispatch(startGetBudget(loginToken))
      dispatch(startGetCategories(loginToken))
      dispatch(startGetExpenses(loginToken))
    }
  },[loginToken])

      return(
        <div style={{display : 'inline-flex'}}>
          <div>
            <ul style={{listStyle:'none'}} >
            {!isLoggedIn ? (
              <>
                <div className="button"><li style={{padding : '5px' }} ><Link to='/register' >Register</Link></li></div>
                <div className="button"><li style={{padding : '5px' }} ><Link to='/login' >Login</Link></li></div>
              </>
            ) : (
              <>
                <div className="button"><li style={{padding : '5px' }} ><Link to='/home'>Home</Link></li></div>
                <div className="button"><li style={{padding : '5px' }} ><Link to='/settings'>Settings</Link></li></div>
                <div className="button"><li style={{padding : '5px' }} ><Link to='/profile'>Profile</Link></li></div>
                <div className="button"><li style={{padding : '5px' }} ><Link to = '/logout' onClick={() => {
                    localStorage.removeItem('token')
                    alert('Successfully logged out')
                    setIsLoggedIn(false)
                }}>Log out</Link></li></div>
              </>
            )}
                
            </ul>
        </div>

        <div style={{paddingLeft:'50px'}}>
            <Route path='/home' component={Home} exact={true} />
            <Route path='/settings' component={Settings} exact={true} />
            <Route path='/profile' component={Profile} exact={true} />
            <Route path='/register' component={Register} exact={true} />
            <Route path='/login' render={(props)=>{
              return <Login props={props} setIsLoggedIn={setIsLoggedIn} />
            }} exact={true} />
        </div>
    </div>
  )
}

export default MainMenu