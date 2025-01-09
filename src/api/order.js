// order.js
import { authFetch } from "@/utils/authFetch";
import { ENV } from "@/utils/constants";

export class Order {
  async getAll(userId) {
    try {
      const filters = `filters[user][id][$eq]=${userId}`;
      const sort = "sort[0]=createdAt:desc";
      // Agregamos el populate para obtener todos los datos relacionados
      const populate = "populate=*";
  
      const urlParams = `${filters}&${sort}&${populate}`;
  
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}?${urlParams}`;
  
      const response = await authFetch(url);
      const result = await response.json();
  
      if (response.status !== 200) throw result;
  
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  // Guardar la orden
  async saveOrder(orderData) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}`;

      // Ajustamos el cuerpo para que coincida con el formato esperado
      const body = {
        data: {
          user: orderData.userId, // El campo ahora es "user"
          totalPayment: orderData.totalAmount, // Total de la orden
          idPayment: orderData.paymentId, // ID del pago (debes generar este valor o pasarlo)
          addressShipping: JSON.stringify(orderData.address), // Convertimos la dirección a cadena JSON si es necesario
          products: JSON.stringify(orderData.items), // Convertimos los productos a cadena JSON
        },
      };

      const response = await authFetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
