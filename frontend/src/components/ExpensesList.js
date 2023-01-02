import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button";

import { startDeleteExpense } from "../actions/expensesAction";

const ExpensesList = (props) =>{
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('')
    const categories = useSelector((state)=>{
        return state.categories
    }) || {}
    const expenses = useSelector((state)=>{
        return state.expenses
    }) || {}
    console.log('expense', expenses)
    const loginToken = useSelector((state)=>{
        return state.tokens[0]
    }) || JSON.parse(localStorage.getItem('token'))

    const handleChange=(e)=>{
        setSearchTerm(e.target.value)
    }

    const handleDelete=(id)=>{
        let Confirm = window.confirm('Are you sure?')
        if(Confirm){
            dispatch(startDeleteExpense(id, loginToken))
        }
    }

    return(
        <div>
            <h3>CategoryList</h3>
            <div style={{paddingLeft : '600px'}}>
                <input type='text' value={searchTerm} onChange={handleChange} placeholder='search' />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Expense Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.filter((ele) =>{
                        console.log('exp',ele)
                        return ele.name !== 'uncategorised'}).filter((ele)=>{ return ele.name.includes(searchTerm)}).map((exp)=>{
                        return( 
                                <tr key={exp._id}>
                                    <td> {(categories.find((cat)=>{
                                        console.log('cat',cat)
                                        return (cat._id === exp.categoryId)}).name )} </td>
                                    <td> {exp.name} </td>
                                    <td> {exp.amount} </td>
                                    <td> { new Date(exp.createdAt).toLocaleDateString()} </td>
                                    <td> <Button onClick={()=>{handleDelete(exp._id)}}>Delete</Button> </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ExpensesList