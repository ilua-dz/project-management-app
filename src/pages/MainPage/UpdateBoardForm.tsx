import { Modal, Form, Input, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export interface UpdateBoardsValues {
  newTitle: string;
}

interface UpdateBoardsProps {
  actionType: 'update' | 'create';
  boardTitle?: string;
  visible: boolean;
  onOk: (values: UpdateBoardsValues) => void;
  onCancel: () => void;
}

const UpdateBoards = ({
  actionType,
  visible,
  onOk,
  onCancel,
  boardTitle = ''
}: UpdateBoardsProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const title = (
    <div>
      <span>{t(`modals.${actionType}-board.title`)} </span>
      {boardTitle && <StyledBoardTag>{boardTitle}</StyledBoardTag>}
    </div>
  );

  function submitData() {
    form.validateFields().then((values) => {
      onOk(values);
      if (actionType === 'create') {
        form.resetFields();
      }
    });
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
          okText={t(`modals.${actionType}-board.ok-text`)}
          cancelText={t('modals.cancel')}
          onOk={submitData}>
          <Form form={form} layout="vertical">
            <Form.Item
              initialValue={boardTitle}
              name="newTitle"
              label={t(`modals.${actionType}-board.input-title`)}
              rules={[{ required: true, message: t(`modals.${actionType}-board.validate-error`) }]}>
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

export default UpdateBoards;
