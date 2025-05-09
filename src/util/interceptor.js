import axios from "axios";
import { toast } from "sonner";


axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        const errorMessage =
          error.response.data?.error ||
          error.response?.data?.message ||
          error.response?.data?.non_field_errors ||
          "An error occured";
        toast.error(errorMessage);
      }
  
      return Promise.reject(error);
    }
  );
  
  export default axios;