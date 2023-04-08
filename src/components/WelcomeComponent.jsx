import { useParams, Link } from "react-router-dom";
import { useState } from "react";



export default function Welcome() {
    const { username } = useParams();

    const [message, setMessage] = useState(null)
    function successResponse(response) {
        setMessage(response.data)
    }

    return (
        <div className="Welcome">
            <h3>Welcome {username}!</h3>
            <br></br>
            <div>
                {message}
            </div>
            <br></br>
            <div class="row justify-content-md-center">
                <div class="col col-lg-3">
                    <div class="card text-center text-bg-light mb-3">
                        <div class="card-header">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Manage Your To-Dos</h5>
                            <p class="card-text">See, Delete, Update or Add a To-Do</p>
                            <Link to='/todos' className="btn btn-primary">Manage</Link>
                        </div>
                    </div>
                </div>
                <div class="col col-lg-1">
                </div>
                <div class="col col-lg-3">
                    <div class="card text-center text-bg-light mb-3">
                        <div class="card-header">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Add a new To-Do</h5>
                            <p class="card-text">Add a new one</p>
                            <Link to='/todo/:id' className="btn btn-primary">Add</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}