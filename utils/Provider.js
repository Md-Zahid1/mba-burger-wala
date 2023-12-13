import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import passport from 'passport'
import { UserModel } from '../models/UserModel.js'




export const connectPassport = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_AUTH_CLIANT_ID,
        clientSecret: process.env.GOOGLE_AUTH_CLIANT_SECRET,
        callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL
    }, async function (accessToken, refreshToken, profile, done) {

        //Database comes here
        const user = await UserModel.findOne({
            googleId: profile.id,
        });

        if (!user) {
            const newUser = await UserModel.create({
                googleId: profile.id,
                name: profile.displayName,
                photo: profile.photos[0].value
            })

            return done(null, newUser)

        } else {
            return done(null, user)
        }

    }));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })
}