import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import { IShift } from '../IShift';


const { RangePicker } = DatePicker;

interface IProps {
  form: WrappedFormUtils;
  value: IShift | null;
  onSubmit: (value: Partial<IShift>) => void;
  onCancel: () => void;
}


const ShiftFormComponent: React.FC<IProps> = ({ form, onCancel, onSubmit }) => {

  const { getFieldDecorator } = form;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const entity: Partial<IShift> = {
          name: values.name,
          fromDateTime: values.fromTo[0].toDate(),
          toDateTime: values.fromTo[1].toDate(),
        }
        onSubmit(entity);
      }
    });
  };

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
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
      <div>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>Add</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </Form>
  );
}

const AntdShiftFormForm = Form.create<IProps>({ name: 'ShiftForm' })(ShiftFormComponent);

export { AntdShiftFormForm as ShiftFormComponent };
