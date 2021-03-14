

verifyToken = (req, res) => {
   let token = req.headers["x-observatory-auth"];
 
   if (!token) {
     return res.status(403).send({
       message: "No token provided!"
     });
   }