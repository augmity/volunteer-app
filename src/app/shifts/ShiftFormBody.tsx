import React from 'react';
import { Form, DatePicker } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';


interface IProps {
  form: WrappedFormUtils;
}

export const ShiftFormBody: React.FC<IProps> = ({ form, children }) => {

  const { getFieldDecorator } = form;

  return (
    <Form layout="vertical">
      <Form.Item label="Date/Time">
        {getFieldDecorator('fromTo', {
          rules: [{
            type: 'array',
            required: true,
            message: 'Please select the date-time range'
          }]
        })(
          <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
        )}
      </Form.Item>
      
      {children}

    </Form>
  );
}
