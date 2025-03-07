import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { User } from "@/types";

const API_BASE_URL = process.env.VITE_API_BASE_URL;

console.log(API_BASE_URL);
console.log(`${API_BASE_URL}/api/my/user`);

interface UserData {
  auth0Id: string;
  email: string;
}

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useMutation<unknown, Error, UserData>({
    mutationFn: async (userData: UserData) => {
      try {
        const token = await getAccessTokenSilently();
        console.log("Token obtenido:", token);

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error en la petición:", errorData);
          throw new Error("Error al crear usuario");
        }

        return response.json();
      } catch (error) {
        console.error("Error en useCreateMyUser:", error);
        throw error;
      }
    },
  });
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    console.log(accessToken);
    console.log("Token:", accessToken);
    console.log(`${API_BASE_URL}/api/my/user`);
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar Usuario");
    }
    return response.json();
  };

  return useMutation<unknown, Error, UpdateMyUserRequest>({
    mutationFn: updateMyUserRequest,
    onSuccess: () => {
      toast.success("Usuario actualizado correctamente!");
    },
    onError: () => {
      toast.error("Hubo un error al actualizar el usuario.");
    },
  });
};

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/my/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error en la petición:", errorData);
        throw new Error("Error al obtener usuario");
      }

      return response.json();
    } catch (error) {
      console.error("Error en useGetMyUser:", error);
      throw error; // Dejamos que React Query maneje el error
    }
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery<User, Error>({
    queryKey: ["fetchCurrentUser"],
    queryFn: getMyUserRequest,
  });

  if (error) {
    toast.error(error.message || "Hubo un error al obtener el usuario.");
  }

  return { currentUser, isLoading };
};
