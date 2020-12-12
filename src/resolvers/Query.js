const info =()=>{return "this is a string"}

const  findOneUser = async (parent, args, context, info) => {
    let  user = await context.prisma.user.findOne({
        where: {
            email: args.email
        }
    })
    return user
}

const getAllPost = async (parent, args, context, info) => {
    return await context.prisma.post.findMany();
}

const getPost = async (parent, args, context, info) => {
    const post = await context.prisma.post.findUnique({
        where: {
            id: args.id
        }
    })
    return post
}

module.exports ={
    info,
    findOneUser,
    getAllPost,
    getPost
}