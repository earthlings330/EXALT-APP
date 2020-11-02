// const [setup, setSetup] = useState(false)
 
 
 // const handleSubmit = useCallback(event => {
    //     event.preventDefault()
    //     if (!name.touched || !email.touched) {
    //         if (!name.touched) {
    //             setName(prevState => ({
    //                 ...prevState,
    //                 error: "Name required",
    //                 touched: true,
    //                 valid: false
    //             }))
    //         }
    //         if (!email.touched) {
    //             setEmail(prevState => ({
    //                 ...prevState,
    //                 error: "E-mail required",
    //                 touched: true,
    //                 valid: false
    //             }))
    //         }
    //     } else if (name.valid && email.valid) {
    //         if (props.type) {
    //             onAddUser(name.value, email.value, role);
    //             setSendData(true)
    //         }
    //         else {
    //             editEmployee(name.value, email.value, role, key);
    //             setSendData(true);
    //         }

    //     } else {
    //         return;
    //     }

    // }, [onAddUser, editEmployee, name, email, role])


    // useEffect(() => {

    //     if (!type) {
    //         const employeeName = employee.name
    //         const employeeEmail = employee.email
    //         const employeeRole = employee.role

    //         if (!setup) {
    //             setName({
    //                 value: employeeName,
    //                 // valid: true,
    //                 // touched: true,
    //                 // requiered: true
    //             })
    //             setEmail({
    //                 value: employeeEmail,
    //                 // valid: true,
    //                 // touched: true,
    //                 // requiered: true
    //             })
    //             setRole(employeeRole)
    //         }
    //         setSetup(true)
    //     } else {
    //         setSetup(false)
    //     }
    //     return () => { }
    // }, [employee])



    
    const [name, setName] = useState({
        value: '',
        // valid: false,
        // touched: false,
        // requiered: true,
        // error: ''
    })
    const [email, setEmail] = useState({
        value: '',
        // valid: false,
        // touched: false,
        // requiered: true,
        // error: ''
    })
    const [role, setRole] = useState('employee')

    // const nameChangeHandeler = useCallback(event => {

    //     let value = event.target.value

    //     if (value !== '' && !isNumeric(value)) {
    //         setName(prevState => ({
    //             ...prevState,
    //             value: value,
    //             touched: true
    //         }))
    //         if (value.length > 5) {
    //             setName(prevState => ({
    //                 ...prevState,
    //                 value: value,
    //                 valid: true,
    //                 error: ''
    //             }))
    //         } else {
    //             setName(prevState => ({
    //                 ...prevState,
    //                 error: 'Please make sure your name more than 5 chars',
    //                 valid: false
    //             }))
    //         }
    //     } else {
    //         if (value === '') {
    //             setName(prevState => ({
    //                 ...prevState,
    //                 value: value,
    //                 error: "Name requiered",
    //                 valid: false
    //             }))
    //         } else if (isNumeric(value)) {
    //             setName(prevState => ({
    //                 ...prevState,
    //                 value: value,
    //                 error: "Invalid name",
    //                 valid: false
    //             }))
    //         }
    //     }
    // }, [name])
    // const isNumeric = value => /^-?[\d.]+(?:e-?\d+)?$/.test(value);


    // const emailChangeHandle = useCallback(event => {
    //     const value = event.target.value
    //     if (value !== '') {
    //         setEmail(prevState => ({
    //             ...prevState,
    //             value: value,
    //             touched: true
    //         }))
    //         if (EmailValidator.validate(value)) {
    //             setEmail(prevState => ({
    //                 ...prevState,
    //                 value: value,
    //                 valid: true,
    //                 error: ''
    //             }))
    //         } else {
    //             setEmail(prevState => ({
    //                 ...prevState,
    //                 value: value,
    //                 valid: false,
    //                 error: 'Invalid E-mail'
    //             }))
    //         }

    //     } else {
    //         if (value === '') {
    //             setEmail(prevState => ({
    //                 ...prevState,
    //                 value: value,
    //                 error: "E-mail required",
    //                 valid: false
    //             }))
    //         }
    //     }
    // }, [email])