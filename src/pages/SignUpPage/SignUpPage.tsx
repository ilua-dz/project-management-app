import { Form, Input, Button, AutoComplete, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { asyncSignUp, getApiSignUpError } from '../../reducer/authorization/authorizationSlice';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SignUpData } from '../../API/authorization';
import formProperties from '../../antd/formProperties';
import isActionFulfilled from '../../app/actionHelper';
import { fieldRegExp } from '../../components/ValidationAuth/Validate';
import { useNavigate } from 'react-router-dom';
import Links from '../../enumerations/LinksEnum';

const { tailLayout, layout } = formProperties;

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const errorApiSignUp = useAppSelector(getApiSignUpError);

  const [form] = Form.useForm();

  const validateMessages = {
    required: "'${label}' " + `${t('messagesOfAuthForms.require')}`,
    pattern: {
      mismatch: "'${label}' " + `${t('messagesOfAuthForms.pattern')}`
    }
  };

  async function signUpRequest(userData: SignUpData) {
    const signUpData = await dispatch(asyncSignUp(userData));
    if (isActionFulfilled(signUpData.meta.requestStatus)) {
      message.success(t('messages.sign-up-done'), 4);
      navigate(Links.signInPage);
    } else {
      message.error(`${errorApiSignUp}`, 4);
    }
  }

  return (
    <Container>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={signUpRequest}
        validateMessages={validateMessages}>
        <Form.Item name="name" label={t('labelOfForms.name')} rules={fieldRegExp()}>
          <Input placeholder={t('labelOfForms.name')} />
        </Form.Item>

        <Form.Item name="login" label={t('labelOfForms.login')} rules={fieldRegExp()}>
          <Input placeholder={t('labelOfForms.login')} />
        </Form.Item>

        <Form.Item name="password" label={t('labelOfForms.password')} rules={fieldRegExp()}>
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
