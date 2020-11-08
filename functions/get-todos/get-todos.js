const faunadb = require("faunadb")
const q = faunadb.query
const dotenv = require('dotenv')
dotenv.config()

exports.handler = async (event) => {
  if (process.env.FAUNA_SECRET) {
    try {
      const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET })
      const result = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection("todos"))),
          q.Lambda(x => q.Get(x))
        )
      )
       const data = await result.data.map(obj =>{ 
        return {
          todo : obj.data.title,
          ref : obj.ref.id
        }
        }) 
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      }
    }
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "no keys were found" }),
    }
  }
}
