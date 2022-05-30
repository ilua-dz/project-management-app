import { Modal } from 'antd';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const { confirm } = Modal;

function CallConfirm(title: string | ReactNode, onOk: () => void) {
  const { t } = useTranslation();

  return () =>
    confirm({
      maskClosable: true,
      title,
      onOk,
      cancelText: t('modals.cancel')
    });
}

export default CallConfirm;
