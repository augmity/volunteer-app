import React from 'react';
import { Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { WrappedFormUtils } from 'antd/lib/form/Form';


interface IProps {
  form: WrappedFormUtils;
}

export const LocationFormBody: React.FC<IProps> = ({ form, children }) => {

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

      <Form.Item label="Description">
        {getFieldDecorator('description')(<TextArea />)}
      </Form.Item>

      {children}

    </Form>
  );
}
