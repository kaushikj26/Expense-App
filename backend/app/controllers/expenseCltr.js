const Expense = require('../models/expense')

const expenseCtlr = {}

expenseCtlr.list = (req, res) =>{
    Expense.find({userId: req.user._id})
        .then((expenses)=>{
            res.json(expenses)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

expenseCtlr.create = (req, res) =>{
    const body = req.body
    const expense = new Expense(body)
    expense.userId = req.user._id 
    console.log(expense) 
    expense.save()
        .then((expense)=>{
            res.json(expense)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

expenseCtlr.update = (req, res) =>{
    const id = req.params.id
    const body = req.body
    Expense.findByIdAndUpdate(id, body, {new:true, runValidators:true})
        .then((expense)=>{
            res.json(expense)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

expenseCtlr.remove = (req, res) =>{
    const id = req.params.id
    Expense.softDelete({userId: req.user._id, _id: id})
        .then((expense) => {
            Expense.findById({userId: req.user._id, _id: id})
                .then((deleteItem) => {
                    res.json({expense, deleteItem})
                })
                .catch((err) => {
                    res.json(err.message)
                })
        })
        .catch((err) => {
            res.json(err.message)
        })
}

expenseCtlr.undo = (req, res) => {
    const id = req.params.id
    Expense.restore({userId: req.user._id, _id: id})
        .then((restore) => {
            Expense.find({userId: req.user._id, _id: id})
                .then((expense) => {
                    res.json({restore, expense})
                })
                .catch((err) => {
                    res.json(err.message)
                })
        })
        .catch((err) => {
            res.json(err.message)
        })
}

expenseCtlr.deletedExpense = (req, res) => {
    const receivedUser = req.user._id
    Expense.findDeleted({userId: req.user._id})
        .then((deletedExpense) => {
            const result = deletedExpense.filter((exp) => {
                return exp.userId === receivedUser
            })
            res.json(result)
        })
        .catch((err) => {
            res.json(err.message)
        })
}

module.exports = expenseCtlr