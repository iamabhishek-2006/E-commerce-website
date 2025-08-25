module.exports=(req,res,next)=>{
    if(req.user.role !=="admin"){
        console.log(req.user);
        return res.status(403).json({success:false,error:"Access denied"});
    }
    next();
}