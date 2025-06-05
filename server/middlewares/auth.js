export const adminAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; 

  console.log("Received token:", token);
  console.log("Expected token:", process.env.ADMIN_TOKEN);
  
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};
