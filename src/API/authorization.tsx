import { baseURL, requestAPI, Methods, IUserData } from './dependencies';

export type Token = { token: string };
export type SignInData = Pick<IUserData, 'login' | 'password'>;
export type SignUpData = Pick<IUserData, 'login' | 'name' | 'password'>;

export async function signUp(body: SignUpData) {
  const URL = `${baseURL}signup`;
  const options = {
    method: Methods.post,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  } as Partial<RequestInit>;
  const data = await requestAPI<IUserData>({ URL, options });
  return data;
}

export async function signIn(body: SignInData) {
  const URL = `${baseURL}signin`;
  const options = {
    method: Methods.post,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  } as Partial<RequestInit>;
  const data = await requestAPI<Token>({ URL, options });
  return data;
}
