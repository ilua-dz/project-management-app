import { useAppSelector } from "../app/hooks"
import { getApiSignInToken } from "./authorization/authorizationSlice"

function applyToken<RequestType, responseType>(cb: (fetchArgs: RequestType) => responseType, args: RequestType) {
  const token = useAppSelector(getApiSignInToken);
  return cb({...args, token});
}

export default applyToken