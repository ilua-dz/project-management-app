import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

const { confirm } = Modal;

function CallConfirm(title: string, onOk: () => void) {
  const { t } = useTranslation();

  return () =>
    confirm({
      maskClosable: true,
      title,
      onOk,
      cancelText: t('confirm-modals.cancel')
    });
}

export default CallConfirm;
