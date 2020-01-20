import React, { useEffect } from 'react';
import { Form, Button } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import { useFirestoreDocument, useFirebase } from '../../libs/firebase';

import { Location } from './Location';
import { LocationFormBody } from './LocationFormBody';


interface IProps {
  form: WrappedFormUtils;
  id: string | null;
  onSubmit: (value: Partial<Location>) => void;
  onCancel: () => void;
}

const LocationFormComponent: React.FC<IProps> = ({ form, id, onCancel, onSubmit }) => {

  const firebase = useFirebase();
  const doc = useFirestoreDocument<Location>('locations', id);

  useEffect(() => {
    if (doc as any) {
      form.setFieldsValue({
        name: doc?.name,
        address: doc?.address,
        description: doc?.description
      });
    } else {
      form.resetFields();
    }
    console.log('doc', doc);
  }, [doc]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const entity: Partial<Location> = {
          name: values.name,
          address: values.address || null,
          description: values.description || null,
        }
        await save(entity);
        onSubmit(entity);
      }
    });
  };

  const save = (entity: Partial<Location>): Promise<any> => {
    console.log('entity', entity);
    if (id) {
      return firebase.db.collection('locations')
        .doc(id)
        .set(entity, { merge: true });
    } else {
      return firebase.db.collection('locations')
        .add(entity);
    }
  }

  return (
    <LocationFormBody form={form}>
      <div>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }} onClick={handleSubmit}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </LocationFormBody>
  );
}

const AntdForm = Form.create<IProps>({ name: 'LocationForm' })(LocationFormComponent);
export { AntdForm as LocationForm };
