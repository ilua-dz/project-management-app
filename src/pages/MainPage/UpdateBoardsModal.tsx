import { Modal, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import StyledBoardTag from '../../components/styled/StyledBoardTag';

export interface UpdateBoardsValues {
  title: string;
  description: string;
}

interface UpdateBoardsProps {
  actionType: 'update' | 'create';
  target?: 'board' | 'column';
  initialValues?: { title: string; description: string };
  visible: boolean;
  onOk: (values: UpdateBoardsValues) => void;
  onCancel: () => void;
}

const UpdateBoardsModal = ({
  actionType,
  visible,
  onOk,
  onCancel,
  target = 'board',
  initialValues = { title: '', description: '' }
}: UpdateBoardsProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { title } = initialValues;

  const modalHeader = (
    <div>
      <span>{t(`modals.${actionType}-${target}.title`)} </span>
      {title && <StyledBoardTag>{title}</StyledBoardTag>}
    </div>
  );

  function submitData() {
    form
      .validateFields()
      .then((values) => {
        onOk(values);
        if (actionType === 'create') {
          form.resetFields();
        }
      })
      .catch((_) => _);
  }

  function closeModal() {
    form.resetFields();
    onCancel();
  }

  function submitOnPressEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === 'Enter') {
      submitData();
    }
  }

  function getInput() {
    return <Input.TextArea autoSize autoComplete="off" onKeyDown={submitOnPressEnter} />;
  }

  const getText = (key: string) => t(`modals.${actionType}-${target}.${key}`);

  const getValidationRules = (key: string) => [
    { required: true, message: getText(`validate-error-${key}`) }
  ];

  return (
    <>
      {visible && (
        <Modal
          {...{ visible, title: modalHeader }}
          onCancel={closeModal}
          okText={getText('ok-text')}
          cancelText={t('modals.cancel')}
          onOk={submitData}>
          <Form {...{ form, initialValues }} layout="vertical">
            <Form.Item
              name="title"
              label={getText('input-title')}
              rules={getValidationRules('title')}>
              {getInput()}
            </Form.Item>
            {target !== 'column' && (
              <Form.Item
                name="description"
                label={getText('input-description')}
                rules={getValidationRules('description')}>
                {getInput()}
              </Form.Item>
            )}
          </Form>
        </Modal>
      )}
    </>
  );
};

export default UpdateBoardsModal;
