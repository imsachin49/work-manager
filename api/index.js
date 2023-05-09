const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const port=process.env.PORT || 8800;
const taskRoutes=require('./routes/task');
const userRoutes=require('./routes/user');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin: ['http://localhost:3000','https://work-manager-pi.vercel.app'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    // acess to XMLHttpRequest at 'https://work-manager-pi.vercel.app/api/users/login' from origin 'https://work-manager-u8s2.vercel.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
    // to enconter this error we need to add the following code
    optionsSuccessStatus: 200
}));
  
// Routes
app.use('/api/tasks',taskRoutes);
app.use('/api/users',userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

// listen to port
app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});
