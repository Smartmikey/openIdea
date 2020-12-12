const {userID} = require("../../utils")

module.exports = {
    async success (parent, args, context, info) {
        
        return "Thank you for voting"
    },
     async post (parent, args, context, info) {
        return context.prisma.post.findUnique({where:{id: parent.id}}).post();
    },
}