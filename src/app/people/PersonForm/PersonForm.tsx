import React from 'react';
import { Form, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import './PersonForm.css';


interface IProps {
  form: WrappedFormUtils;
}

const PersonFormComponent: React.FC<IProps> = ({ form }) => {

  console.log('form', form);
  const { getFieldDecorator } = form;

  return (
    <Form layout="vertical">
      <Form.Item label="Name">
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: 'Name is required',
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Email">
        {getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'Email address is not valid',
            },
            {
              required: true,
              message: 'Email is required',
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Photo URI">
        {getFieldDecorator('photoUri', {
          rules: [
            {
              required: true,
              message: 'Photo URI is required',
            },
          ],
        })(<Input />)}
      </Form.Item>
    </Form>
  );
}

const AntdPersonForm = Form.create({ name: 'PersonForm' })(PersonFormComponent);

export { AntdPersonForm as PersonForm };
