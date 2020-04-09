import { ApiCall } from "../../common/api";
import { ListData } from "../../common/interfaces";
import { ProcessInfo } from "../../common/types";

export default () => ({
  get: (): Promise<ListData<ProcessInfo>> => {
    return ApiCall<ListData<ProcessInfo>>("post", `dashboard`)
      .then((res) => {
        return res;
      })
      .catch((error) => error);
  },
});
