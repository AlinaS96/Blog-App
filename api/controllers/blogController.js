const Blog = require('../models/Blog')

async function createBlog(req, res, next) {
    try {
        // const newBlog = new Blog({ ...req.body})
        const newBlog = new Blog({ ...req.body, user: req.user.id })
        await newBlog.save()

        res.status(200).json("new Blog has been created")
    } catch (err) {
        next(err)
    }
    // try {
    //     console.log(req.file)
    //     const image=req.file.filename
    //     const newBlog = new Blog({ image:image,title:req.body.title,desc:req.body.desc, user: req.user.id })
    //     await newBlog.save()
    //     res.status(200).json("new Blog has been created")
    // } catch (err) {
    //     next(err)
    // }

}

async function updateBlog(req, res, next) {
    try {
        const blog = await Blog.findById(req.params.id)
        if (req.user.id === blog.user.toString()) {
            const updateBlog = await Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).send(updateBlog)
        }
        else {
            res.status(401).send("access denied")
        }
    } catch (err) {
        next(err)
    }
}

async function deleteBlog(req, res, next) {
    try {
        const blog = await Blog.findById(req.params.id)
        if (req.user.id == blog.user.toString()) {
            await Blog.findByIdAndDelete(req.params.id)
            res.status(200).send('Blog has been deleted')
        }
        else {
            res.status(401).send("access denied")
        }
    } catch (err) {
        next(err)
    }
}

async function getBlog(req, res, next) {
    try {
        const blog = await Blog.findById(req.params.id)
        res.status(200).send(blog)
    } catch (err) {
        next(err)
    }
}

async function getBlogByUser(req, res, next) {
    try {
        const userBlogs = await Blog.find({ user: req.params.userId })
        res.status(200).send(userBlogs)
    } catch (err) {
        next(err)
    }
}

async function getBlogs(req, res, next) {
    const cat = req.query.category
    const user = req.query.user
    if (cat) {
        try {
            const categorizedBlogs = await Blog.find({ category: cat })
            res.status(200).send(categorizedBlogs)
        } catch (err) {
            next(err)
        }
    }
    if (user) {
        try {
            const userBlogs = await Blog.find({ user: req.params.userId })
            res.status(200).send(userBlogs)
        } catch (err) {
            next(err)
        }

    }
    else {
        try {
            const lifeBlogs = await Blog.find({ category: 'Life' })
            res.status(200).send(lifeBlogs)
        } catch (err) {
            next(err)
        }

    }
}

async function getBlogByCategory(req, res, next) {
    try {
        const category = req.query.category;
        const categorizedBlogs = await Blog.find({ category: category })
        res.status(200).send(categorizedBlogs)
    } catch (err) {
        next(err)
    }
}

module.exports = { createBlog, updateBlog, deleteBlog, getBlog,getBlogs, getBlogByUser, getBlogByCategory }