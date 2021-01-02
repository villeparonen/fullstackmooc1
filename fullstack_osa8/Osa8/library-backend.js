const jwt = require('jsonwebtoken')
const { ApolloServer, UserInputError, gql, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { findOneAndUpdate } = require('./models/author')

require('dotenv').config()

const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const secret = process.env.REACT_APP_API_KEY
const MONGODB_URI = `mongodb+srv://fullstack:${secret}@cluster0.6dcqw.mongodb.net/books?retryWrites=true&w=majority`
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



const typeDefs = gql`
  type Book {
    title: String
    published: Int
    author: Author
    genres: [String!]!
    pages: Int
    goal: String
    date: String
    notes: String
    id: ID!
  }
 
  type Author {
    name: String
    id: ID!
    born: String
    bookCount: Int
    books: [Book]
  }

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      pages: Int
      goal: String
      date: String
      notes: String
      genres: [String!]!
    ): Book
    editAuthor(
      name: String
      born: String
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
  }

  type Subscription {
    bookAdded: Book!
  }    
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {      
      allbooks = await Book.find({}, function(err, result) {
        if(err) {
          console.log(err)
        } else {
          let newArray = result.map(i=>{
            return {id: i._id.toString(), genres: i.genres, title: i.title, author: i.author, published: i.published, pages: i.pages, goal: i.goal, date: i.date, notes: i.notes }
          })
          return newArray
        }
      }).populate('author')

      if(Object.keys(args).length === 0) {
        return allbooks
      } else {
        return allbooks.filter(p => args.author ? p.author.name === args.author: p===p).filter(p => args.genre ? p.genres.includes(args.genre) : p===p)
      }
    },

    allAuthors: () => {
      return Author.find({}, function(err, result) {
        if(err) {
          console.log(err)
        } else {
          return result
        }
      }).populate('books')
    }
  },

  Mutation: {
    createUser: (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },


    addBook: async (root, args, context) => {
      console.log("context in addBook", context)
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
  
      if(args.title.length <= 2 || args.author.length <= 2) {
        throw new UserInputError("UserInputError. Given arguments are invalid. You gave too short book title or author name. Minimum is three characters", {
          invalidArgs: args,
        })
      } else {

        const author = new Author({name: args.author, born: null})
        ////// 1. CHECK IF AUTHOR EXISTS ALREADY
        Author.find({name: args.author}, function(err, rvalue) {
          if(rvalue.length === 0) {
        ////// 2. CREATE NEW AUTHOR AND NEW BOOK, AND PUBLISH SUBSCRIPTION
            console.log("new author, create new author and create new book linked together")
          author.save(function(err,room){
            console.log("test room", room)
            var newAuthorId = room._id;
            const book = new Book({ title: args.title, published: args.published, author: newAuthorId, genres: args.genres, pages: args.pages, goal: args.goal, date: args.date, notes: args.notes})
            return book.save(function(err, value) {
              let booksId = value._id;
              Author.findOneAndUpdate({_id: newAuthorId}, { $push: { books: booksId  } }, {returnOriginal: false}, function(err, ret) {
                console.log(ret)
              });
              pubsub.publish('BOOK_ADDED', { bookAdded: { title: args.title } })
              return;
            })
            })
          } else {
            ////// 3. AUTHOR EXISTS ALREADY -> CREATE NEW BOOK WITH THIS AUTHOR & UPDATE BOOKS IN AUTHOR, AND PUBLISH SUBSCRIPTION
            let existingAuthorsId = rvalue[0]._id
            console.log("author exists already")
            const book = new Book({ title: args.title, published: args.published, author: existingAuthorsId, genres: args.genres, pages: args.pages, goal: args.goal, date: args.date, notes: args.notes})
            return book.save(function(err, value) {
              let booksId = value._id;
              Author.findOneAndUpdate({_id: existingAuthorsId}, { $push: { books: booksId  } }, {returnOriginal: false}, function(err, ret) {
                console.log(ret)
              });
              pubsub.publish('BOOK_ADDED', { bookAdded: { title: args.title } })
              return;
            })
          }
        })
      }
        return;
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
  
      const foundAuthor = await Author.findOne({"name": args.name})
      foundAuthor.born = args.born
      try {
        await foundAuthor.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return foundAuthor
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },

  Author: {
    bookCount: async (root) => {
      return root.books.length
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // The context object is one that gets passed to every single resolver at every level, so we can access it anywhere in our schema code
  // the context is generated again with every new request, we don’t have to worry about cleaning up user data at the end of execution
  context: async ({ req }) => {
    // get the user token from the headers
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      // try to retrieve a user with the token, user is returned if token is valid
      const currentUser = await User.findById(decodedToken.id)
      // add the user to the context
      return { currentUser }
    }
  }
})

// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})