import React, { useEffect, useState } from 'react';
import { Form, Button } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import { useFirestoreDocument, useFirebase } from '../../libs/firebase';

import { Shift } from './Shift';
import { ShiftFormBody } from './ShiftFormBody';
import { PeopleSelector } from '../people/PeopleSelector';
import { JobSelector } from '../jobs';
import { LocationSelector } from '../locations';


interface IProps {
  form: WrappedFormUtils;
  id?: string;
  onSubmit: (value: Partial<Shift>) => void;
  onCancel: () => void;
}

const ShiftFormComponent: React.FC<IProps> = ({ form, id, onCancel, onSubmit }) => {

  const [people, setPeople] = useState<string[]>([]);
  const [job, setJob] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [name, setName] = useState<string>();

  const firebase = useFirebase();
  const doc = useFirestoreDocument<Shift>('shifts', id || null);

  useEffect(() => {
    if (doc) {
      setPeople(doc.people || []);
      form.setFieldsValue({
        // TODO: from-to date/time
      });
    } else {
      form.resetFields();
    }
  }, [doc]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const entity: Partial<Shift> = {
          fromDateTime: values.fromTo[0].toDate(),
          toDateTime: values.fromTo[1].toDate(),
          people: people,
          job: job,
          location: location,
          name: name
        }
        await save(entity);
        onSubmit(entity);
      }
    });
  };

  const save = (entity: Partial<Shift>): Promise<any> => {
    if (id) {
      return firebase.db.collection('shifts')
        .doc(id)
        .set(entity, { merge: true });
    } else {
      return firebase.db.collection('shifts')
        .add(entity)
        .then(() => {
          form.resetFields();
          setJob(undefined);
          setLocation(undefined);
          setName(undefined);
          setPeople([]);
          return null;
        })
    }
  }


  return (
    <ShiftFormBody form={form} >
      <Form.Item label="Job">        
        <JobSelector model={job} onModelChange={setJob} onLabelChange={setName} />
      </Form.Item>

      <Form.Item label="Location">        
        <LocationSelector model={location} onModelChange={setLocation} />
      </Form.Item>

      <Form.Item label="People">        
        <PeopleSelector model={people} onModelChange={setPeople} />
      </Form.Item>

      <div>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }} onClick={handleSubmit}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </ShiftFormBody>
  );
}

const AntdForm = Form.create<IProps>({ name: 'ShiftForm' })(ShiftFormComponent);
export { AntdForm as ShiftForm };
