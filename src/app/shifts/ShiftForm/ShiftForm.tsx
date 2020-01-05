import React from 'react';
import { Form, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import { IShift } from '../IShift';


interface IProps {
  form: WrappedFormUtils;
  value: IShift | null;
  onSubmit: () => void;
  onCancel: () => void;
}

const ShiftFormComponent: React.FC<IProps> = ({ form }) => {

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

const AntdShiftFormForm = Form.create({ name: 'ShiftForm' })(ShiftFormComponent);

export { AntdShiftFormForm as ShiftFormComponent };
