const User = require('./../models/user.model.js');
const Group = require('./../models/group.model.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//basic DB functions
const createUser = async (req, res) => {
    try {
        let {username, email, password, firstName, lastName} = req.body;

        const user = new User({
            username,
            email,
            password,
            firstName,
            lastName,
            groups: []
        });

        // Encrypt password
        user.password = await user.encryptPassword(user.password);

        await user.save();

        // Generate token
        const token = jwt.sign({
            id: user._id,
            username: user.username,
        }, process.env.JWTPRIVATEKEY, {expiresIn: '24h'});

        // Send res to user
        res.json({auth: true, token});
    } catch (error) {
        res.status(500).json({message: 'createUser: ' + error.message});
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user_id, {password: 0});

        // If user doesn't exist
        if (!user) return res.status(404).json({message: "User doesn't exist."});
        
        return res.json(user);
    } catch (error) {
        res.status(500).json({message: 'getUser:' +  error});
    }
};

const updateUser = async (req, res) => {
    try {
        let {username, email, password, firstName, lastName} = req.body;

        const user = await User.findByIdAndUpdate(req.user_id, {
            username,
            email,
            password,
        }, {new: true});

        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user_id);
        if (!user) return res.status(404).json({message: "User doesn't exist."});

        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//required functions
const login = async (req, res) => {
    try {
        console.log(req.body);
        let {username, password} = req.body;
        // Find the user with the username or email given
        const user = await User.findOne({username: username}) || await User.findOne({email: username});

        // If the username doesn't exist.
        if (!user) return res.json({message: "The given username or email doesn't exist."});

        // Compare password given vs user password
        const password_valid = await user.validatePassword(password);

        // If the password is wrong
        if (!password_valid) return res.status(401).json({message: 'The given password is wrong.'});

        // Generate token
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            friends: user.friends
        }, process.env.JWTPRIVATEKEY, {expiresIn: '24h'});

        // Send res to user
        res.json({auth: true, token, user: {
            username: user.username,
            friends: user.friends
        }});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const logout = (req, res) => {
    try {
        res.json({auth: false, token: null});
    } catch (error) {
        res.status(500).json({auth: false, message: error.message});
    }
};


module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login,
    logout
};
