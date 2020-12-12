module.exports = {
     async category (parent, args, context, info) {
        return context.prisma.post.findUnique({where:{id: parent.id}}).category();
    },
     async postBy (parent, args, context, info) {
        return context.prisma.post.findUnique({where:{id: parent.id}}).postBy();
    },
     async comments (parent, args, context, info) {
        return context.prisma.post.findUnique({where:{id: parent.id}}).comments();
    },
     async vote (parent, args, context, info) {
        return context.prisma.post.findUnique({where:{id: parent.id}}).vote();
    },
     async implementedBy (parent, args, context, info) {
        return context.prisma.post.findUnique({where:{id: parent.id}}).implementedBy();
    },
}