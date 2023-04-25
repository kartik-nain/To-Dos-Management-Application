import todo from '../assets/todo.jpg'

export default function HomeComponent() {
    return(
        <div className="container">
            <h1>Welcome to the To-Do Management Application!</h1>
            <br></br>
            <img src={todo} style={{width: '600px'}} class="img-fluid"/>
            <p style={{fontSize:'8px'}}>Image Source: au.pcmag.com</p>
            
            <h3>Please Login or Register to get started.</h3>
        </div>
    )
}