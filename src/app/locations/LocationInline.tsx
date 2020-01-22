import React from 'react';

import { Location } from './Location';
import { useFirestoreDocument } from '../../libs/firebase';


interface IProps {
  id: string;
}

export const LocationInline: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ id, style }) => {

  const model = useFirestoreDocument<Location>('locations', id);

  return <span style={style}>{model?.name}</span>;
}
