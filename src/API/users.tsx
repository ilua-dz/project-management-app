import { baseURL, requestAPI, Methods } from "./dependencies";

export interface IUserUpdate{
  name: string,
  login: string,
  password: string
}

const usersBaseURL = `${baseURL}users/`;

async function getUser(token: string, id?: string){
  const options = {
    URL: `${usersBaseURL}${id? id: ''}`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    } as Partial<RequestInit>
  }
  const data = requestAPI(options);
  return data;
}

async function deleteUser(token: string, id: string){
  const options = {
    URL: `${usersBaseURL}${id}`,
    headers: {
      'method': Methods.delete,
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    } as Partial<RequestInit>
  }
  const data = requestAPI(options);
  return data;
}

async function updateUser(token: string, id: string, body: IUserUpdate){
  const options = {
    URL: `${usersBaseURL}${id}`,
    headers: {
      'method': Methods.put,
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      body: JSON.stringify(body),
    } as Partial<RequestInit>
  }
  const data = requestAPI(options);
  return data;
}