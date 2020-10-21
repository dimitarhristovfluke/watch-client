import { ApiCall } from "../../common/api";
import { ListData } from "../../common/interfaces";
import { ProcDefType } from "../../db/definitions";

export default () => ({
  list: (serverid: string, payload: string): Promise<ListData<ProcDefType>> => {
    return ApiCall<ListData<ProcDefType>>("post", `procdef/${serverid}`, payload)
      .then((res) => {
        return res;
      })
      .catch((error) => error);
  },
  get: (serverid: string, id: string): Promise<ProcDefType> => {
    return ApiCall<ProcDefType>("post", `procdef/${serverid}/${id}`)
      .then((res) => {
        return res;
      })
      .catch((error) => error);
  },
});
