import { ApiCall } from "../../common/api";
import { ListData } from "../../common/interfaces";
import { EmaintAutoLogType } from "../../db/definitions";

export default () => ({
  list: (payload: string): Promise<ListData<EmaintAutoLogType>> => {
    return ApiCall<ListData<EmaintAutoLogType>>(
      "post",
      `emaintautolog`,
      payload
    )
      .then((res) => {
        return res;
      })
      .catch((error) => error);
  },
  get: (id: string, payload: string): Promise<ListData<EmaintAutoLogType>> => {
    return ApiCall<ListData<EmaintAutoLogType>>(
      "post",
      `emaintautolog/${id}`,
      payload
    )
      .then((res) => {
        return res;
      })
      .catch((error) => error);
  },
});
