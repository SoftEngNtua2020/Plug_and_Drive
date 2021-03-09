

verifyToken = (req, res) => {
   let token = req.headers["x-access-token"];
 
   if (!token) {
     return res.status(403).send({
       message: "No token provided!"
     });
   }