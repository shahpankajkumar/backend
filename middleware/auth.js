const jwt =  require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const authHeader = req.Header("Authorization");
    if(!authHeader) return res.status(401).send("Access denied");
    const token = authHeader.split(' ')[0];
    if(!token) return res.status(401).send("Access denied");
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(400).send("Invalid Token")
    }
}

module.exports = verifyToken;