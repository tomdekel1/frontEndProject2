import { useFormik } from 'formik'
import Input from '../Input';
import Joi from "joi"
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import CheckBox from '../CheckBox';
import { useAuth } from '../../contexts/auth.context';

function SignupBiz(){
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    const { signUp, user } = useAuth()

    const form = useFormik({
        validateOnMount: true,
        initialValues:{
            name:{
                first:"",
                last:"",
            },
            email:"",
            password:"",
            phone:"",
            address:{
                country:"",
                city:"",
                street:"",
                houseNumber:"",
                zip:"",
            },
            image:{
                url:"",
                alt:"",
            },
            isBusiness: false,
        },
        validate(values){
           const schema = Joi.object({
                name: Joi.object().keys({
                    first: Joi.string().min(2).max(255).required().label("first"),
                    last: Joi.string().min(2).max(255).required().label("last"),
                }),
                email: Joi.string().min(2).max(255).required().email({ tlds: { allow: false }}).label("Email"),
                password: Joi.string().min(6).max(255).required().label("Password"),
                phone: Joi.string().min(9).max(11).required().label("Phone"),
                address:Joi.object({
                    country:Joi.string().min(2).max(255).required(),
                    city:Joi.string().min(2).max(255).required(),
                    street:Joi.string().min(2).max(255).required(),
                    houseNumber:Joi.string().min(2).max(255).required(),
                    zip:Joi.string().min(2).max(255).required(),
                }),
                image: Joi.object({
                    url: Joi.string().min(2).required(),
                    alt: Joi.string().min(2).max(255),
                }),
                isBusiness: Joi.boolean(),

           })
           const { error } = schema.validate(values, {abortEarly: false});
           if(!error){
            return null
           }

           const errors = {};
           for (const detail of error.details){
            const key = detail.path.join(".")

            errors[key] = detail.message
           }
           console.log(errors)
           return errors;
        },
        async onSubmit(values){
            console.log(values)
            try{
                const res = await signUp(values);
                console.log(res)
                navigate('/Login')
            } catch(err){
                if(err.response?.status === 400){
                    setServerError(err.response.data)
                }
            }
        }
    })

    
    if (user){
        return <Navigate to="/" />
    }

    return(
        <div style={{display: "flex", flexDirection:"column", justifyContent:"center",background:"var(--background-color)",color:"var(--text-color)",}}>
        <h1 className='mx-5 mb-4 pt-4 pb-4' style={{textAlign:"center", borderBottom:"2px solid black"}}>signup</h1>
        <form onSubmit={form.handleSubmit}>
        <Input
            {...form.getFieldProps('name.first')}
            label="first name"
            required
            placeholder="john doe"
            error={ form.errors.name?.first}
            type="text" />
        <Input
            {...form.getFieldProps('name.last')}
            label="last name"
            required
            placeholder="john doe"
            error={ form.errors.name?.last}
            type="text" />
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
        <Input
            {...form.getFieldProps('phone')}
            label="phone"
            required
            placeholder="john doe"
            error={form.touched.phone && form.errors.phone}
            type="text" />
        <Input
            {...form.getFieldProps('address.country')}
            label="country"
            required
            placeholder="john doe"
            error={form.touched.address?.country && form.errors.address?.country}
            type="text" />
        <Input
            {...form.getFieldProps('address.city')}
            label="city"
            required
            placeholder="john doe"
            error={form.touched.address?.city && form.errors.address?.city}
            type="text" />
        <Input
            {...form.getFieldProps('address.street')}
            label="street"
            required
            placeholder="john doe"
            error={form.touched.address?.street && form.errors.address?.street}
            type="text" />
        <Input
            {...form.getFieldProps('address.houseNumber')}
            label="houseNumber"
            required
            placeholder="john doe"
            error={form.touched.address?.houseNumber && form.errors.address?.houseNumber}
            type="text" />
        <Input
            {...form.getFieldProps('address.zip')}
            label="zip"
            required
            placeholder="john doe"
            error={form.touched.address?.zip && form.errors.address?.zip}
            type="text" />
        <Input
            {...form.getFieldProps('image.url')}
            label="url"
            required
            placeholder="john doe"
            error={form.touched.address?.zip && form.errors.address?.zip}
            type="text" />
        <Input
            {...form.getFieldProps('image.alt')}
            label="alt"
            required
            placeholder="john doe"
            error={form.touched.address?.zip && form.errors.address?.zip}
            type="text" />
        <CheckBox 
            {...form.getFieldProps('isBusiness')}
            label="isBusiness"
            type="checkbox"
            />
        {serverError && <div className='alert alert-danger'>{serverError}</div>}

        <button disabled={!form.isValid} className='btn btn-primary' type="submit">Sign Up</button>
        
       
        </form>
        </div>
    )
}

export default SignupBiz;