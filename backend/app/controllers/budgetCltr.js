const Budget = require('../models/budget')

const budgetCtlr = {}

budgetCtlr.list = (req, res) =>{
    const userId = req.user._id
    Budget.findOne({ userId: userId})
        .then((budget) => {
            res.json(budget)
        })
        .catch((err) => {
            res.json(err)
        })
}

budgetCtlr.create = (req, res) =>{
    const body = req.body
    const userId= req.user._id
    const budget = new Budget(body)
    budget.userId = userId
    budget.save()
        .then((budget)=>{
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err)
        })
}

budgetCtlr.update = (req, res) =>{
    const body = req.body
    const userId = req.user._id
    const id = req.params.id
    Budget.findOneAndUpdate({ _id: id, userId: userId}, body, {new: true, runValidators: true})
        .then((budget) => {
            res.json(budget)
        })
        .catch((err) => {
            res.json(err)
        })  
}

budgetCtlr.destroy = (req, res)=>{
    const id = req.params.id
    Budget.findByIdAndDelete(id)
        .then((budget)=>{
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports = budgetCtlr