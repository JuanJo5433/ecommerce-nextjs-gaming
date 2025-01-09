import Info from "@/components/Account/Info/Info";
import { BasicLayout } from "@/layouts/BasicLayout";
import { Icon, Tab } from "semantic-ui-react";
import { useRouter } from "next/router";

import { Settings } from "@/components/Account/Settings";
import styles from "./account.module.scss";
import { Separator } from "@/components/Shared/Separator/Separator";
import { Address } from "@/components/Account/Address";
import { useState } from "react";
import { Wishlist } from "@/components/Account/WIshList/WishList";
import { Orders } from "@/components/Account/Orders/Orders";
import { useAuth } from "@/hooks/useAuth";
import { Seo } from "@/components/Shared/Seo/Seo";

export default function AccountPage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [reload, setReload] = useState(false);

    if (!user) {
        router.push("/");
        return null;
    }

    const onReload = () => setReload((prevState) => !prevState);

    const panes = [
        {
            menuItem: "Mis pedidos",
            render: () => (
                <Tab.Pane attached={false}>
                    <Orders />
                    <Separator height={80} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Lista de deseos",
            render: () => (
                <Tab.Pane attached={false}>
                    <Wishlist />
                    <Separator height={80} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Direcciones",
            render: () => (
                <Tab.Pane attached={false}>
                    <Address.AddAddress onReload={onReload} />
                    <Address.ListAddresses
                        reload={reload}
                        onReload={onReload}
                    />
                    <Separator height={80} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: 20,
                icon: <Icon name="settings" />,
                content: "Ajustes",
            },
            render: () => (
                <Tab.Pane attached={false}>
                    <Settings.ChangeNameForm />
                    <div className={styles.containerForms}>
                        <Settings.ChangeEmailForm />
                        <Settings.ChangePasswordForm />
                    </div>
                    <Separator height={80} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: 21,
                icon: <Icon name="sign-out" />,
                onClick: logout,
            },
        },
    ];

    return (
        <>
        <Seo title="Mi cuenta" />
            <BasicLayout isContainer relative>
                <Info />
                <Tab
                    menu={{ secondary: true, pointing: true }}
                    panes={panes}
                    className={styles.tabs}
                />
            </BasicLayout>
        </>
    );
}
