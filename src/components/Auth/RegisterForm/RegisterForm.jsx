import { useFormik } from "formik";
import React from "react";
import { Form } from "semantic-ui-react";
import { initialValues, validationSchema } from "./RegisterForm.form";
import { Auth } from "@/api/auth";
import { useRouter } from "next/router";

const authCtrl = new Auth();

const RegisterForm = () => {
    const router = useRouter()
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await authCtrl.register(formValue);
                console.log("SUCCESS")
                router.push("/join/sign-in")
            } catch (error) {
                console.log(error);
            }
        },
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
                <Form.Input
                    name="email"
                    type="text"
                    placeholder="Correo Electronico"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                />
                <Form.Input
                    name="username"
                    type="text"
                    placeholder="Nombre de usuario"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.errors.username}
                />
           
             
                <Form.Input
                    name="password"
                    type="password"
                    placeholder="Contrasena"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                />
          

            <Form.Button type="submit" fluid loading={formik.isSubmitting}>
                Registrarse
            </Form.Button>
        </Form>
    );
};

export default RegisterForm;
