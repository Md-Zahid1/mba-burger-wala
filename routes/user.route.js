import express from 'express';
import passport from 'passport';
import { getAdminStats, getAdminUsers, myProfile } from '../controllers/user.controller.js';
import { logout } from '../controllers/user.controller.js';
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';


const router = express.Router()

router.get("/googlelogin", passport.authenticate("google", {
    scope: ["profile"],
}));

router.get("/login", passport.authenticate("google"), (req, res, next) => {
    successRedirect: process.env.FRONTEND_URL
})


router.get("/me", isAuthenticated, myProfile)
router.get("/logout", logout)


//Admin Routes
router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers)
router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats)


export default router