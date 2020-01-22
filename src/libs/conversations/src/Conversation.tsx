
import React from 'react';
import { Comment, Button, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;


interface CommentListProps {
  comments: any[];
}

const CommentList: React.FC<CommentListProps & React.HTMLAttributes<HTMLDivElement>> = ({ comments }) => (
  <List
    size="small"
    dataSource={comments}
    // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);


interface EditorProps {
  onChange: (e: any) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

const Editor: React.FC<EditorProps & React.HTMLAttributes<HTMLDivElement>> = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <TextArea rows={2} onChange={onChange} value={value} />

    <Button loading={submitting} onClick={onSubmit} type="primary" size="small" style={{ marginTop: 4 }}>
      Comment
    </Button>
  </div>
);


export class Conversation extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Lucie Robin',
            avatar: 'https://randomuser.me/api/portraits/thumb/women/67.jpg',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 500);
  };

  handleChange = (e: any) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}

        <Editor
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          submitting={submitting}
          value={value}
        />
      </div>
    );
  }
}
          