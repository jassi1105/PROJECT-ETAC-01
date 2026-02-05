const express=require("express")
const mongoose=require("mongoose")
const env=require("dotenv")
const cors=require("cors")
const session=require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session);

const userRoutes=require("./routes/userroute.js")   
const customerRoutes=require("./routes/customerroute.js")   
const usercustomerRoute=require("./routes/usercustomerroute.js")
  
env.config()

const app=express()
const PORT=process.env.PORT

app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173", // your Vite frontend
  credentials: true,
}));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log("Error connecting to MongoDB:",err);
})


const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'mySessions'
});

app.use(session({
     name: "sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    httpOnly: true,
    secure: false,   // true ONLY if using HTTPS
    sameSite: "lax", // "none" ONLY if HTTPS
  },
}));



app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/user-customers", usercustomerRoute);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


