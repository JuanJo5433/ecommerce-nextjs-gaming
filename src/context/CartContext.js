import { Cart } from "@/api/cart";
import { useState, useEffect, createContext } from "react";

const cartCtrl = new Cart();

export const CartContext = createContext();

export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(cartCtrl.count());

  useEffect(() => {
    const fetchCartData = async () => {
      const response = await cartCtrl.getAll();
      setCart(response);
    };
    fetchCartData();
  }, []);
  
  const addCart = (gameId) => {
    cartCtrl.add(gameId);
    refreshTotalCart();
  };

  const changeQuantityItem = (gameId, quantity) => {
    cartCtrl.changeQuantity(gameId, quantity);
    refreshTotalCart();
  };

  const deleteItem = (gameId) => {
    cartCtrl.delete(gameId);
    refreshTotalCart();
  };

  const deleteAllItems = () => {
    cartCtrl.deleteAll();
    refreshTotalCart();
  };

  const refreshTotalCart = () => {
    setTotal(cartCtrl.count());
    setCart(cartCtrl.getAll());
  };

  const data = {
    cart,
    addCart,
    total,
    deleteItem,
    deleteAllItems,
    changeQuantityItem,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
