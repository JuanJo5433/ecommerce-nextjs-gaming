import { Form } from "semantic-ui-react";
import styles from "./ChangeEmailForm.module.scss";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeEmailForm.form";
import { User } from "@/api/user";
import { useAuth } from "@/hooks/useAuth";

const userCtrl = new User();

export function ChangeEmailForm() {
    const {user, updateUser} = useAuth();
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await userCtrl.updateMe(user.id,{email: formValue.email} )
                updateUser("email", formValue.email)
                formik.handleReset();
            } catch (error) {
                console.error(error);
            }
        },
    });
    return (
        <Form onSubmit={formik.handleSubmit} className={styles.form}>
            <label>Cambiar correo electronico</label>

            <Form.Input
                name="email"
                placeholder="Nuevo correo electronico"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
            <Form.Input
                name="repeatEmail"
                placeholder="Repite el correo electronico"
                value={formik.values.repeatEmail}
                onChange={formik.handleChange}
                error={formik.errors.repeatEmail}
            />
            <Form.Button type="submit" loading={formik.isSubmitting}>Enviar</Form.Button>
        </Form>
    );
}
