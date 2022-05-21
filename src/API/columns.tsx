import { requestAPI, Methods } from './dependencies';
import { boardsBaseURL } from './boards';
import { ITask } from './tasks';

export interface IColumn {
  id?: string;
  title: string;
  order: number;
  tasks: ITask[];
}

export async function getColumn(token: string, boardId: string, columnId?: string) {
  const URL = `${boardsBaseURL}${boardId}/columns${columnId ? `/${columnId}` : ''}`;
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

export async function createColumn(token: string, boardId: string, column: IColumn) {
  const URL = `${boardsBaseURL}${boardId}/columns}`;
  const options = {
    method: Methods.post,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ column })
  } as Partial<RequestInit>;
  const data = await requestAPI<IColumn>({ URL, options });
  return data;
}

export async function deleteColumn(token: string, boardId: string, columnId: string) {
  const URL = `${boardsBaseURL}${boardId}/columns/${columnId}`;
  const options = {
    method: Methods.delete,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  } as Partial<RequestInit>;
  const data = await requestAPI({ URL, options });
  return data;
}

export async function updateColumn(
  token: string,
  boardId: string,
  columnId: string,
  column: IColumn
) {
  const URL = `${boardsBaseURL}${boardId}/columns/${columnId}`;
  const options = {
    method: Methods.put,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(column)
  } as Partial<RequestInit>;
  const data = await requestAPI<IColumn>({ URL, options });
  return data;
}
