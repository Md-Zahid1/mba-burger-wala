
export const  isAuthenticated = (req, res, next) => {
    const token = req.cookies["connect.sid"]

    console.log(token)

    if(!token) {
        return res.status(400).json({massege: "token Not Availeble"})
    }
    next()
} 


export const  authorizeAdmin = (req, res, next) => {

     if(!req.user) {
        return res.status(405).json({ messege: "You are not login"})
     }

    if(req.user.role !== "admin") {
        return res.status(405).json({massege: "Only Admin Allowed"})
    }
    next()
} 