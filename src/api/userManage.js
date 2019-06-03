import { SERVER_BASE, http } from "./config";

export default {
    updateWorkerPower(worker) {
        return http.post(SERVER_BASE + "/workerinfo/adjust",worker);
    }
};