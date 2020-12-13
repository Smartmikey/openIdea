const {userID} = require("../../utils")

module.exports = {
    
     async postId (parent, args, context, info) {
        return await context.prisma.vote.findUnique({where:{id: parent.id}}).postId();
    },
     async userId (parent, args, context, info) {
        return await context.prisma.vote.findUnique({where:{id: parent.id}}).user();
    },
}