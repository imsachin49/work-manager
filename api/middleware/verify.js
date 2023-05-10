const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).json({error:"Access Denied"});
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    // console.log(token);
    try{
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      console.log("yess!! token verified now")
      req.user = verified;
    }
    catch(err){
      console.log("nooo!!"+err)
      return res.status(400).json({error:"Invalid Token"});
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// cors middleware to allow cross origin requests
// const cors = (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // add this line
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// };

// make function using 
// 

const corsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
};


module.exports = {verifyToken,corsMiddleware};
