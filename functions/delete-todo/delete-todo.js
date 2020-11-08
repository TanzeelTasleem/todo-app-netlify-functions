const faunadb = require("faunadb")
const q = faunadb.query
const dotenv = require('dotenv')
dotenv.config()

exports.handler = async (event) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNA_SECRET,
    })
      try {
            const data =  JSON.parse(event.body)
            const result = await client.query(
            q.Delete(q.Ref(q.Collection("todos"), `${data.ref}`))
          )
        return {
            statusCode : 200,
            body:JSON.stringify(result.data)
        }
      } 
      catch (error) {
        return {
          statusCode: 500,
          body: error.message,
        }
      }
}
  