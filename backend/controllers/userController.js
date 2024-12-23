const User = require('../models/userModel');
const asyncHandler = require('../middleware/asyncHandler');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/createToken');


const createUser = asyncHandler(async (req, res,) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new Error("Please fill all the inputs.");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).send("User already Exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        createToken(res, newUser._id);

        res.status(200).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });
    } catch (error) {
        res.status(400);
        throw new Error("Invalid user data")
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log(email);
    console.log(password);
    if (!email || !password) {
        return res.status(400).json({ error: "Please fill all the inputs." })
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (isPasswordValid) {
            createToken(res, existingUser._id);

            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            });
            return;

        }
    }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httyOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        message: "Logged out successfully"
    });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const user = await User.findById({});
    res.json(user);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });

    }
    else {
        res.status(400);
        throw new Error("User not found.");
    }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }
        const updateUser = await user.save();
        res.json({
            _id: updateUser._id,
            username: updateUser.username,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    }
    else {
        res.status(400);
        throw new Error("User not Updated...");
    }
});


const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error("Cannot delete admin user");
        }
        await User.deleteOne({ _id: user._id });
        res.json({ message: "User deleted successfully" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    }
    else {
        res.status(400);
        throw new Error("User not found");

    }
});


const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            username: updateUser.username,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});


module.exports = {
    createUser, getAllUsers, loginUser,
    logoutCurrentUser, getCurrentUserProfile,
    updateCurrentUserProfile, deleteUserById,
    getUserById, updateUserById
};