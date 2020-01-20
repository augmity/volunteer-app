import React, { useEffect } from 'react';
import { Form, Button } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import { useFirestoreDocument, useFirebase } from '../../libs/firebase';

import { Job } from './Job';
import { JobFormBody } from './JobFormBody';


interface IProps {
  form: WrappedFormUtils;
  id: string | null;
  onSubmit: (value: Partial<Job>) => void;
  onCancel: () => void;
}

const JobFormComponent: React.FC<IProps> = ({ form, id, onCancel, onSubmit }) => {

  const firebase = useFirebase();
  const doc = useFirestoreDocument<Job>('jobs', id);

  useEffect(() => {
    if (doc as any) {
      form.setFieldsValue({
        name: doc?.name,
        description: doc?.description
      });
    } else {
      form.resetFields();
    }
  }, [doc]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const entity: Partial<Job> = {
          name: values.name,
          description: values.description || null,
        }
        await save(entity);
        onSubmit(entity);
      }
    });
  };

  const save = (entity: Partial<Job>): Promise<any> => {
    console.log('entity', entity);
    if (id) {
      return firebase.db.collection('jobs')
        .doc(id)
        .set(entity, { merge: true });
    } else {
      return firebase.db.collection('jobs')
        .add(entity)
        .then(() => {
          form.resetFields();
          return null;
        })
    }
  }

  return (
    <JobFormBody form={form}>
      <div>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }} onClick={handleSubmit}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </JobFormBody>
  );
}

const AntdForm = Form.create<IProps>({ name: 'JobForm' })(JobFormComponent);
export { AntdForm as JobForm };
