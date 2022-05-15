
import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createAsyncSignIn, errorFromApiSignIn } from '../reducer/authorization/authorizationSlice';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Links from '../components/LinksEnum';
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
  login: string,
  password: string
}

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const errorApiSignIn = useAppSelector(errorFromApiSignIn);

  const [form] = Form.useForm();

  const onFinish = ({login, password }: IdataUser) => {
    toast.promise(
      requestSignIN ({login, password}),
        {
         loading: 'Loading...',
         success: <b>Your information have been send...</b>,
         error: <b>Some problem with server...</b>,
        }
     );
  };

  async function requestSignIN (dataOfUser: IdataUser){
    const dataFromSignIN = await dispatch(createAsyncSignIn(dataOfUser))
    const statusRequest=dataFromSignIN.meta.requestStatus;
    if (statusRequest === 'fulfilled'){  
      const goMainPage= () => navigate(`/${Links.mainPage}`,{replace:true});
      goMainPage()
    } 
    if (statusRequest === 'rejected'){
      toast.error(`But ${errorApiSignIn}`, {duration:3000})
    }     
  }

  return (
    <Container>
      <Toaster />
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      
        <Form.Item
          name="login"
          label={t('labelOfForms.login')}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={t('labelOfForms.login')} />
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
`;

export default SignInPage;
