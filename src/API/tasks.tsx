import { requestAPI, Methods } from './dependencies';
import { boardsBaseURL } from './boards';
import { SetOptional } from 'type-fest';

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

interface ITasksRequest {
  token: string;
  boardId: string;
  columnId: string;
  taskId: string;
  body: {
    title: string;
    order: string;
    description: string;
    userID: string;
  };
}

export type tasksGetRequest = SetOptional<Omit<ITasksRequest, 'body'>, 'taskId'>;
export type taskCreateRequest = Omit<ITasksRequest, 'taskId'>;
export type taskDeleteRequest = Omit<ITasksRequest, 'body'>;
export type taskUpdateRequest = ITasksRequest;

export async function getTask({ token, boardId, columnId, taskId }: tasksGetRequest) {
  const URL = `${boardsBaseURL}${boardId}/columns/${columnId}${taskId ? `/${taskId}` : ''}`;
  const options = {
    method: Methods.get,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  } as Partial<RequestInit>;
  const data = await requestAPI<ITask | ITask[]>({ URL, options });
  return data;
}

export async function createTask({ token, boardId, columnId, body }: taskCreateRequest) {
  const URL = `${boardsBaseURL}${boardId}/columns/${columnId}/tasks}`;
  const options = {
    method: Methods.post,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ body })
  } as Partial<RequestInit>;
  const data = await requestAPI<ITask>({ URL, options });
  return data;
}

export async function deleteTask({ token, boardId, columnId, taskId }: taskDeleteRequest) {
  const URL = `${boardsBaseURL}${boardId}/columns/${columnId}/tasks/${taskId}`;
  const options = {
    method: Methods.delete,
    headers: {
      Authorization: `Bearer ${token}`
    }
  } as Partial<RequestInit>;
  const data = await requestAPI({ URL, options });
  return data;
}

export async function updateTask({ token, boardId, columnId, taskId, body }: taskUpdateRequest) {
  const URL = `${boardsBaseURL}${boardId}/columns/${columnId}/tasks/${taskId}`;
  const options = {
    method: Methods.put,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  } as Partial<RequestInit>;
  const data = await requestAPI<ITask>({ URL, options });
  return data;
}
