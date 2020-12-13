module.exports = {
  async user (parent, args, context, info) {
      return context.prisma.comment.findUnique({where: {id: parent.id}}).user()
  }
}