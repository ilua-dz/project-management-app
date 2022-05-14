
import { Form, Input, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createAsyncSignIn, valueApiSignUp,errorFromApiSignIn } from '../features/authorization/authorizationSlice';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Links from '../components/LinksEnum';

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

  const dataApiSignUp = useAppSelector(valueApiSignUp);
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
    const allDatasFromSignIN = await dispatch(createAsyncSignIn(dataOfUser))
    const statusRequest=allDatasFromSignIN.meta.requestStatus;

    if (statusRequest === 'fulfilled'){  
      const goMainPage= () => navigate(`/${Links.mainPage}`,{replace:true});
      goMainPage()
    } 
    if (statusRequest === 'rejected'){
      toast.error(`But ${errorApiSignIn}`)
    }     
  }

  const onFill = () => {
    /*TO DO*/
    form.setFieldsValue({
      name: `${dataApiSignUp.name}`,
      login: `${dataApiSignUp.login}`,
      password: ''
    });
  };

  return (
    <Container>
      <Toaster />
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      
        <Form.Item
          name="login"
          label="Login"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button>
        </Form.Item>
      </Form>
    </Container>
  )
};

export default SignInPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
`;
