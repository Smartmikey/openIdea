const APP_SECRET = "openIdea-better-world"

const jwt = require("jsonwebtoken")


const getUserId = (context) => {
    const Authorization = context.request.get("Authorization")

    if(Authorization){
        const token = Authorization.replace("Bearer ", "");
        const { userId } = jwt.verify(token, APP_SECRET)

        return userId
    }
    throw new Error("You must be logged in to perform this operation")
}
//utility functions
module.exports = {
    APP_SECRET,
    getUserId
}
