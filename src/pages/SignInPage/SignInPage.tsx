import { Form, Input, Button, AutoComplete } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LoginOutlined } from '@ant-design/icons';
import { useApiRequestWithUIMessages } from '../../app/useApiRequestWithUIMessages';
import { asyncSignIn } from '../../reducer/authorization/authorizationSlice';
import { useTranslation } from 'react-i18next';
import { SignInData, Token } from '../../API/authorization';
import formProperties from '../../antd/formProperties';
import PageTitle from '../../components/styled/PageTitle';
import { MessageKeys } from '../../antd/messageProperties';
import FormPageContainer from '../../components/styled/FormPageContainer';
import { FieldRegExp } from '../../components/ValidationAuth/FieldRegExp';

const { tailLayout, layout } = formProperties;

const SignInPage = () => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const signInRequest = useApiRequestWithUIMessages<SignInData, Token>({
    messageKey: MessageKeys.signIn,
    thunk: asyncSignIn,
    showOkMessage: true
  });

  return (
    <>
      <PageTitle textLink="buttons.sign-in" icon={<LoginOutlined />} />
      <FormPageContainer>
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
      </FormPageContainer>
    </>
  );
};

export default SignInPage;
