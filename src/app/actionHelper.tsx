import { PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { Token, SignInData, SignUpData } from '../API/authorization';
import { IUserData } from '../API/dependencies';

function isActionFulfilled(
  action:
    | PayloadAction<
        void | Error | Token | undefined,
        string,
        { arg: SignInData; requestId: string; requestStatus: 'fulfilled' },
        never
      >
    | PayloadAction<
        unknown,
        string,
        {
          arg: SignInData;
          requestId: string;
          requestStatus: 'rejected';
          aborted: boolean;
          condition: boolean;
        } & ({ rejectedWithValue: true } | ({ rejectedWithValue: false } & object)),
        SerializedError
      >
    | PayloadAction<
        void | IUserData | Error | undefined,
        string,
        { arg: SignUpData; requestId: string; requestStatus: 'fulfilled' },
        never
      >
) {
  return action.meta.requestStatus === 'fulfilled';
}

export default isActionFulfilled;
