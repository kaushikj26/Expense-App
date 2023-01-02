import React from "react"
import { useSelector } from "react-redux"
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'                                 //npm install --save react-circular-progressbar

const Budget = (props) => {
    const budgetamt = useSelector((state) => {
        return state.budgets
    }) || {}
    console.log('bud store', budgetamt)
    const expenses = useSelector((state) => {
        return state.expenses
    }) || {}

    const TotalExpense = () => {
        let sum = 0
        expenses.forEach(ele => { 
            return sum +=ele.amount
        })
        return sum
    }
    console.log(TotalExpense())
    const chartValue = (TotalExpense()/budgetamt.budget)*100
    // const chartValue = ((Number(TotalExpense()))/Number(budgetamt.budget))*100
    console.log('ghdkgdk',TotalExpense())
    console.log(budgetamt.budget)

    return(
        <div style={{display:'inline-flex'}}>
            <div style={{width:'200px', height:'200px', paddingLeft:'10px'}}>
                <h3>Budget overview</h3>
                <CircularProgressbar 
                value = {chartValue} 
                maxValue = {100} 
                text = {`${chartValue}% spent`} 
                strokeWidth = {5}
                styles = {buildStyles({
                    textSize:'13px'
                })}
                />
            </div> 
            <div style = {{padding:'50px'}}>
                <h4>Total Budget - Rs. {budgetamt.budget}</h4>
                <h4>Total Expenses - Rs. {TotalExpense()}</h4>
            </div>
        </div>
    )
}

export default Budget