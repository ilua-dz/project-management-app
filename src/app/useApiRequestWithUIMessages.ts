import { AsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { MessageKeys, duration } from '../antd/messageProperties';
import isActionFulfilled from './actionHelper';
import { useAppDispatch } from './hooks';

type RequestType<UserDataType, ResponseType> = {
  messageKey: MessageKeys;
  thunk: AsyncThunk<void | ResponseType | Error | undefined, UserDataType, object>;
  showOkMessage?: boolean;
  okAction?: () => void;
};

export function useApiRequestWithUIMessages<UserDataType, ResponseType = object>({
  messageKey,
  thunk,
  showOkMessage = false,
  okAction
}: RequestType<UserDataType, ResponseType>) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return async function (userData: UserDataType) {
    message.loading({ ...{ content: t('messages.loading'), key: messageKey, duration: 0 } });

    const data = await dispatch(thunk(userData));

    if (isActionFulfilled(data.meta.requestStatus)) {
      if (showOkMessage) {
        message.success({
          ...{ content: t(`messages.${messageKey}-done`), key: messageKey, duration }
        });
      } else {
        message.destroy(messageKey);
      }
      if (okAction) {
        okAction();
      }
    } else {
      message.error({
        ...{
          content: t(`messages.${showOkMessage ? messageKey : ''}-error`),
          key: messageKey,
          duration
        }
      });
    }
  };
}
