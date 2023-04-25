import { useEffect, useState } from "react"
import { retrieveAllTodosForUsernameApi, deleteTodoForIdApi} from "./api/TodoApiService"
import { useAuth } from './security/AuthContext'
import { useNavigate } from "react-router-dom"

export default function ListComponent(){

    const [todos, setTodos] = useState([])

    const auth = useAuth()
    function refreshTodos(){
        retrieveAllTodosForUsernameApi(auth.username)
            .then((res) => {
                console.log(res)
                setTodos(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => refreshTodos(), [])

    function deleteTodo(id){
        deleteTodoForIdApi(auth.username,id)
            .then(() => {
                refreshTodos()
            })
            .catch((err) => console.log(err))
    }

    const navigate = useNavigate()
    function updateTodo(id){
        navigate(`/todo/${id}`)
    }

    function addTodo(){
        navigate(`/todo/-1`)
    }

    return(
        <div className="container">
            <h1>All To-Dos</h1>
            <br></br>
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>{todo.targetDate}</td>
                            <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                            <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                        </tr>
                    )
                        
                    )}
                </tbody>
            </table>
            <div className="btn btn-primary m-5" onClick={addTodo}>Add New Todo</div>
        </div>
        
    )
}