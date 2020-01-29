import React, { useContext } from 'react';
import { Button, Modal, Typography } from 'antd';

import { ShiftResolved } from './ShiftResolved';
import { useFirebase } from '../../libs/firebase';
import { AuthContext } from '../../libs/auth';
import moment from 'moment';

const { confirm } = Modal;

interface IProps {
  model?: ShiftResolved;
}

export const ShiftStatus: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ model, style }) => {

  const firebase = useFirebase();
  const { currentUser } = useContext(AuthContext);
  
  const takeShift = () => {
    const content = <div>
      <div>
        {moment(model?.fromDateTime).format('DD/MM/YYYY, h:mm A')} - {moment(model?.toDateTime).format('h:mm A')}
      </div>
      <div style={{ margin: '4px 0'}}>
        <Typography.Text mark>{model?.job.name}</Typography.Text>        
      </div>
      <div>
        {model?.location.name}
      </div>
    </div>;

    confirm({
      title: 'Do you want to take this shift?',
      content: content,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const value = {
          people: (model?.peopleIds) ? [...model?.peopleIds, currentUser!.uid] : [currentUser!.uid]
        };
        firebase.updateDocument('shifts', model!.id, value);
      },
    });
  }

  if (!model) {
    return null;
  }

  if (model.people) {
    if (model.people.length === model.maxPeople) {
      return <div style={style}>Full ({model.people.length}/{model.maxPeople})</div>
    } else if (model.peopleIds?.includes(currentUser!.uid)) {
      return <div style={style}>You took this shift</div>
    }
  }

  return (
    <div style={style}>
      <Button onClick={takeShift}>Take Shift</Button>
    </div>
  );
}
