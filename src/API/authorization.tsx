import { baseURL, requestAPI, Methods, IUserData } from "./dependencies";
type Token = {
  token: string;
}
export async function signUp(body: IUserData){
  const URL = `${baseURL}signup`;
  const options = {
      method: Methods.post,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
  } as Partial<RequestInit>;
  const data = await requestAPI<IUserData>({URL, options});
  return data;
}

export async function signIn(body: IUserData){
  const URL = `${baseURL}signin`;
  const options = {
    method: Methods.post,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  } as Partial<RequestInit>
  const data = await requestAPI<Token>({URL, options});
  return data;
}
