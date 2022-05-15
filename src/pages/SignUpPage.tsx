
import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createAsyncSignUp, errorFromApiSignUp, addValuesForFill } from '../reducer/authorization/authorizationSlice';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import Links from '../components/LinksEnum';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

type IdataUser={
  name: string,
  login: string,
  password: string
}

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const errorApiSignUp = useAppSelector(errorFromApiSignUp);

  const [form] = Form.useForm();

  const onFinish = async ({name, login, password }: IdataUser) => {
    dispatch(addValuesForFill({name, login}))
    toast.promise(
      doSignUp ({name, login, password}),
        {
         loading: 'Loading...',
         success: <b>Your information have been send...</b>,
         error: <b>Some problem with server...</b>,
        }
     );
  };

  async function doSignUp (dataForSignUp: IdataUser){
    const dataFromSignUp = await dispatch(createAsyncSignUp(dataForSignUp));
    const statusRequest=dataFromSignUp.meta.requestStatus;
      if (statusRequest === 'fulfilled'){
        const goMainPage= () => navigate(`/${Links.signInPage}`,{replace:true});
        goMainPage()
        toast.success('You signUp! Fill in form "Sign In"', {duration:3000})
      };
      
      if (statusRequest === 'rejected'){
        toast.error(`But ${errorApiSignUp} Fill in "Sign In"!`);
        const signInPage= () => navigate(`/${Links.signInPage}`,{replace:true});
        signInPage();
      };  
  }

  return (
    <Container>
    <Toaster />
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="name"
        label={t('labelOfForms.name')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder={t('labelOfForms.name')}/>
      </Form.Item>

      <Form.Item
        name="login"
        label={t('labelOfForms.login')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder={t('labelOfForms.login')}/>
      </Form.Item>

      <Form.Item
        name="password"
        label={t('labelOfForms.password')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password
          placeholder={t('labelOfForms.password')}
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
        {t('buttons.Submit')}
        </Button>
      </Form.Item>
    </Form>
    </Container>
  )
};

export default SignUpPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
`;
