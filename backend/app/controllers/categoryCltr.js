const Category = require('../models/category')
const Expense = require('../models/expense')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const categoryCtlr = {}

categoryCtlr.list = (req, res) =>{
    const id = req.user._id
    Category.find({userId : id})
        .then((categories)=>{
            res.json(categories)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

categoryCtlr.create = (req, res) =>{
    const body = req.body
    const category = new Category(body)
    category.userId = req.user._id 
    category.save()
        .then((category)=>{
            res.json(category)
        })
        .catch((err)=>{
            res.json(err)
        })
}

categoryCtlr.update = (req, res) =>{
    const id = req.params.id
    const body = req.body
    Category.findByIdAndUpdate(id, body, {new:true, runValidators:true})
        .then((category)=>{
            res.json(category)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

categoryCtlr.destroy=(req, res) =>{
    const user_id = req.user._id
    const id = req.params.id
    Category.findOne({name : 'uncategorised'})
        .then((category)=>{
            Expense.updateMany({categoryId : id, userId: user_id },{categoryId : category._id},{new:true})
                .then((expenses)=>{
                    Category.findByIdAndDelete(id)
                        .then((ctgry)=>{
                            res.json(ctgry)
                        })
                        .catch((err)=>{
                            res.json(err)
                        })
                })
                .catch((err)=>{
                    res.json(err.message)
                })
        })
        .catch((err)=>{
            res.json(err)
        })   
}

module.exports = categoryCtlr