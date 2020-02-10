import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import fb from 'firebase/app';
import { Form, Icon, Input, Button, Divider, message } from 'antd';

import { useFirebase } from '../../../firebase';
import { AuthContext } from '../Auth';

import './Login.css';


// TODO: use proper type
interface IProps {
  history: any;
  form?: any;
}

const LoginForm = ({ history, form }: IProps) => {

  const firebase = useFirebase();

  const handleLogin = useCallback(
    event => {
      event.preventDefault();
      form.validateFields(async (err: any, values: any) => {
        if (!err) {
          try {
            await firebase.auth.signInWithEmailAndPassword(values.email, values.password);
            history.push('/');
          } catch (error) {
            message.error(error.message);
          }
        }
      });
    },
    [history]
  );

  const loginWithGoogle = () => {
    const provider = new fb.auth.GoogleAuthProvider();
    firebase.auth.signInWithPopup(provider)
      .then((result) => {
        history.push('/');
      }).catch((error) => {
        console.error(error);
      });
  }


  // Login form should only be visible when the user is not logged in.
  // Otherwise, just redirect to the home page.
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }

  const { getFieldDecorator } = form;


  return (
    <div className="login-form">

      <h2>Sign in</h2>

      <Button type="primary" icon="google" onClick={loginWithGoogle}>Google</Button>

      <Divider>or</Divider>

      <Form onSubmit={handleLogin}>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Invalid email address.',
              },
              {
                required: true,
                message: 'Email is required',
              },
            ],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Password is required' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>

        <Form.Item>
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a> */}
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          No account yet? <Link to="/signup">Sign up!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

const LoginWithRouter = withRouter(LoginForm);
const WrappedLoginForm = Form.create({ name: 'login_form' })(LoginWithRouter);

export { WrappedLoginForm as Login };
