
import { useQuery } from "@tanstack/react-query";
import api from "../api/http";

const useJobSeekerInfo = () => {
  const token = sessionStorage.getItem("token");

  return useQuery({
    queryKey: ["JOBSEEKER_PROFILE"],
    queryFn: () =>
      api.get("/candidate-profile", {
        headers: {
          Authorization: token, // Truyền token trực tiếp
        },
      }),
    retry: 1,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 60000),
    onError: (error) => {
      console.error("Lỗi khi lấy thông tin người tìm việc:", error);
      if (error.response && error.response.status === 400) {
        window.location.replace("login");
      }
    },
  });
};

export default useJobSeekerInfo;


