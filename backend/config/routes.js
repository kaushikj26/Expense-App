const express = require('express')
const {userAuthentication} = require('../app/middlewares/userAuthentication')
const router = express.Router()
const userCtlr = require('../app/controllers/userCltr')
const categoryCtlr = require('../app/controllers/categoryCltr')
const expenseCtlr = require('../app/controllers/expenseCltr')
const budgetCtlr = require('../app/controllers/budgetCltr')

router.get('/api/users', userCtlr.list)
router.post('/api/users/register', userCtlr.register)
router.post('/api/users/login', userCtlr.login)
router.get('/api/user',userAuthentication,userCtlr.show)
router.delete('/api/users/:id', userCtlr.destroy)

router.get('/api/users/categories',userAuthentication, categoryCtlr.list)
router.post('/api/users/categories/register', userAuthentication, categoryCtlr.create)
router.put('/api/users/categories/:id', userAuthentication, categoryCtlr.update)
router.delete('/api/users/categories/:id', userAuthentication, categoryCtlr.destroy)

router.get('/api/users/categories/expenses', userAuthentication, expenseCtlr.list)
router.post('/api/users/categories/expenses/register', userAuthentication, expenseCtlr.create)
router.put('/api/users/categories/expenses/:id', userAuthentication, expenseCtlr.update)
router.delete('/api/users/categories/expenses/:id', userAuthentication, expenseCtlr.remove)
router.put('/api/users/categories/expenses/undo/:id',userAuthentication, expenseCtlr.undo)
router.get('/api/users/categories/expenses/deleted',userAuthentication, expenseCtlr.deletedExpense)

router.get('/api/users/budget', userAuthentication, budgetCtlr.list)
router.post('/api/users/budget/register', userAuthentication, budgetCtlr.create)
router.put('/api/users/budget/:id', userAuthentication, budgetCtlr.update)
// router.delete('/api/users/budget/:id', userAuthentication, budgetCtlr.destroy)

module.exports = router