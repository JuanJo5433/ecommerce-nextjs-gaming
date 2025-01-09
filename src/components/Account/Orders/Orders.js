import { useState, useEffect } from "react";
import { map } from "lodash";

// import { Order } from "./Order/Order";
import { useAuth } from "@/hooks/useAuth";
import { NoResult } from "@/components/Shared/NoResult/NoResult";
import { Order as OrderCtrl} from "@/api/order";
import { Order } from "./Order/Order";

const orderCtrl = new OrderCtrl();

export function Orders() {
  const [orders, setOrders] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await orderCtrl.getAll(user.id);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!orders) return <NoResult text="No tienes ningun producto comprado" />;

  return (
    <div>
      {map(orders, (order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
}
