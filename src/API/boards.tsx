import { baseURL, requestAPI, Methods } from "./dependencies";
import { IColumn } from './columns';

interface IBoard{
  id: string;
  title: string;
  columns: IColumn[]
}

export const boardsBaseURL = `${baseURL}boards/`;

export async function getBoard(token: string, id?: string){
  const URL = `${boardsBaseURL}${id? id: ''}`;
  const options = {
    method: Methods.get,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  } as Partial<RequestInit>;
  const data = await requestAPI<IBoard | IBoard[]>({URL, options});
  return data;
}

export async function createBoard(token: string, title: string){
  const URL = boardsBaseURL;
  const options = {
    method: Methods.post,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title})
  } as Partial<RequestInit>;
  const data = await requestAPI<IBoard>({URL, options});
  return data;
}

export async function deleteBoard(token: string, id: string){
  const URL = `${boardsBaseURL}${id}`;
  const options = {
    method: Methods.delete,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  } as Partial<RequestInit>;
  const data = await requestAPI({URL, options});
  return data;
}

export async function updateBoard(token: string, title: string, id: string){
  const URL = `${boardsBaseURL}${id}`;
  const options = {
    method: Methods.put,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title})
  } as Partial<RequestInit>;
  const data = await requestAPI<IBoard>({URL, options});
  return data;
}

