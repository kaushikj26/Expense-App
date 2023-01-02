import axios from "axios";
import { undoExpenseDelete } from "./expensesAction";

export const startGetDeletedExpenses = (loginToken) => {
    return(dispatch) => {
        axios.get('http://localhost:3080/api/users/categories/expenses/deleted', {
            headers : {
                "Authorisation" : loginToken.token
            }
        })
        .then((res) => {
            const delExpense = res.data
            dispatch(getDeletedExpenses(delExpense))
        })
    }
}

const getDeletedExpenses = (delExpense) => {
    return{
        type: 'GET_DELETED_EXPENSES',
        payload: delExpense
    }
}

export const clearDelExpense = () => {
    return{
        type: 'CLEAR_DELETED_EXPENSES'
    }
}

export const createDelExpense = (delExpense) => {
    return {
        type: 'ADD_DELETED_EXPENSE',
        payload: delExpense
    }
}

export const startUndoDelete = (id, loginToken) => {
    return(dispatch) => {
        axios.put(`http://localhost:3080/api/users/categories/expenses/undo/${id}`, {}, {           /////{}
            headers : {
                "Authorisation" : loginToken.token
            }
        })
        .then((res) => {
            const undoExpense = res.data.expense[0]
            dispatch(undoExpenseDelete(undoExpense))
            dispatch(undoDelete(undoExpense))
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}

const undoDelete=(undoExpense)=>{
    return {
        type:'UNDO_DELETED_EXPENSE',
        payload:undoExpense
    }
}