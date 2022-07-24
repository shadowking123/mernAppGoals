const asyncHandler = require('express-async-handler')
const { update, findByIdAndDelete } = require('../models/goalModel')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const getGoals = asyncHandler (async(req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})
const postGoals = asyncHandler (async(req, res)  => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please enter text field')
    }
    const goal = await Goal.create({
        user: req.user.id,
        text: req.body.text
    })

    res.status(200).json(goal)
})
const putGoals = asyncHandler (async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please enter text field')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //checking if the log in user is match
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })
    res.status(200).json(updatedGoal)
})
const deleteGoals = asyncHandler (async(req, res) => {
    const goal = await Goal.findById(req.params.id) 
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //checking if the log in user is match
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()
    res.status(200).json({id: req.params.id})
}) 

module.exports = {
    getGoals,
    postGoals,
    putGoals,
    deleteGoals,
}