import { authFetch } from "@/utils/authFetch";
import { ENV } from "@/utils/constants";

export class Address {
    async create(data, userId) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: {
                        ...data,
                        user: userId,
                    },
                }),
            };
            const response = await authFetch(url, params);
            const result = await response.json();
            if (response.status !== 201) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAll(userId) {
        try {
            const filters = `filters[user][id][$eq]=${userId}`;
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}?${filters}`;

            const response = await authFetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async update(data, addressId) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`;

            const params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data }),
            };

            const response = await authFetch(url, params);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async delete(addressId) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`;
            const response = await authFetch(url, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Error al eliminar: ${response.statusText}`);
            }

            // Si la respuesta no tiene contenido (204 No Content), evita llamar a .json()
            if (response.status === 204) {
                return null;
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}
