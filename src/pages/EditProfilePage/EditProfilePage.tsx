import { EyeInvisibleOutlined, EyeTwoTone, ProfileFilled } from '@ant-design/icons';
import { AutoComplete, Button, Form, Input } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CallConfirm from '../../antd/confirmModal';
import formProperties from '../../antd/formProperties';
import { MessageKeys } from '../../antd/messageProperties';
import { SignUpData } from '../../API/authorization';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useApiRequestWithUIMessages } from '../../app/useApiRequestWithUIMessages';
import PageTitle from '../../components/styled/PageTitle';
import { FieldRegExp } from '../../components/ValidationAuth/FieldRegExp';
import { getApiSignUpData, signOut } from '../../reducer/authorization/authorizationSlice';
import { deleteUserThunk, updateUserThunk } from '../../reducer/editProfile/userProfileSlice';

function EditProfilePage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { tailLayout, layout } = formProperties;

  const updateSignUpData = useApiRequestWithUIMessages<SignUpData>({
    messageKey: MessageKeys.updateProfile,
    thunk: updateUserThunk,
    showOkMessage: true
  });

  const deleteConfirmQuestion = t('modals.delete-user');
  const deleteUserRequest = useApiRequestWithUIMessages<string>({
    messageKey: MessageKeys.profile,
    thunk: deleteUserThunk,
    showOkMessage: true,
    okAction: signOutFunc
  });

  function signOutFunc() {
    dispatch(signOut());
  }

  const id = useAppSelector(getApiSignUpData).id;

  const deleteItem = () => {
    deleteUserRequest(id);
  };

  return (
    <Container>
      <PageTitle textLink="buttons.profile" icon={<ProfileFilled />} />
      <Button danger onClick={CallConfirm(deleteConfirmQuestion, deleteItem)}>
        {t('buttons.delete-user')}
      </Button>
      <FormPageContainer>
        <Title level={5}>{t('titles.title-update-profile')}</Title>
        <Form {...layout} form={form} name="control-hooks" onFinish={updateSignUpData}>
          <Form.Item name="name" label={t('labelOfForms.newName')} rules={FieldRegExp()}>
            <Input placeholder={t('labelOfForms.newName')} />
          </Form.Item>

          <Form.Item name="login" label={t('labelOfForms.newLogin')} rules={FieldRegExp()}>
            <Input placeholder={t('labelOfForms.newLogin')} />
          </Form.Item>

          <Form.Item name="password" label={t('labelOfForms.newPassword')} rules={FieldRegExp()}>
            <AutoComplete>
              <Input.Password
                placeholder={t('labelOfForms.newPassword')}
                autoComplete="off"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </AutoComplete>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              {t('buttons.Submit')}
            </Button>
          </Form.Item>
        </Form>
      </FormPageContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;

const FormPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  padding-top: 1rem;
`;

export default EditProfilePage;
