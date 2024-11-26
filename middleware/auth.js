const jwt = require("jsonwebtoken");
require("dotenv").config();
 
const verifyToken = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) return res.status(401).send("Access denied");
 
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).send("Access denied");
 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};
 
module.exports = verifyToken;