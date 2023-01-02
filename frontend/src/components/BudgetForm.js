import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { startCreateBudget } from "../actions/budgetActions";

const BudgetForm=(props)=>{
    const [budget, setBudget] = useState('')
    const dispatch = useDispatch()
    const user = useSelector((state)=>{
        return state.users
    }) || {}
    const loginToken = JSON.parse(localStorage.getItem('token'))

    const handleChange = (e) => {
        let attr = e.target.name
        if(attr === 'budget') {
            setBudget(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            userId : user[0]._id,
            budget: Number(budget)
        }
        console.log('bud form', formData)
        const clearForm = ()=> {
            setBudget('')
        }
        dispatch(startCreateBudget(formData, loginToken, clearForm))
    }

    return(
        <div style={{display:'inline-block', paddingLeft:'50px'}}>
            <h4>Budget</h4>
            <form onSubmit={handleSubmit} style={{paddingLeft:'150px'}}>
                <input type='text' name='budget' value={budget} onChange={handleChange} placeholder='enter budget' />

                <input type='submit' value='Update'  />
            </form>
        </div>
    )
}

export default BudgetForm