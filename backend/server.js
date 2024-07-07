const express = require("express")
const app = express()
const PORT = process.env.PORT || 9999
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const dbConnect = require("./utils/dbConnect")
const userRouter = require("./routes/userRoutes")
const indexRouter = require("./routes/index")
const cors = require("cors")
const morgan = require("morgan")

//app.use(morgan('dev'))
app.use(cors())
dbConnect()
app.use(indexRouter)
app.use(userRouter)

app.listen(PORT, () => {
    console.log("Blog server side running on port", PORT)
})