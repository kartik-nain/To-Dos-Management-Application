import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { executeRegistrationService } from "./api/AuthenticationApiService";

export default function RegisterComponent() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState(false)
    const [failMessage, setFailMessage] = useState(false)

    function handleSubmit(values) {
        if (executeRegistrationService(values.firstname, values.lastname, values.username, values.password)) {
            setSuccessMessage(true)
        } else {
            setFailMessage(true)
            console.log("Error")
        }
    }

    return (
        <div className="container">
            <h1>Time To Register!</h1><br></br>
            <div className="row justify-content-center">
                <div className="RegisterForm">
                    <Formik initialValues={{ firstname, lastname, username, password }} onSubmit={handleSubmit}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="username" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="password" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>First Name</label>
                                        <Field type="text" className="form-control" name="firstname" />
                                    </fieldset><br></br>
                                    <fieldset className="form-group">
                                        <label>Last Name</label>
                                        <Field type="text" className="form-control" name="lastname" />
                                    </fieldset><br></br>
                                    <fieldset className="form-group">
                                        <label>Username</label>
                                            <Field type="text" className="form-control" name="username" />
                                    </fieldset><br></br>
                                    <fieldset className="form-group">
                                        <label>Password</label>
                                        <Field type="password" className="form-control" name="password" />
                                    </fieldset>
                                    <div>
                                        <button className="btn btn-primary m-4" type="submit">Register</button>
                                    </div>
                                    {failMessage && <div className="alert alert-danger"><div className="failMessage">Authentication Failed. Please try again.</div></div>}
                                    {successMessage && <div className="alert alert-success"><div className="successMessage">Registration Successful. Please login.</div></div>}
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )
}