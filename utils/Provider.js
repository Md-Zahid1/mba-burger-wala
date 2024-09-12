import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import passport from 'passport'
import LocalStrategy from 'passport-local'
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
        console.log('user', user);
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

    passport.use(new LocalStrategy(async function verify(username, password, cb) {
        try {
            const user = await UserModel.findOne({
                email: username,
            });

            if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

            // if (user.password !== passport) {
            //     return cb(null, false, { message: 'Incorrect username or password.' });
            // }
            return cb(null, user);

        } catch (err) {
            console.log('err', err)
            if (err) { return cb(err); }

        }
    }))

    passport.serializeUser((user, done) => {
        console.log('serialize user', user)
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        console.log('deserializeUser', id)
        const user = await UserModel.findById(id)
        done(null, user)
    })
}