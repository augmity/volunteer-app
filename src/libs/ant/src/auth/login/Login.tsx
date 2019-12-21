import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Divider, Checkbox, message } from 'antd';

import { auth, firebase } from '../../../../../firebase';
import { AuthContext } from '../Auth';

import './Login.css';


// TODO: use proper type
interface IProps {
  history: any;
  form?: any;
}

// const Login = ({ history }: IProps) => {

//   const handleLogin = useCallback(
//     async event => {
//       event.preventDefault();
//       const { email, password } = event.target.elements;
//       try {
//         await auth.signInWithEmailAndPassword(email.value, password.value);
//         history.push('/');
//       } catch (error) {
//         alert(error); // DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
//       }
//     },
//     [history]
//   );

//   const loginWithGoogle = () => {
//     console.log('loginWithGoogle');
//     const provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider).then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       // var token = result.credential.accessToken;
//       // The signed-in user info.
//       console.log('result', result)
//       // ...
//     }).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       // ...
//     });
//   }

//   const { currentUser } = useContext(AuthContext);

//   if (currentUser) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <div>
//       <h1>Log in</h1>

//       <Button type="primary" icon="google" onClick={loginWithGoogle}>Login with Google</Button>

//       <form onSubmit={handleLogin}>
//         <label>
//           Email
//           <input name="email" type="email" placeholder="Email" />
//         </label>
//         <label>
//           Password
//           <input name="password" type="password" placeholder="Password" />
//         </label>
//         <button type="submit">Log in</button>
//       </form>
//       <Link to="/signup">Sign up</Link>
//     </div>
//   );
// };

// const LoginWithRouter = withRouter(Login);

// export { LoginWithRouter as Login };





const LoginForm = ({ history, form }: IProps) => {

  const handleLogin = useCallback(
    event => {
      event.preventDefault();
      form.validateFields(async (err: any, values: any) => {
        if (!err) {
          try {
            await auth.signInWithEmailAndPassword(values.email, values.password);
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
        console.log(result)
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
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginWithRouter);

export { WrappedNormalLoginForm as Login };
