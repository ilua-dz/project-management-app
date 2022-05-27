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
  title: string;
  order: number;
  token: string;
}

export type ColumnGetRequest = SetOptional<Omit<IColumnRequest, 'body'>, 'columnId'>;
export type ColumnCreateRequest = Omit<IColumnRequest, 'columnId' | 'order'>;
export type ColumnDeleteRequest = Omit<IColumnRequest, 'title' | 'order'>;
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

export async function createColumn({ token, boardId, title }: ColumnCreateRequest) {
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

export async function updateColumn({
  token,
  boardId,
  columnId,
  title,
  order
}: ColumnUpdateRequest) {
  const URL = `${boardsBaseURL}/${boardId}/columns/${columnId}`;
  const options = {
    method: Methods.put,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, order })
  } as Partial<RequestInit>;
  const data = await requestAPI<IColumn>({ URL, options });
  return data;
}
