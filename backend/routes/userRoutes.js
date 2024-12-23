const express = require('express');
const router = express.Router();
const {authenticate,authorizeAdmin} = require("../middleware/authMiddleware");
 const {
    createUser, getAllUsers, loginUser,
    logoutCurrentUser, getCurrentUserProfile,
    updateCurrentUserProfile, deleteUserById,
    getUserById, updateUserById
} = require("../controllers/userController");



router.route('/').post(createUser).get(authenticate,authorizeAdmin,getAllUsers);
router.post('/auth',loginUser);
router.post('/logout',logoutCurrentUser);
router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate,updateCurrentUserProfile); 

 // Admin Routess....


router.route('/:id')
.delete(authenticate,authorizeAdmin,deleteUserById)
.get(authenticate,authorizeAdmin,getUserById)
.put(authenticate,authorizeAdmin,updateUserById);


module.exports = router;