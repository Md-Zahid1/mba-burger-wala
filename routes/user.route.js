import express from 'express';
import passport from 'passport';
import { getAdminStats, deleteUser, userDetails, getAdminUsers, myProfile, users, savedVender, logout, likeVender, likeDestination, updateUserById, updateProfile, meDetails } from '../controllers/user.controller.js';
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';

const router = express.Router()

router.get("/googlelogin", passport.authenticate("google", {
    scope: ["profile"],
}));

router.post("/user-login", passport.authenticate("local", { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        res.status(200).json({ mesage: "logedIn Successfully" })
    }
);

router.get("/google-login-callback", passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: '/auth/google/failure'
}), (req, res, next) => {
    res.redirect(process.env.FRONTEND_URL)
})

router.get("/me", isAuthenticated, myProfile)
router.get('/me-details', meDetails)
router.get("/logout", logout)
router.get('/users', users)
router.get('/user-details/:id', userDetails)
router.post("/update-user/:id", updateUserById)
router.post("/update-profile", isAuthenticated, updateProfile)
router.delete('/delete-user/:id', isAuthenticated, deleteUser)
router.post('/save-vender/:id', isAuthenticated, savedVender)
router.post('/like-vender/:id', isAuthenticated, likeVender)
router.post('/like-destination/:id', isAuthenticated, likeDestination)


//Admin Routes
router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers)
router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats)


export default router