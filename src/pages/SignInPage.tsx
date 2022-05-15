
import { Form, Input, Button, AutoComplete, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createAsyncSignIn, errorFromApiSignIn } from '../reducer/authorization/authorizationSlice';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Links from '../components/LinksEnum';
import { useTranslation } from 'react-i18next';
import { IUserData } from '../API/dependencies';


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
    requestSignIN ({login, password});
  };

  async function requestSignIN (dataOfUser: Partial<IUserData>){
    const dataFromSignIN = await dispatch(createAsyncSignIn(dataOfUser))
    const statusRequest=dataFromSignIN.meta.requestStatus;
    if (statusRequest === 'fulfilled'){  
      const goMainPage= () => navigate(`/${Links.mainPage}`,{replace:true});
      goMainPage()
    } 
    if (statusRequest === 'rejected'){
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
          <AutoComplete>
            <Input.Password
              placeholder={t('labelOfForms.password')}
              autoComplete='off'
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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
