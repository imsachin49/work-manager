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

module.exports = {verifyToken};
