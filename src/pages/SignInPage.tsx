import { Form, Input, Button, AutoComplete, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { asyncSignIn, getApiSignInError } from '../reducer/authorization/authorizationSlice';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Links from '../components/LinksEnum';
import { useTranslation } from 'react-i18next';
import { SignInData } from '../API/authorization';
import formProperties from '../antd/formProperties';

const { tailLayout, layout } = formProperties;

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const errorApiSignIn = useAppSelector(getApiSignInError);

  const [form] = Form.useForm();

  const onFinish = ({ login, password }: SignInData) => {
    requestSignIN({ login, password });
  };

  async function requestSignIN(userData: SignInData) {
    const signInData = await dispatch(asyncSignIn(userData));
    const statusRequest = signInData.meta.requestStatus;
    if (statusRequest === 'fulfilled') {
      navigate(`/${Links.mainPage}`);
    }
    if (statusRequest === 'rejected') {
      message.error(`${errorApiSignIn}`, 4);
    }
  }

  return (
    <Container>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
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

export default SignInPage;
