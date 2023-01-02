import React,{useState} from "react";
import {useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";                                //npm install --save react-bootstrap-form
import { startAddExpense } from "../actions/expensesAction";

const ExpensesForm =(props)=>{
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const dispatch = useDispatch()
    const user = useSelector((state)=>{
        return state.users
    }) || {}
    const categories= useSelector((state)=>{
        return state.categories
    }) || {}
    const loginToken = JSON.parse(localStorage.getItem('token'))

    const handleClick=()=>{ setShow(!show)}

    const handleChange=(e)=>{
        let attr = e.target.name
        if(attr === 'name'){ setName(e.target.value)}
        else if(attr === 'amount'){ setAmount(e.target.value)}
        else if(attr === 'categoryId'){ setCategoryId(e.target.value)}
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData = {
            name,
            amount,
            categoryId,
            // userId : user[0]._id
        }
        const clearForm=()=>{
            setName('')
            setAmount('')
            setCategoryId('')
        }
        console.log('token',loginToken)
        dispatch(startAddExpense(formData, handleClick, loginToken, clearForm))
    }

    return(
        <div>
            <Button onClick={handleClick}>Add Expense</Button>
            <Modal show={show} onHide={handleClick} centered>
                <Modal.Title>Expenses Form</Modal.Title>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}  >
                        <input type='text' name='name' value={name} onChange={handleChange} placeholder='expense name' /><br/>

                        <input type='text' name='amount' value={amount} onChange={handleChange} placeholder='amount' /><br/>

                        <select name='categoryId' onChange={handleChange} >
                            <option value=''>Select category</option>
                            {categories.map((cat)=>{
                                return( <option key={cat._id} value={cat._id} > {cat.name} </option>)
                            })}
                        </select><br/>

                        <input type='submit' value='Add' />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ExpensesForm