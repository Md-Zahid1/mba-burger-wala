import app from "./app.js";
import { connectDB } from "./config/database.js";

connectDB();

app.get("/", (req, res, next) => {
    res.send("<h1>Working</h1>")
})

const PORT = process.env.PORT


app.listen(PORT, () => console.log(`server is working on ${PORT}, in ${process.env.NODE_ENV} MODE`))