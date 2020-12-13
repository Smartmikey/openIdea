const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {getUserId, APP_SECRET} = require("../../utils")

// creating a single user

const createUser = async (parent, args, context, info) => {
    const pass = await bcrypt.hash(args.password, 10)

    const user = await context.prisma.user.create({
        data: {
            name: args.name,
            email: args.email,
            country: args.country,
            password: pass
        }
        
    })

    const token = jwt.sign({userId: user.id}, APP_SECRET)

    return {
        token,
        user,
    }
}

const login = async (parent, args, context, info)=>{
        const user = await context.prisma.user.findUnique({
            where: {
                email: args.email,
            },
        })
   
        if(!user) {
        throw new Error("Email does not exist")
        
        }
   
    const valid = await bcrypt.compare(args.password, user.password)

    if(!valid){
        throw new Error("Incorrect password")
    }

    const token = jwt.sign({userId: user.id}, APP_SECRET)

    return {
        token,
        user,
    }
}

const createCategory = async (parent, args, context, info) => {

    
    return await context.prisma.category.create({

        data: {
            title: args.title,
            slug: `/category/${args.slug}`,
        }
    })
}

const createPost = async (parent, args, context, info) => {

    const categoryExists = await context.prisma.category.findUnique({
        where: {
            id: args.category
        }
    })
    const userId = getUserId(context)
    if(!categoryExists) {throw new Error("Category doesn't exist")}
        return await context.prisma.post.create({
            data: {
                ...args,
                postBy: {
                    connect: {
                        id: userId
                    }
                },
                category: {
                    connect: {
                        id: args.category
                    }
                }

            }
        })
    

    
}

const vote = async (parent, args, context, info ) => {
    const userID = getUserId(context)

    const hasVoted = await context.prisma.vote.findMany({
        where: {
            AND: [{
                userId:   userID,
            },
            {
                postId: args.postId
            }]
        },
        include: {
            user: true,
            post: true
        }
    
    })

    console.log(hasVoted);

    if(hasVoted.length > 0) throw new Error("You have already voted")
    const vote = await context.prisma.vote.create({
        data: {
            user: {
            connect: {
                id: userID
            }},
            post: {
                connect: {
                    id: args.postId
                }}
        }
    })

    
    return vote
}

const comment = async (parent, args, context, info) => {
    const userId = getUserId(context)

    const checkIfCommentExist = await context.prisma.comment.findMany({
        where: 
            {AND: [{
                postId: args.post
            },
            {
                content: args.content
            },
            {commentBy: userId}
        ]}
    })

    if(checkIfCommentExist.length > 0){
        console.log(checkIfCommentExist);
        throw new Error("same comment already exist by you.")
    
    }

    const commentText = await context.prisma.comment.create({
        data: {
            content: args.content,
                post: {
                    connect: {
                        id: args.post
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
        }
        
    })

    return commentText
}
module.exports = {
    createUser,
    login,
    createCategory,
    createPost,
    vote,
    comment
}