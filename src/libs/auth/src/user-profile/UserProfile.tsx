import React, { useState, useContext, useEffect } from 'react';
import { Upload, message, Icon, Typography } from 'antd'; 

import { AuthContext } from '../Auth';
import { RcCustomRequestOptions, UploadChangeParam } from 'antd/lib/upload/interface';
import { useFirebase } from '../../../firebase';

import './UserProfile.css';


function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


export const UserProfile: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [avatarUri, setAvatarUri] = useState();
  const { userData, updateUserData } = useContext(AuthContext);
  const firebase = useFirebase();

  useEffect(() => {
    if (userData) {
      setAvatarUri(userData.photoUri);
    }
  }, [userData]);

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">{loading ? 'Uploading' : 'Upload'}</div>
    </div>
  );

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') { 
      const uri = info.file.response.uri;
      setLoading(false);
      updateUserData({ photoUri: uri, photoLargeUri: uri });
    }
  };

  const handleCustomRequest = (options: RcCustomRequestOptions) => {
    setAvatarUri(undefined);
    setLoading(true);

    firebase.upload('avatars/', options.file).subscribe(status => {
      if (status.status === 'uploading') {
        options.onProgress({ percent: status.progress! }, options.file);
      } else if (status.status === 'success') {
        options.onSuccess({ uri: status.uri }, options.file);
      } else if (status.status === 'error') {
        options.onError(status.error);
      }
    })
  }

  return (
    <div style={{ marginTop: 16, marginBottom: 16, background: '#fff', padding: 16 }}>

      <Typography.Text style={{ display: 'block', marginBottom: 8 }}>User Avatar</Typography.Text>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={handleCustomRequest}
      >
        { avatarUri ? <img src={avatarUri} alt="avatar" style={{ width: '100%' }} /> : uploadButton }
      </Upload>
    </div>
  );
}
