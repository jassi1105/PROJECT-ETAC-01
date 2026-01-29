const express=require("express")
const env=require("dotenv")

env.config()

const app=express()
const PORT=process.env.PORT


app.get("/hi",(req,res)=>{
    res.json("Hello World");
})



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


