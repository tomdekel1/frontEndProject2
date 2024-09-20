import { useFormik } from 'formik'
import Input from '../Input';
import Joi from "joi"
import { loginUser, getUser } from '../../services/usersService';
import { useAuth } from '../../contexts/auth.context';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Login() {
    const [serverError, setServerError] = useState("");
    const { login, user } = useAuth()
    const navigate = useNavigate()

    const form = useFormik({
        validateOnMount: true,
        initialValues: {
            email: "",
            password: "",
        },
        validate(values) {
            const schema = Joi.object({
                email: Joi.string().min(2).max(255).required().email({ tlds: { allow: false } }).label("Email"),
                password: Joi.string().min(6).max(255).required().label("Password"),

            })
            const { error } = schema.validate(values, { abortEarly: false });
            if (!error) {
                return null
            }

            const errors = {};
            for (const detail of error.details) {
                const key = detail.path[0]

                errors[key] = detail.message
            }
            console.log(errors)
            return errors;
        },
        async onSubmit(values) {
            try {
                const res = await login(values)
                console.log(res)
                navigate('/')
            }
            catch (err) {
                if (err.response?.status === 400) {
                    setServerError(err.response.data)
                }
            }
        }
    })

    if (user) {
        return <Navigate to="/" />
    }

    return (
        <div style={{ background: "var(--background-color)", height: "100vh", color: "var(--text-color)" }}>
            <h1 className='mx-5 pt-4 pt-4 pb-3' style={{ textAlign: "center", }}>login</h1>
            <form onSubmit={form.handleSubmit} className='mx-5 pt-4' style={{ borderTop: "2px solid black" }}>
                <Input
                    {...form.getFieldProps('email')}
                    label="email"
                    required
                    placeholder="john doe"
                    error={form.touched.email && form.errors.email}
                    type="text" />
                <Input
                    {...form.getFieldProps('password')}
                    label="password"
                    required
                    placeholder="john doe"
                    error={form.touched.password && form.errors.password}
                    type="text" />
                {serverError && <div className='alert alert-danger'>{serverError}</div>}

                <button disabled={!form.isValid} className='btn btn-primary' type="submit" style={{ marginLeft: "40%" }}>Sign Up</button>


            </form>
        </div>
    )
}

export default Login;