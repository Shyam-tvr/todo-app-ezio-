import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) => {
    const token = req.headers['authorization']
    if(token==null) {
        res.status(401).json({msg:"Unauthorized access"})
    }else{
        try {
            jwt.verify(token,'privateKey',(err,user)=>{
                if(err){
                    res.status(401).json({msg:"Unauthorized access"})
                }
                req.user = user
                next()
            })
        } catch (error) {
            console.log(error)
        }
    }
}