import { Container } from "semantic-ui-react";

import { HeaderCart } from "@/components/Layout/HeaderLayout/HeaderCart";
import { Separator } from "@/components/Shared/Separator/Separator";
import { Footer } from "@/components/Layout/Footer/Footer";

export function CartLayout(props) {
  const { children } = props;

  return (
    <>
      <HeaderCart />
      <Separator height={150} />
      <Container>{children}</Container>
      <Separator height={70} />
      <Footer />
    </>
  );
}
