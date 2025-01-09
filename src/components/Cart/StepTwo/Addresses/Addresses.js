import { useState, useEffect } from "react";
import { add, map } from "lodash";
import classNames from "classnames";
import styles from "./Addresses.module.scss";
import { Address } from "@/api/address";
import { useAuth } from "@/hooks/useAuth";

const addressCtrl = new Address();

export function Addresses(props) {
  const { addressSelected, setAddressSelected } = props;
  const [addresses, setAddresses] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll(user.id);
        setAddresses(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.addresses}>
      <h2>Dirección</h2>

      {map(addresses, (address) => (
        <div
          key={address.id}
          onClick={() => setAddressSelected(address)}
          className={classNames(styles.address, {
            [styles.active]: address.id === addressSelected?.id,
          })}
        >
          <p>
            {address.name} ({address.title})
          </p>
          <p>
            {address.address}, {address.postal_code},{" "}
            {address.state}, {address.city}
          </p>
        </div>
      ))}
    </div>
  );
}