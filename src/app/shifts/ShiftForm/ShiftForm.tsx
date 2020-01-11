import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import { IShift } from '../IShift';


const { RangePicker } = DatePicker;

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

      <Form.Item label="From - To">
        {getFieldDecorator('fromTo', {
          rules: [{
            type: 'array',
            required: true,
            message: 'Please select the date-time range'
          }]
        })(
          <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
        )}
      </Form.Item>
    </Form>
  );
}

const AntdShiftFormForm = Form.create({ name: 'ShiftForm' })(ShiftFormComponent);

export { AntdShiftFormForm as ShiftFormComponent };
