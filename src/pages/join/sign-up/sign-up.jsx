import React from "react";
import styles from "./sign-up.module.scss";
import JoinLayout from "@/layouts/JoinLayout/JoinLayout";
import Link from "next/link";
import RegisterForm from "@/components/Auth/RegisterForm/RegisterForm";
import { Seo } from "@/components/Shared/Seo/Seo";

const signUp = () => {
    return (
        <>
        <Seo title="Crear cuenta" />
            <JoinLayout>
                <div className={styles.signIn}>
                    <h3>Crear cuenta</h3>
                    {/* FORM */}
                    <RegisterForm/>
                    <div className={styles.actions}>
                      <Link href={"/join/sign-in"}>Atras</Link>
                    </div>
                </div>
            </JoinLayout>
        </>
    );
};

export default signUp;
