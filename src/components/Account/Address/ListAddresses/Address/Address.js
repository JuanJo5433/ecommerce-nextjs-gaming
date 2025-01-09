import { Button, Icon } from "semantic-ui-react";
import styles from "./Address.module.scss";
import { useState } from "react";
import { BasicModal } from "@/components/Shared/BasicModal/BasicModal";
import { AddressForm } from "../../AddressForm/AddressForm";
import { Confirm } from "@/components/Shared/Confirm/Confirm";
import { Address as AddressCtrl } from "@/api/address";

const addresCtrl = new AddressCtrl();

export function Address(props) {
    const { addressId, address, onReload } = props;
    const [showEdit, setShowEdit] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const openCloseEdit = () => setShowEdit((prevState) => !prevState);
    const openCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const onDelete = async () => {
        try {
            await addresCtrl.delete(addressId);
            onReload();
            openCloseConfirm(); // Cerrar el modal de confirmación

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className={styles.address}>
                <div>
                    <p className={styles.title}>{address.title}:</p>
                    <p className={styles.addressInfo}>
                        {address.name}, {address.address}, {address.state},{" "}
                        {address.city}, {address.postal_code}{" "}
                    </p>
                </div>

                <div className={styles.actions}>
                    <Button primary icon onClick={openCloseEdit}>
                        <Icon name="pencil" />
                    </Button>
                    <Button primary icon onClick={openCloseConfirm}>
                        <Icon name="delete" />
                    </Button>
                </div>
            </div>

            <Confirm
                open={showConfirm}
                onCancel={openCloseConfirm}
                onConfirm={onDelete}
                content="La direccion sera eliminada permanetemente."
            />

            <BasicModal
                show={showEdit}
                onClose={openCloseEdit}
                title="Editar direccion"
            >
                <AddressForm
                    onClose={openCloseEdit}
                    onReload={onReload}
                    addressId={addressId}
                    address={address}
                />
            </BasicModal>
        </>
    );
}
