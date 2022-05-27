import { requestAPI, Methods } from './dependencies';
import { boardsBaseURL } from './boards';
import { ITask } from './tasks';
import { SetOptional } from 'type-fest';

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks?: ITask[];
}

export interface IColumnRequest {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    order: number;
  };
  token: string;
}

export type ColumnGetRequest = SetOptional<Omit<IColumnRequest, 'body'>, 'columnId'>;
export type ColumnCreateRequest = Omit<IColumnRequest, 'columnId'>;
export type ColumnDeleteRequest = Omit<IColumnRequest, 'body'>;
export type ColumnUpdateRequest = IColumnRequest;

export async function getColumn({ boardId, columnId, token }: ColumnGetRequest) {
  const URL = `${boardsBaseURL}/${boardId}/columns${columnId ? `/${columnId}` : ''}`;
  const options = {
    method: Methods.get,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  } as Partial<RequestInit>;
  const data = await requestAPI<IColumn | IColumn[]>({ URL, options });
  return data;
}

export async function createColumn(token: string, boardId: string, title: string) {
  const URL = `${boardsBaseURL}/${boardId}/columns`;
  const options = {
    method: Methods.post,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  } as Partial<RequestInit>;
  const data = await requestAPI<IColumn>({ URL, options });
  return data;
}

export async function deleteColumn({ columnId, boardId, token }: ColumnDeleteRequest) {
  const URL = `${boardsBaseURL}/${boardId}/columns/${columnId}`;
  const options = {
    method: Methods.delete,
    headers: {
      Authorization: `Bearer ${token}`
    }
  } as Partial<RequestInit>;
  const data = await requestAPI({ URL, options });
  return data;
}

export async function updateColumn({ token, boardId, columnId, body }: ColumnUpdateRequest) {
  const URL = `${boardsBaseURL}/${boardId}/columns/${columnId}`;
  const options = {
    method: Methods.put,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  } as Partial<RequestInit>;
  const data = await requestAPI<IColumn>({ URL, options });
  return data;
}
