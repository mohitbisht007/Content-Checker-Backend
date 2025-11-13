import jwt from "jsonwebtoken"

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    if(!token){
        return res.status(400).json("No Token Provided")
    }

    jwt.verify(token, "SecretWebToken", (err, user) => {
        if(err){
            return res.status(400).json("Invalid Token")
        }

        req.user = user
        next()
    })
}