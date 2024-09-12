import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import { connectPassport } from "./utils/Provider.js";
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import venderRoutes from './routes/vender.route.js'
import categoryRoutes from './routes/category.route.js'
import destinationRoutes from './routes/destination.route.js'
import rattingRoutes from './routes/ratting.route.js'
import supportRoutes from './routes/support.route.js'
import staticPageRoutes from './routes/staticPage.route.js'
import enquiryRoutes from './routes/enquiry.route.js'
import faqRoutes from './routes/faq.route.js'
import staticksFilesRoutes from './routes/staticksFiles.route.js'
import otpAuthRoutes from './routes/otpAuth.route.js'
import portfolioRoutes from './routes/portfolio.route.js'
import badgeRoutes from './routes/badge.route.js'
import paymentRoutes from './routes/payment.route.js'
import dashboardRoutes from './routes/dashboard.route.js'
import activityRoutes from './routes/activity.route.js'
import metroCityRoutes from './routes/metroCity.route.js'
import venderDashboardRoutes from './routes/venderDashboard.route.js'
import subscriptionPackegeRoutes from './routes/subscriptionPackege.route.js'
import cors from 'cors'
import MongoStore from 'connect-mongo'
import compression from 'express-compression'

const app = express();


dotenv.config({
    path: "./config/config.env",
})

app.use(cookieParser())

app.use(compression())

// using middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    // cookie: {
    //     secure: process.env.NODE_ENV === "development" ? false : true,
    //     httpOnly: process.env.NODE_ENV === "development" ? false : true,
    //     sameSite: process.env.NODE_ENV === "development" ? false : true
    // }
}));


app.use(express.json());
app.use(urlencoded({ extended: true }))

app.use(cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_2],
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

// app.use(passport.authenticate('session'));
// app.use(passport.initialize());
// app.use(passport.session());
// app.enable("trust proxy")

// connectPassport();
app.use("/uploads", express.static('uploads'))

//importing routes
app.use("/api/v1", userRoutes)
app.use("/api/v1", venderRoutes)
app.use('/api/v1', categoryRoutes)
app.use('/api/v1', destinationRoutes)
app.use('/api/v1', rattingRoutes)
app.use("/api/v1", supportRoutes)
app.use("/api/v1", staticPageRoutes)
app.use("/api/v1", enquiryRoutes)
app.use("/api/v1", faqRoutes)
app.use('/api/v1', staticksFilesRoutes)
app.use('/api/v1', otpAuthRoutes)
app.use("/api/v1", portfolioRoutes)
app.use("/api/v1", badgeRoutes)
app.use("/api/v1", dashboardRoutes)
app.use("/api/v1", activityRoutes)
app.use("/api/v1", metroCityRoutes)
app.use("/api/v1", venderDashboardRoutes)
app.use("/api/v1", paymentRoutes)
app.use("/api/v1", subscriptionPackegeRoutes)

export default app