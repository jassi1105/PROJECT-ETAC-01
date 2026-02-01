const express=require("express")
const mongoose=require("mongoose")
const env=require("dotenv")
const cors=require("cors")

const userRoutes=require("./routes/userroute.js")   

env.config()

const app=express()
const PORT=process.env.PORT

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB");
    app.use('/api',userRoutes)
})
.catch((err)=>{
    console.log("Error connecting to MongoDB:",err);
})

app.use(express.json())


app.use(cors());

app.get("/hi",(req,res)=>{
    res.json("Hello World");
})



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


