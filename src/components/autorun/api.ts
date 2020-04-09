import { ApiCall } from "../../common/api";
import { ListData } from "../../common/interfaces";
import { EmaintAutoType } from "../../db/definitions";

export default () => ({
  list: (
    tableName: string,
    payload: string
  ): Promise<ListData<EmaintAutoType>> => {
    return ApiCall<ListData<EmaintAutoType>>(
      "post",
      `autorun/${tableName}`,
      payload
    )
      .then((res) => {
        return res;
      })
      .catch((error) => error);
  },
  get: (tableName: string, id: string): Promise<EmaintAutoType> => {
    return ApiCall<EmaintAutoType>("post", `autorun/${tableName}/${id}`)
      .then((res) => {
        return res;
      })
      .catch((error) => error);
  },
  start: (tableName: string, id: string): Promise<EmaintAutoType> => {
    return ApiCall<EmaintAutoType>("post", `autorun/${tableName}/${id}/start`)
      .then((res) => {
        return res;
      })
      .catch((error) => error);
  },
});
