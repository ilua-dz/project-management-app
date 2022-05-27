import { Modal, Form, Input, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export interface UpdateBoardsValues {
  title: string;
}

interface UpdateBoardsProps {
  actionType: 'update' | 'create';
  target?: 'board' | 'column';
  boardTitle?: string;
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
  boardTitle = ''
}: UpdateBoardsProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const title = (
    <div>
      <span>{t(`modals.${actionType}-${target}.title`)} </span>
      {boardTitle && <StyledBoardTag>{boardTitle}</StyledBoardTag>}
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

  function submitOnPressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === 'Enter') {
      submitData();
    }
  }

  return (
    <>
      {visible && (
        <Modal
          {...{ visible, title }}
          onCancel={closeModal}
          okText={t(`modals.${actionType}-${target}.ok-text`)}
          cancelText={t('modals.cancel')}
          onOk={submitData}>
          <Form form={form} layout="vertical">
            <Form.Item
              initialValue={boardTitle}
              name="title"
              label={t(`modals.${actionType}-${target}.input-title`)}
              rules={[
                { required: true, message: t(`modals.${actionType}-${target}.validate-error`) }
              ]}>
              <Input
                autoComplete="off"
                ref={(input) =>
                  setTimeout(() => {
                    input && input.focus();
                  })
                }
                onKeyDown={submitOnPressEnter}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

const StyledBoardTag = styled(Tag).attrs({ color: 'success' })`
  font-size: 1rem;
`;

export default UpdateBoardsModal;
