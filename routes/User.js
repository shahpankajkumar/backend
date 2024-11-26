const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs")
const User = require("../modals/User");
const verifyToken = require("../middleware/auth")
const router = express.Router();

//signup
router.post('/signup', async(req,res)=> {
    try {
        const { name, phone, email, password, role } = req.body;        
        const hashPassword = await bcrypt.hash(password, 10);        
        const user = new User({ name, email, phone, password: hashPassword, role });
        await user.save();
        res.status(201).send('User created');
    } catch(error) {
        console.log("error>>>>>>>", error);
        
        res.status(400).send(error);
    } 
});

//login
router.post('/login', async(req,res)=> {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if(!user ||  !(await bcrypt.compare(password, user.password))){
           return res.status(400).send("invalid user");
        }
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET);
        res.status(200).send(token);
    } catch(error) {
        res.status(400).send(error);
    } 
});

//find user details
router.post('/getDetails',verifyToken, async(req, res)=> {
    try{
        const { id, role } = req.body;
        let userData;
        if(role === "admin"){
            userData = await User.find({role: 'user'}) 
        }else {
            userData = await User.findOne({_id: id}) 
        }
        const structure = destructure(userData)
        res.status(200).send(structure);
    }catch(error){
        res.status(400).send(error)
    }
});

//delete user
router.delete("/delete",verifyToken, async(req, res)=> {
    try{
        const { id } = req.body;
        const userDelete = await User.findOneAndDelete({_id: id});
        res.status(200).send(userDelete);
    }catch(error){
        res.status(400).send(error);
    }
})

//update user
router.put('/update', verifyToken, async (req, res) => {
    try {
        const { id, name, phone, email, password, role } = req.body;
        const updates = { name, phone, email, role };
        
        if (password) {
            updates.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findOneAndUpdate({ _id: id }, updates, { new: true });
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

const destructure = (userData) => ({
    name: userData.name,
    phone: userData.phone,
    email: userData.email,
    role: userData.role
});

module.exports = router;
