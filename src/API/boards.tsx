import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { baseURL, requestAPI, Methods } from './dependencies';

export interface IBoard {
  id: string;
  title: string;
}

type BoardsPayloadCreator<T> = AsyncThunkPayloadCreator<
  unknown | string,
  void | T | Error | string,
  { state: RootState }
>;

export const boardsBaseURL = `${baseURL}boards`;

export const getBoard: BoardsPayloadCreator<IBoard[]> = async function (
  _,
  { rejectWithValue, getState }
) {
  const token = getState().userAuthorization.signInData.token;
  const URL = boardsBaseURL;
  const options = {
    method: Methods.get,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  } as Partial<RequestInit>;
  try {
    const data = await requestAPI<IBoard[]>({ URL, options });
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
};

export async function createBoard(token: string, title: string) {
  const URL = boardsBaseURL;
  const options = {
    method: Methods.post,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  } as Partial<RequestInit>;
  const data = await requestAPI<IBoard>({ URL, options });
  return data;
}

export const deleteBoard: AsyncThunkPayloadCreator<string, string, { state: RootState }> =
  async function (id: string, { rejectWithValue, getState }) {
    const token = getState().userAuthorization.signInData.token;
    const URL = `${boardsBaseURL}/${id}`;
    console.log(URL);
    const options = {
      method: Methods.delete,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    } as Partial<RequestInit>;
    try {
      return (await requestAPI({ URL, options })) as string;
    } catch (error) {
      return rejectWithValue(error);
    }
  };

type UpdateBoardPayload = { title: string; id: string };

// export const updateBoard: BoardsPayloadCreator<IBoard> = async function (
//   { title, id }: UpdateBoardPayload,
//   { rejectWithValue, getState }
// ) {
//   const token = getState().userAuthorization.signInData.token;
//   const URL = `${boardsBaseURL}/${id}`;
//   const options = {
//     method: Methods.put,
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ title })
//   } as Partial<RequestInit>;
//   try {
//     return await requestAPI<IBoard>({ URL, options });
//   } catch (error) {
//     return rejectWithValue(error);
//   }
// };
