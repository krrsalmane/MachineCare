const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


const addUser = async (req , res) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
    }
}