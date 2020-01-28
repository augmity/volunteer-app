import React, { useState, useContext } from 'react';
import { Button, Drawer } from 'antd';

import { Location } from './Location';
import { LocationsList } from './LocationsList';
import { LocationForm } from './LocationForm';
import { AuthContext } from '../../libs/auth';


export const LocationsMainView: React.FC = () => {

  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { isAdmin } = useContext(AuthContext);

  const onSelectItem = (item: Location) => {
    setSelectedItemId(item.id);
    setFormVisible(true);
  }

  const add = () => {
    setSelectedItemId(null);
    setFormVisible(true);
  }

  return (
    <>
      <div className="header" style={{ padding: '16px 0'}}>
        { isAdmin && <Button type="primary" size="small" onClick={add}>
          Add
        </Button>}
      </div>
      
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
          background: '#fff',
          flex: 1
        }}
      >
        <LocationsList style={{ margin: '0 16px' }} onSelectItem={onSelectItem} />

        <Drawer
          title={selectedItemId ? 'Edit' : 'Add'}
          placement="left"
          closable={false}
          onClose={() => setFormVisible(false)}
          visible={formVisible}
          getContainer={false}
          width="400"
          style={{ position: 'absolute' }}
        >
          <LocationForm
            id={selectedItemId}
            onSubmit={() => setFormVisible(false)}
            onCancel={() => setFormVisible(false)}
          />
        </Drawer>
      </div>
    </>
  );
}
