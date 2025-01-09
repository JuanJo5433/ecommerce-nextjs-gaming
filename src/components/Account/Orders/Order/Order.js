import { useState } from "react";
import { Image } from "semantic-ui-react";
import { DateTime } from "luxon";
import { forEach, map } from "lodash";
import styles from "./Order.module.scss";
import { ENV } from "@/utils/constants";
import { BasicModal } from "@/components/Shared/BasicModal/BasicModal";
import { calcDiscountedPrice } from "@/utils/functions/calcDiscountedPrice";

export function Order(props) {
    const { order } = props;
    const [showModal, setShowModal] = useState(false);
    
    // Formateamos la fecha 'createdAt' usando Luxon para mejorar la legibilidad
    const createdAt = DateTime.fromISO(order.createdAt, { locale: "es" }).toFormat("dd/MM/yyyy HH:mm");
    const products = order.products;
    const address = order.addressShipping;

    const openCloseModal = () => setShowModal((prevState) => !prevState);

    // Función para calcular el total de productos
    const getTotalProducts = () => {
        let total = 0;
        forEach(products, (product) => {
            total += product.quantity;
        });
        return total;
    };

    console.log(order); // Solo para verificar la estructura del pedido

    return (
        <>
            <div className={styles.order} onClick={openCloseModal}>
                <div>
                    <span>
                        {createdAt} {/* Fecha de creación del pedido */}
                    </span>
                    <p>{getTotalProducts()} productos</p>
                </div>

                <p>{order.totalPayment.toFixed(2)}€</p>
            </div>

            <BasicModal
                show={showModal}
                onClose={openCloseModal}
                title="Información del pedido"
            >
                {/* Mostrar productos dentro del modal */}
                {map(products, (product) => (
                    <div key={product.gameId} className={styles.product}>
                        {/* Imagen del producto */}
                        <Image src={ENV.SERVER_HOST + product.cover} alt={product.title} />
                        <div>
                            <div className={styles.info}>
                                <div>
                                    {/* Información del producto */}
                                    <p>{product.title}</p>
                                    <p>{product.platform ? product.platform.title : "Plataforma desconocida"}</p>
                                </div>
                            </div>
                            <div className={styles.quantity}>
                                <span>x{product.quantity}</span>
                                <span>
                                    {calcDiscountedPrice(product.price, product.discount)}€
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Mostrar dirección de envío */}
                <div className={styles.address}>
                    <div>
                        <p className={styles.title}>{address.title}</p>
                        <p className={styles.addressInfo}>
                            {address.name}, {address.address}, {address.state},{" "}
                            {address.city}, {address.postal_code}
                        </p>
                    </div>
                </div>

                {/* Total de la orden */}
                <div className={styles.total}>
                    <p>TOTAL: {order.totalPayment.toFixed(2)}€</p>
                </div>
            </BasicModal>
        </>
    );
}
