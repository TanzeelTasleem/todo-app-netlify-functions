import React, { useEffect, useState } from "react"
import Icon from "../images/delete.png"
const Todo = () => {
  const [data, setData] = useState("")
  const [loading, setloading] = useState(true)
  const [value, setValue] = useState("")

  const getData = async () => {
    const respone = fetch("/.netlify/functions/get-todos")
    // const todo = await (await respone).json()
    // console.log(todo)
    setData(await (await respone).json())
    setloading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setloading(true)
    const response = await fetch("/.netlify/functions/post-todo", {
      body: JSON.stringify({ title: value }),
      method: "POST",
    })
    setValue("")
    {
      response && getData()
    }
  }

  const deleteTodo = async(ref)=>{
    setloading(true)
    const response = await fetch("/.netlify/functions/delete-todo", {
      body: JSON.stringify({ ref : ref }),
      method: "DELETE",
    })
    {response && getData()}
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          required
          onChange={e => {
            setValue(e.target.value)
          }}
        />
        <button>add Todo</button>
      </form>
      {loading && <h4>loading data ...</h4>}
      {data &&
        data?.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "300px",
            }}
          >
            <p>{item.todo}</p>
            <input
              type="image"
              alt="delete"
              onClick={()=>{deleteTodo(item.ref)}}
              src={Icon}
              style={{ width: "20px", height: "20px" }}
            />
          </div>
        ))}
    </div>
  )
}

export default Todo
