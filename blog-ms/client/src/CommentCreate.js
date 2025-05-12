import React from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = React.useState('');

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });
    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>New Comment</label>
          <input onChange={onChange} name='content' className='form-control' />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
