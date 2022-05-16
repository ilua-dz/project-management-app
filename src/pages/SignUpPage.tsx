import { Form, Input, Button, AutoComplete, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { asyncSignUp, getApiSignUpError } from '../reducer/authorization/authorizationSlice';
import styled from 'styled-components';
import Links from '../components/LinksEnum';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SignUpData } from '../API/authorization';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const errorApiSignUp = useAppSelector(getApiSignUpError);

  const [form] = Form.useForm();

  const onFinish = async ({ name, login, password }: SignUpData) => {
    doSignUp({ name, login, password });
  };

  async function doSignUp(userData: SignUpData) {
    const signUpData = await dispatch(asyncSignUp(userData));
    const statusRequest = signUpData.meta.requestStatus;
    if (statusRequest === 'fulfilled') {
      navigate(`/${Links.signInPage}`);
      message.success('You signUp! Fill this form "Sign In"', 4);
    }

    if (statusRequest === 'rejected') {
      message.error(`${errorApiSignUp} Change User `, 4);
    }
  }

  return (
    <Container>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
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
