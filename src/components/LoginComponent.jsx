import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from "./security/AuthContext"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { Link } from "react-router-dom";

export default function Login() {

    const [username, setUsername] = useState('')

    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const auth = useAuth()
    async function handleSubmit(values) {
        if (await auth.login(values.username, values.password)) {
            const usrname = values.username
            navigate(`/welcome/${usrname}`)
        } else {
            setFailMessage(true)
        }
    }

    const [failMessage, setFailMessage] = useState(false)

    function validate(values) {
        let errors = {}
        if (values.username == null || values.username == '') {
            errors.username = 'Please enter a username'
        }
        if (values.password == null || values.password == '') {
            errors.password = 'Please enter a password'
        }
        return errors
    }

    return (
        <div className="container">
            <h1>Time To Login!</h1><br></br>
            <div className="row justify-content-center">
                <div className="LoginForm">
                    <Formik initialValues={{ username, password }} onSubmit={handleSubmit} enableReinitialize={true} validate={validate} validateOnBlur={false} validateOnChange={false}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="username" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="password" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Username</label>
                                        <Field type="text" className="form-control" name="username" />
                                    </fieldset><br></br>
                                    <fieldset className="form-group">
                                        <label>Password</label>
                                        <Field type="password" className="form-control" name="password" />
                                    </fieldset>
                                    <div>
                                        <button className="btn btn-primary m-4" type="submit">Login</button>
                                    </div>
                                    {failMessage && <div className="alert alert-danger"><div className="failMessage">Authentication Failed. Please try again.</div></div>}
                                    <div>Don't have an account? <Link to="/register">Register Now</Link></div>
                                </Form>

                            )
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )
}