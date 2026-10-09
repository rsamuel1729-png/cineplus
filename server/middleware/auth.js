const jwt=require('jsonwebtoken');
function auth(req,res,next){const token=(req.headers.authorization||'').replace(/^Bearer /,'');try{if(!token)throw Error();req.auth=jwt.verify(token,process.env.JWT_SECRET);next();}catch{return res.status(401).json({error:'Login required or session expired'});}}
function admin(req,res,next){if(req.auth.role!=='admin')return res.status(403).json({error:'Admin access required'});next();}
module.exports={auth,admin};
