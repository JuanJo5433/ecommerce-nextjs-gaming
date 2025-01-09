import React from "react";
import styles from "./sign-in.module.scss";
import JoinLayout from "@/layouts/JoinLayout/JoinLayout";
import Link from "next/link";
import { LoginForm } from "@/components/Auth/LoginForm/LoginForm";
import { Seo } from "@/components/Shared/Seo/Seo";
export default function SignIn() {
    return (
        <>
        <Seo title="Iniciar sesion" />
            <JoinLayout>
                <div className={styles.signIn}>
                    <h3>Iniciar sesion</h3>

                    {/* LOGIN FORM */}
                    <LoginForm />
                    <div className={styles.actions}>
                        <Link href={"/join/sign-up"}>
                            No tienes una cuenta?
                        </Link>
                    </div>
                </div>
            </JoinLayout>
        </>
    );
}
