import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Divider, message } from 'antd';

import { auth, firebase } from '../../../../../firebase';

import './SignUp.css';


// TODO: use proper type
interface IProps {
  history: any;
  form?: any;
}

const SignUpForm = ({ history, form }: IProps) => {

  const handleLogin = useCallback(
    event => {
      event.preventDefault();
      form.validateFields(async (err: any, values: any) => {
        if (!err) {
          try {
            await auth.createUserWithEmailAndPassword(values.email, values.password);
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
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        history.push('/');
      }).catch((error) => {
        console.error(error);
      });
  }

  const { getFieldDecorator } = form;


  return (
    <div className="sign-up-form">

      <h2>Sign up</h2>

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
          <Button type="primary" htmlType="submit" className="sign-up-form-button">
            Sign up
          </Button>
          Signed up already? <Link to="/login">Sign in!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

const SignUpWithRouter = withRouter(SignUpForm);
const WrappedSignUpForm = Form.create({ name: 'signup_form' })(SignUpWithRouter);

export { WrappedSignUpForm as SignUp };




// const SignUp = ({ history }: IProps) => {

//   const handleSignUp = useCallback(async event => {
//     event.preventDefault();
//     const { email, password } = event.target.elements;
//     try {
//       await auth
//         .createUserWithEmailAndPassword(email.value, password.value);
//       history.push("/");
//     } catch (error) {
//       alert(error);
//     }
//   }, [history]);

//   return (
//     <div>
//       <h1>Sign up</h1>
//       <form onSubmit={handleSignUp}>
//         <label>
//           Email
//           <input name="email" type="email" placeholder="Email" />
//         </label>
//         <label>
//           Password
//           <input name="password" type="password" placeholder="Password" />
//         </label>
//         <button type="submit">Sign Up</button>
//       </form>
//       <Link to="/login">Login</Link>
//     </div>
//   );
// };

// const signupWithRouter = withRouter(SignUp)

// export { signupWithRouter as SignUp };
