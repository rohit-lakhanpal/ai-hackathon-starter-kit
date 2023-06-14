import axios from "axios";

export const infoService = {
    getAppInfoAsync: async () => {
        const response = await axios.get("/api/info");          
        return response.data.app;
    }
};