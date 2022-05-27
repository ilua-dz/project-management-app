import { RootState } from '../app/store';

function applyToken<RequestType, responseType>(
  cb: (fetchArgs: RequestType) => responseType,
  args: RequestType,
  state: RootState
) {
  const token = state.userAuthorization.signInData.token;
  return cb({ ...args, token });
}

export default applyToken;
