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
    origin: ['http://localhost:3000'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    optionsSuccessStatus: 200
}));


// preflight request
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
}); //this is to prevent CORS errors

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
