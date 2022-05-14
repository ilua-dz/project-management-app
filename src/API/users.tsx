import { baseURL, requestAPI, Methods, IUserData } from './dependencies';

const usersBaseURL = `${baseURL}users/`;

export async function getUser(token: string, id?: string) {
  const URL = `${usersBaseURL}${id ? id : ''}`;
  const options = {
    method: Methods.get,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  } as Partial<RequestInit>;
  const data = await requestAPI<IUserData | IUserData[]>({ URL, options });
  return data;
}

export async function deleteUser(token: string, id: string) {
  const URL = `${usersBaseURL}${id}`;
  const options = {
    method: Methods.delete,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  } as Partial<RequestInit>;
  const data = await requestAPI<IUserData>({ URL, options });
  return data;
}

export async function updateUser(token: string, id: string, body: IUserData) {
  const URL = `${usersBaseURL}${id}`;
  const options = {
    method: Methods.put,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  } as Partial<RequestInit>;
  const data = await requestAPI<IUserData>({ URL, options });
  return data;
}
