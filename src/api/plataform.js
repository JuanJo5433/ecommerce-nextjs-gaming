// platform.js
import { ENV } from "@/utils/constants";

export class Platform {
  // Obtener todas las plataformas con detalles completos
  async getAll() {
    try {
      const sort = "sort=order:asc";
      const populate = "populate=*";  // Obtiene todos los campos relacionados, como 'icon', 'title', 'description', etc.

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORM}?${populate}&${sort}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Obtener plataforma por slug
  async getBySlug(slug) {
    try {
      const filters = `filters[slug][$eq]=${slug}`;
      const populate = "populate=*";  // Obtener todos los campos relacionados
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORM}?${filters}&${populate}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }
}
