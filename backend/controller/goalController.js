const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler (async(req, res) => {
    res.status(200).json({message:'get goals'})
})
const postGoals = asyncHandler (async(req, res)  => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please enter text field')
    }
        console.log(req.body)

    res.status(200).json({message:'post goals'})
})
const putGoals = asyncHandler ((req, res) => {
    res.status(200).json({message:`Update goal ${req.params.id}`})
})
const deleteGoals = asyncHandler ((req, res) => {
    res.status(200).json({message:`Delete goal ${req.params.id}`})
})

module.exports = {
    getGoals,
    postGoals,
    putGoals,
    deleteGoals,
}