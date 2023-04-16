import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { executeRegistrationService } from "./api/AuthenticationApiService";

export default function RegisterComponent() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [hasSucceeded, setHasSucceeded] = useState(false)
    const [hasFailed, setHasFailed] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [failMessage, setFailMessage] = useState('')

    async function handleSubmit(values) {
        const res = await executeRegistrationService(values.firstname, values.lastname, values.username, values.password)
        if(res=="User Registered Successfully"){
            setSuccessMessage(res)
            setHasFailed(false)
            setHasSucceeded(true)
        }else{
            setFailMessage(res)
            setHasSucceeded(false)
            setHasFailed(true)
        }
    }

    function validate(values){
        let errors = {}
        if(values.firstname == null || values.firstname==''){
            errors.firstname='Please enter a First Name'
        }
        if(values.lastname == null || values.lastname==''){
            errors.lastname='Please enter a Last Name'
        }
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
            <h1>Time To Register!</h1><br></br>
            <div className="row justify-content-center">
                <div className="RegisterForm">
                    <Formik initialValues={{ firstname, lastname, username, password }} onSubmit={handleSubmit} enableReinitialize={true} validate={validate} validateOnBlur={false} validateOnChange={false}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="firstname" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="lastname" component="div" className="alert alert-warning" />
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
                                    {hasFailed && <div className="alert alert-danger"><div className="failMessage">{failMessage}</div></div>}
                                    {hasSucceeded && <div className="alert alert-success"><div className="successMessage">{successMessage}</div></div>}
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )
}