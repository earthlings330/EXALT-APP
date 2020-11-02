import React, { useCallback, useState, useEffect } from 'react';
import classes from './NewUser.css';
import BackDrop from '../../../UI/Backdrop/Backdrop'
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../../Store/action/index';
import Spinner from '../../../Components/Spinner/Spinner';
import { Formik } from 'formik';
import * as Yub from 'yup'


const newuser = React.memo(props => {

    const { type } = props
    const { onClose } = props
    const dispatch = useDispatch();
    const onAddUser = useCallback((name, email, role) => dispatch(actionType.addEmployee(name, email, role)), [])
    const editEmployee = useCallback((emName, emEmail, emRole, emKey) => dispatch(actionType.updateEmployee(emName, emEmail, emRole, emKey)), [])
    const loading = useSelector(state => state.emp.loading)
    const employee = useSelector(state => state.emp.employeeForEdit)
    const key = useSelector(state => state.emp.key)
    const [sendData, setSendData] = useState(false)


    useEffect(() => {
        if (!loading && sendData) {
            props.onClose();
        }
    }, [loading])



    return (
        <React.Fragment>
            <BackDrop show={props.show} />
            <div className={classes.Container} >
                <div className={classes.Header}>
                    <h4>{type ? "New User" : "Edit user"}</h4>
                    <button className={classes.closeX} onClick={props.onClose}><i className="fas fa-times fa-1x"></i></button>
                </div>

                <Formik initialValues={{ name: type ? '' : employee.name, email: type ? '' : employee.email, role: type ? 'employee' : employee.role }}
                    validationSchema={Yub.object().shape({
                        name: Yub.string().min(5, "Too short!").required("Name Required").max(20, "Too long!"),
                        email: Yub.string().email("Invalid Email").required("E-mail Required")
                    })}
                    onSubmit={values => {
                        setSendData(false)
                        console.log("from onSubmit", values)
                        if (type) {
                            onAddUser(values.name, values.email, values.role);
                            setSendData(true)
                        } else {
                            editEmployee(values.name, values.email, values.role, key);
                            setSendData(true);
                        }
                    }}>
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        } = props
                        let ModalBody = <div className={classes.Body} >
                            <div className={classes.NameSection}>
                                <label>Name</label>
                                <input type="text" placeholder="Enter employee name" name="name" value={values.name}
                                    onChange={handleChange} className={errors.name && touched.name ? classes.error : null}
                                    onBlur={handleBlur} />
                            </div>
                            {(errors.name && touched.name) ? <div className={classes.errorMsg}> <span> {"*" + errors.name} </span> </div> : null}
                            <div className={classes.EmailSection}>
                                <label>Email</label>
                                <input type="email" placeholder="Enter employee email" id="email" name="email"
                                    className={errors.email && touched.email ? classes.error : null}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                            </div>
                            {(errors.email && touched.email) ? <div className={classes.errorMsg}> <span> {"*" + errors.email} </span> </div> : null}
                            <div className={classes.RoleSection}>
                                <label>Role</label>
                                <select id="role"
                                    value={values.role}
                                    onChange={handleChange}>
                                    <option value="employee">Employee</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>
                        </div>
                        if (loading)
                            ModalBody = <Spinner />
                        return (
                            <form className={classes.Form} onSubmit={handleSubmit}>
                                {ModalBody}
                                <div className={classes.Footer}>
                                    <button type="button" onClick={onClose} className={classes.Cancel}>Cancel</button>
                                    <button type="submit" className={classes.Save}>{type ? "Save" : "Update"}</button>
                                </div>
                            </form>
                        )
                    }}

                </Formik>

            </div>
        </React.Fragment>
    )
})



export default newuser

