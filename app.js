import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import { connectPassport } from "./utils/Provider.js";
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import Orderrouter from "./routes/order.route.js";
import userRoutes from './routes/user.route.js';
import cors from 'cors'

const app = express();


dotenv.config({
    path: "./config/config.env",
})

app.use(cookieParser(),)

// using middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : true
    }
}));


app.use(express.json());
app.use(urlencoded({ extended: true }))

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy")


connectPassport();

//importing routes

app.use("/api/v1", userRoutes)
app.use("/api/v1", Orderrouter)
export default app