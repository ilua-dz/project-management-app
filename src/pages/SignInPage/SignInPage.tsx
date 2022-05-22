import { Form, Input, Button, AutoComplete, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { asyncSignIn, getApiSignInError } from '../../reducer/authorization/authorizationSlice';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SignInData } from '../../API/authorization';
import formProperties from '../../antd/formProperties';
import isActionFulfilled from '../../app/actionHelper';
import { FieldRegExp } from '../../components/ValidationAuth/FieldRegExp';

const { tailLayout, layout } = formProperties;

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const errorApiSignIn = useAppSelector(getApiSignInError);

  const [form] = Form.useForm();

  async function signInRequest(userData: SignInData) {
    // To DO Loading
    const signInData = await dispatch(asyncSignIn(userData));
    if (isActionFulfilled(signInData.meta.requestStatus)) {
      message.success(t('messages.sign-in-done'), 4);
    } else {
      message.error(`${errorApiSignIn}`, 4);
    }
  }

  return (
    <Container>
      <Form {...layout} form={form} name="control-hooks" onFinish={signInRequest}>
        <Form.Item name="login" label={t('labelOfForms.login')} rules={FieldRegExp()}>
          <Input placeholder={t('labelOfForms.login')} />
        </Form.Item>

        <Form.Item name="password" label={t('labelOfForms.password')} rules={FieldRegExp()}>
          <AutoComplete>
            <Input.Password
              placeholder={t('labelOfForms.password')}
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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
`;

export default SignInPage;
