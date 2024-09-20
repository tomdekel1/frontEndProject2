import { useFormik } from 'formik'
import Input from '../Input';
import Joi from "joi"
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import { createCard } from '../../services/cardsService';

function CreateCard() {
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    const form = useFormik({
        validateOnMount: true,
        initialValues: {
            title: "",
            subtitle: "",
            description: "",
            phone: "",
            email: "",
            web: "",
            image: {
                url: "",
                alt: "",
            },
            address: {
                state: "",
                country: "",
                city: "",
                street: "",
                houseNumber: "",
                zip: "",
            },
        },
        validate(values) {
            const schema = Joi.object({
                title: Joi.string().min(2).max(256).required().label("title"),
                subtitle: Joi.string().min(2).max(256).required().label("subtitle"),
                description: Joi.string().min(2).max(1024).required().label("description"),
                phone: Joi.string().min(9).max(11).required().label("Phone"),
                email: Joi.string().min(2).max(255).required().email({ tlds: { allow: false } }).label("Email"),
                web: Joi.string().min(2),

                image: Joi.object({
                    url: Joi.string().min(2).required(),
                    alt: Joi.string().min(2).max(255),
                }),

                address: Joi.object({
                    country: Joi.string().min(2).max(255).required(),
                    city: Joi.string().min(2).max(255).required(),
                    street: Joi.string().min(2).max(255).required(),
                    houseNumber: Joi.string().min(1).max(255).required(),
                    zip: Joi.string().min(2).max(255).required(),
                    state: Joi.string().min(2).max(255).allow(""),
                }),


            })
            const { error } = schema.validate(values, { abortEarly: false });
            if (!error) {
                return null
            }

            const errors = {};
            for (const detail of error.details) {
                const key = detail.path.join(".")

                errors[key] = detail.message
            }
            console.log(errors)
            return errors;
        },
        async onSubmit(values) {
            console.log(values)
            try {
                const res = await createCard(values);
                console.log(res)
            } catch (err) {
                if (err.response?.status === 400) {
                    setServerError(err.response.data)
                }
            }
        }
    })

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--background-color)", color: "var(--text-color)" }}>
            <h1 className='mx-5 mb-4' style={{ textAlign: "start", borderBottom: "2px solid black" }}>Create Card</h1>
            <form onSubmit={form.handleSubmit}>
                <Input
                    {...form.getFieldProps('title')}
                    label="title"
                    required
                    placeholder="title"
                    error={form.touched.title && form.errors.title}
                    type="text" />
                <Input
                    {...form.getFieldProps('subtitle')}
                    label="subtitle"
                    required
                    placeholder="subtitle"
                    error={form.touched.subtitle && form.errors.subtitle}
                    type="text" />
                <Input
                    {...form.getFieldProps('description')}
                    label="description"
                    required
                    placeholder="description"
                    error={form.touched.description && form.errors.description}
                    type="text" />
                <Input
                    {...form.getFieldProps('web')}
                    label="web"
                    required
                    placeholder="web"
                    error={form.touched.web && form.errors.web}
                    type="text" />
                <Input
                    {...form.getFieldProps('email')}
                    label="email"
                    required
                    placeholder="john doe"
                    error={form.touched.email && form.errors.email}
                    type="text" />
                <Input
                    {...form.getFieldProps('phone')}
                    label="phone"
                    required
                    placeholder="john doe"
                    error={form.touched.phone && form.errors.phone}
                    type="text" />
                <Input
                    {...form.getFieldProps('address.state')}
                    label="state"
                    required
                    placeholder="state"
                    error={form.touched.address?.country && form.errors["address.state"]}
                    type="text" />
                <Input
                    {...form.getFieldProps('address.country')}
                    label="country"
                    required
                    placeholder="john doe"
                    error={form.touched.address?.country && form.errors["address.country"]}
                    type="text" />
                <Input
                    {...form.getFieldProps('address.city')}
                    label="city"
                    required
                    placeholder="john doe"
                    error={form.touched.address?.city && form.errors["address.city"]}
                    type="text" />
                <Input
                    {...form.getFieldProps('address.street')}
                    label="street"
                    required
                    placeholder="john doe"
                    error={form.touched.address?.street && form.errors["address.street"]}
                    type="text" />
                <Input
                    {...form.getFieldProps('address.houseNumber')}
                    label="houseNumber"
                    required
                    placeholder="john doe"
                    error={form.touched.address?.houseNumber && form.errors["address.houseNumber"]}
                    type="text" />
                <Input
                    {...form.getFieldProps('address.zip')}
                    label="zip"
                    required
                    placeholder="john doe"
                    error={form.touched.address?.zip && form.errors["address.zip"]}
                    type="text" />
                <Input
                    {...form.getFieldProps('image.url')}
                    label="url"
                    required
                    placeholder="john doe"
                    error={form.touched.image?.url && form.errors["image.url"]}
                    type="text" />
                <Input
                    {...form.getFieldProps('image.alt')}
                    label="alt"
                    required
                    placeholder="john doe"
                    error={form.touched.image?.alt && form.errors["image.alt"]}
                    type="text" />

                {serverError && <div className='alert alert-danger'>{serverError}</div>}

                <button style={{ marginLeft: "40%", marginBottom: "1%", background: "var(--card-bg)" }} disabled={!form.isValid} className='btn btn-primary' type="submit">create card</button>


            </form>
        </div>
    )
}

export default CreateCard;