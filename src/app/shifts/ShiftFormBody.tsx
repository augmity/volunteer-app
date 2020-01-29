import React from 'react';
import { Form, DatePicker, InputNumber, Row, Col } from 'antd';
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

      <Row>
        <Col span={10}>
          <Form.Item label="People (min)">
            {getFieldDecorator('minPeople', {
              initialValue: 1,
              rules: [{
                required: true,
                message: 'Please select minimum number of people for this shift'
              }]
            })(
              <InputNumber />
            )}
          </Form.Item>
        </Col>

        <Col span={10}>
          <Form.Item label="People (max)">
            {getFieldDecorator('maxPeople', {
              initialValue: 5,
              rules: [{
                required: true,
                message: 'Please select maximum number of people for this shift'
              }]
            })(
              <InputNumber />
            )}
          </Form.Item>     
        </Col>
      </Row>

      {children}
      
    </Form>
  );
}
