
const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    let likes = 0;
    blogs.forEach(b => {
        likes = likes + b.likes
    })
    return likes;
}


const favoriteBlog = (blogs) => {
    let maxLikes = 0
    blogs.forEach(b => b.likes > maxLikes ? maxLikes = b.likes : undefined)
    let obj = blogs.find(c => c.likes === maxLikes)
    return { title: obj.title, author: obj.author, likes: obj.likes }
}

const mostLikes = (blogs) => {
    alikes = blogs.map(b => {
        return { author: b.author, likes: b.likes }
    })
    let checked = []
    alikes.forEach(a => {
        if (checked.includes(a.author) === false) {
            checked.push(a.author)
        }
    })
    checked.forEach(author => {
        let l = 0
        alikes.forEach(x => {
            if (author === x.author) {
                l = l + x.likes
                x.likes = l
            }
        })
    })
    return alikes.filter(g => g.likes === Math.max(...alikes.map(e => e.likes)))[0]
}

const mostBlogs = (blogs) => {
    let theMostAssiduousAuthor = ""
    let max = 0
    blogs.forEach(b => {
        let count = 0
        blogs.forEach(c => {
            if (c.author === b.author) {
                count = count + 1
                if (count > max) {
                    max = count
                    theMostAssiduousAuthor = {
                        author: c.author,
                        blogs: count
                    }
                }
            }
        })
    })
    return theMostAssiduousAuthor
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}


