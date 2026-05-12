import jwt from "jsonwebtoken";
const auth = (requiredRole = null) => {
return async (req, res, next) => {
  let token = req.header("authorization");
  if(!token) return res.status(401).json({ message: "access denied. no token provided" });
  token = token.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if(err) {
        return res.status(401).json({ message: "invalid token" });
    }else{
        console.log(decoded);
        req.user = decoded;
        if(requiredRole && decoded.role !== requiredRole) {
            return res.status(403).json({ message: "forbidden. insufficient permissions" });
        }
        next();
    }
  })
 }
}

export default auth;