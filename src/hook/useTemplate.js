import { useQuery, useMutation, queryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../api/http";
const useTemplate = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        "templates",
        async () => {
            try {
                const response = await api.get("/templates");
                return response.data;
            } catch (err) {
                console.log(err);
                toast.error('something went wrong');
            }
        },
        { refetchOnWindowFocus: false }
    );
    const mutation = useMutation(
        async ({ templateDTO, file }) => {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("name", templateDTO.name);
            formData.append("title", templateDTO.title);

            const response = await api.post("/templates", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("templates");
                toast.success('Template created successfully');
            },
            onError: (error) => {
                toast.error(`Error: ${error.message}`);
            }
        }
    );

    const deleteMutation = useMutation(
        async (id) => {
            await api.delete(`/templates/${id}`);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("templates");
                toast.success('Template deleted successfully');
            },
            onError: (error) => {
                toast.error(`Error: ${error.message}`);
            }
        }
    );
    return { data, isLoading, isError, refetch, mutation, deleteMutation };
};

export default useTemplate;
