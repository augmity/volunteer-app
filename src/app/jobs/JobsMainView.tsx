import React, { useState, useContext } from 'react';
import { Button, Drawer } from 'antd';

import { Job } from './Job';
import { JobList } from './JobsList';
import { JobForm } from './JobForm';
import { AuthContext } from '../../libs/auth';


export const JobsMainView: React.FC = () => {

  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { isAdmin } = useContext(AuthContext);

  const onSelectItem = (item: Job) => {
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
        <JobList style={{ margin: '0 16px' }} onSelectItem={onSelectItem} />

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
          <JobForm
            id={selectedItemId}
            onSubmit={() => setFormVisible(false)}
            onCancel={() => setFormVisible(false)}
          />
        </Drawer>
      </div>
    </>
  );
}
