
import { Form, Input, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createAsyncSignUp, valueApiSignUp, errorFromApiSignUp, addValuesForFill } from '../reducer/authorization/authorizationSlice';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import Links from '../components/LinksEnum';
import { useNavigate } from 'react-router-dom';

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

  const dataApiSignUp = useAppSelector(valueApiSignUp);
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
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
      <Input />
      </Form.Item>

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

export default SignUpPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
`;
