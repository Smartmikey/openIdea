module.exports = {
    async post (parent, args, context, info) {
        return context.prisma.user.findUnique({where:{id: parent.id}}).post();
    }
}