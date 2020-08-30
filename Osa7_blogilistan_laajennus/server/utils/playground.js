const blogs = [{ _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]


const favoriteBlog = (blogs) => {
    let maxLikes = 0
    blogs.forEach(b => b.likes > maxLikes ? maxLikes = b.likes : undefined)
    let obj = blogs.find(c => c.likes === maxLikes)
    return { title: obj.title, author: obj.author, likes: obj.likes }
}


const average = (array) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return array.length === 0
        ? 0
        : array.reduce(reducer, 0) / array.length
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
                        count: count
                    }
                }
            }
        })
    })
    return theMostAssiduousAuthor
}

// console.log(favoriteBlog(blogs))
// console.log(mostBlogs(blogs))
console.log(mostLikes(blogs))

