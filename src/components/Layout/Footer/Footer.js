import { Button, Container, Image } from "semantic-ui-react";
import styles from "./Footer.module.scss";
import Link from "next/link";

export function Footer() {
    let today = new Date();
    let year = today.getFullYear();

    return (
        <div className={styles.footer}>
            <Container>
                <div className={styles.columns}>
                    <div>
                        <Link href="/">
                            <Image src="images/logo.png" alt="GAMING" />
                        </Link>
                    </div>

                    <div>
                        <ul>
                            <li as={Link} href="#">
                                Terminos y condiciones
                            </li>
                            <li as={Link} href="#">
                                Politicas de privacidad
                            </li>

                            <li as={Link} href="#">
                                Contacto
                            </li>

                            <li as={Link} href="#">
                                PQRS
                            </li>
                        </ul>
                    </div>

                    <div className={styles.social}>
                        <Button
                            as={"a"}
                            href="#"
                            circular
                            color="facebook"
                            icon="facebook"
                        />
                        <Button
                            as={"a"}
                            href="#"
                            circular
                            color="instagram"
                            icon="instagram"
                        />
                        <Button
                            as={"a"}
                            href="#"
                            circular
                            color="youtube"
                            icon="youtube"
                        />
                        <Button
                            as={"a"}
                            href="#"
                            circular
                            color="twitter"
                            icon="twitter"
                        />
                    </div>
                </div>
                <div className={styles.copyright}>
                    <span>© {year} Juan Giraldo. All rights reserved.</span>
                </div>
            </Container>
        </div>
    );
}
