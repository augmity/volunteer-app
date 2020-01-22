import React from 'react';
import { Form, DatePicker } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import moment from 'moment';

const RangePicker = DatePicker.RangePicker;

interface IProps {
  form: WrappedFormUtils;
}

export const ShiftFormBody: React.FC<IProps> = ({ form, children }) => {

  const { getFieldDecorator } = form;
  const defaultDate = moment().startOf('day');

  return (
    <Form layout="vertical">
      <Form.Item label="Date/Time">
        {getFieldDecorator('fromTo', {
          initialValue: [defaultDate, defaultDate],
          rules: [{
            type: 'array',
            required: true,
            message: 'Please select the date-time range'
          }]
        })(
          <RangePicker format="YYYY-MM-DD HH:mm A" showTime={{ use12Hours: true, format: 'h:mm', minuteStep: 5 }} />,
        )}
      </Form.Item>
      
      {children}

    </Form>
  );
}
