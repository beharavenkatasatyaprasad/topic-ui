import React, { useState } from 'react';
import { login } from '../apis';
import { setItemHelper } from '../utils';
import LoadingIndicator from './LoadingIndicator';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions/user';
export default function Login() {
  const [state, setstate] = useState({});
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const setState = setItemHelper(state, setstate);

  const handleSubmit = () => {
    setloading(true);
    login(state).then((res) => {
      if (res.success) {
        dispatch(addUser(res));
        setloading(false);
      } else {
        alert(res.message);
        setloading(false);
      }
    });
  };

  return (
    <div>
      <h3>Sign In</h3>
      <div className='mb-3'>
        <label>Email address</label>
        <input
          type='email'
          onChange={(e) => setState('email')(e.target.value)}
          className='form-control'
          placeholder='Enter email'
        />
      </div>
      <div className='mb-3'>
        <label>Password</label>
        <input type='password' onChange={(e) => setState('password')(e.target.value)} className='form-control' placeholder='Enter password' />
      </div>
      <div className='d-grid'>
        <button onClick={handleSubmit} type='button' className='btn btn-primary'>
          {loading ? <LoadingIndicator isLoading={loading} /> : 'Submit'}
        </button>
      </div>
    </div>
  );
}
