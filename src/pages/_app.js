import "semantic-ui-css/semantic.min.css";
import "@/scss/global.scss";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}
