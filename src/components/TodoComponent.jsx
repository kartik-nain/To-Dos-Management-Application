import { useNavigate, useParams } from "react-router-dom"
import { retrieveTodoByIdApi, updateTodoByIdApi, createTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment/moment";

export default function Todo(){

    const {id} = useParams()
    const auth = useAuth()
    const username = auth.username

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    function getToDoById(){
        if(id!=-1){
            retrieveTodoByIdApi(username, id)
                .then((res) => {
                    setDescription(res.data.description)
                    setTargetDate(res.data.targetDate)
                })
                .catch((err) => console.log(err))
        }   
    }

    useEffect(() => getToDoById(), [id])

    const navigate = useNavigate()
    function onSubmit(values){
        console.log(values)
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        if(id==-1){
            createTodoApi(username, todo)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        }else{
            updateTodoByIdApi(username, id, todo)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        }
        
        navigate('/todos')
    }

    function validate(values){
        let errors = {}
        if(values.description.length < 5){
            errors.description = 'Enter atleast 5 characters'
        }
        if(values.targetDate == null || values.targetDate=='' || !moment(values.targetDate).isValid()){
            errors.description = 'Enter target date'
        }
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1><br></br>
            <div>
                <Formik initialValues= {{description, targetDate}} onSubmit={onSubmit} enableReinitialize={true} validate={validate} validateOnChange={false} validateOnBlur={false}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset><br></br>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}