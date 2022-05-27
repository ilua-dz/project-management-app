import { baseURL, requestAPI, Methods } from './dependencies';
import { IColumn } from './columns';
import { SetOptional } from 'type-fest';

export interface IBoard {
  id: string;
  title: string;
  description: string;
  columns?: IColumn[];
}

export interface IBoardRequest {
  id: string;
  title: string;
  description: string;
  token: string;
}

export type BoardUpdateRequest = IBoardRequest;
export type BoardGetRequest = SetOptional<Omit<IBoardRequest, 'title' | 'description'>, 'id'>;
export type BoardDeleteRequest = Omit<IBoardRequest, 'title' | 'description'>;
export type BoardCreateRequest = Omit<IBoardRequest, 'id'>;

export const boardsBaseURL = `${baseURL}boards`;

export async function getBoard({ id, token }: BoardGetRequest) {
  const URL = `${boardsBaseURL}${id ? `/${id}` : ''}`;
  const options = {
    method: Methods.get,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  } as Partial<RequestInit>;
  const data = await requestAPI<IBoard | IBoard[]>({ URL, options });
  return data;
}

export async function createBoard({ token, title, description }: BoardCreateRequest) {
  const URL = boardsBaseURL;
  const options = {
    method: Methods.post,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description })
  } as Partial<RequestInit>;
  const data = await requestAPI<IBoard>({ URL, options });
  return data;
}

export async function deleteBoard({ id, token }: BoardDeleteRequest) {
  const URL = `${boardsBaseURL}/${id}`;
  const options = {
    method: Methods.delete,
    headers: {
      Authorization: `Bearer ${token}`
    }
  } as Partial<RequestInit>;
  const data = await requestAPI({ URL, options });
  return data;
}

export async function updateBoard({ token, title, description, id }: BoardUpdateRequest) {
  const URL = `${boardsBaseURL}/${id}`;
  const options = {
    method: Methods.put,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description })
  } as Partial<RequestInit>;
  const data = await requestAPI<IBoard>({ URL, options });
  return data;
}
