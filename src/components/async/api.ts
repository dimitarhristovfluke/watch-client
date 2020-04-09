import { ApiCall } from "../../common/api";
import { ListData } from "../../common/interfaces";
import { AsyncType } from "../../db/definitions";

export default () => ({
  list: (tableName: string, payload: string): Promise<ListData<AsyncType>> => {
    return ApiCall<ListData<AsyncType>>("post", `async/${tableName}`, payload)
      .then((res) => {
        return res;
      })
      .catch((error) => error);
  },
  get: (tableName: string, id: string): Promise<AsyncType> => {
    return ApiCall<AsyncType>("post", `async/${tableName}/${id}`)
      .then((res) => {
        return res;
      })
      .catch((error) => error);
  },
});
