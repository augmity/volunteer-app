import React from 'react';

import { PersonAvatar } from './PersonAvatar';
import { IPerson } from './IPerson';


interface IProps {
  data: IPerson[] | undefined;
}

export const PeopleInlineList: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ data }) => {

  return (
    <div className="people-inline-list">
      {data?.map(person => <PersonAvatar className="people-inline-list-item" model={person} showHint={true} />)}
    </div>
  );
}
