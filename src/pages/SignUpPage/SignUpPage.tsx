import { Form, Input, Button, AutoComplete, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { asyncSignUp, getApiSignUpError } from '../../reducer/authorization/authorizationSlice';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SignUpData } from '../../API/authorization';
import formProperties from '../../antd/formProperties';
import isActionFulfilled from '../../app/actionHelper';

const { tailLayout, layout } = formProperties;

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const errorApiSignUp = useAppSelector(getApiSignUpError);

  const [form] = Form.useForm();

  async function signUpRequest(userData: SignUpData) {
    const signUpData = await dispatch(asyncSignUp(userData));
    if (isActionFulfilled(signUpData.meta.requestStatus)) {
      message.success(t('messages.sign-up-done'), 4);
    } else {
      message.error(`${errorApiSignUp}`, 4);
    }
  }

  return (
    <Container>
      <Form {...layout} form={form} name="control-hooks" onFinish={signUpRequest}>
        <Form.Item
          name="name"
          label={t('labelOfForms.name')}
          rules={[
            {
              required: true
            }
          ]}>
          <Input placeholder={t('labelOfForms.name')} />
        </Form.Item>

        <Form.Item
          name="login"
          label={t('labelOfForms.login')}
          rules={[
            {
              required: true
            }
          ]}>
          <Input placeholder={t('labelOfForms.login')} />
        </Form.Item>

        <Form.Item
          name="password"
          label={t('labelOfForms.password')}
          rules={[
            {
              required: true
            }
          ]}>
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

export default SignUpPage;
