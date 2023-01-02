import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import usersReducers from '../reducers/usersReducer';
import loginReducers from '../reducers/loginReducer';
import categoryReducers from '../reducers/categoryReducer';
import expensesReducers from '../reducers/expenseReducer';
import budgetReducers from '../reducers/budgetReducer';
import deletedExpReducer from '../reducers/deletedExpReducer';

const configureStore = () =>{
    const store = createStore(combineReducers({
        users : usersReducers,
        tokens : loginReducers,
        categories : categoryReducers,
        expenses : expensesReducers,
        deletedExpenses : deletedExpReducer,
        budgets : budgetReducers
    }),applyMiddleware(thunk))
    return store
}

export default configureStore