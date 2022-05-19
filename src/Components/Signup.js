import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../apis';
import { addUser } from '../redux/actions/user';
import { setItemHelper } from '../utils';
import LoadingIndicator from './LoadingIndicator';

export default function Signup() {
  const [state, setstate] = useState({});
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const setState = setItemHelper(state, setstate);

  const handleSubmit = () => {
    setloading(true);
    register(state).then((res) => {
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
    <>
      <h3>Sign Up</h3>
      <div className='mb-3'>
        <label>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={(e) => setState('name')(e.target.value)}
          placeholder='First name'
        />
      </div>
      <div className='mb-3'>
        <label>Email address</label>
        <input
          type='email'
          className='form-control'
          onChange={(e) => setState('email')(e.target.value)}
          placeholder='Enter email'
        />
      </div>
      <div className='mb-3'>
        <label>Phone</label>
        <input
          type='text'
          onChange={(e) => setState('phone')(e.target.value)}
          className='form-control'
          placeholder='Enter Phone no.'
        />
      </div>
      <div className='mb-3'>
        <div className='form-label-group'>
          <label>Gender</label>
          <select
            className={'form-control'}
            name='gender'
            onChange={(e) => setState('gender')(e.target.value)}
            required
          >
            <option value={undefined} selected disabled>
              ---Select Gender---
            </option>
            <option value={'male'}>Male</option>
            <option value={'female'}>Female</option>
            <option value={'others'}>Others</option>
          </select>
        </div>
      </div>
      <div className='mb-3'>
        <div className='form-label-group'>
          <label>User Type</label>
          <select
            className={'form-control'}
            name='userTypeId'
            onChange={(e) => setState('userTypeId')(e.target.value)}
            required
          >
            <option value={undefined} selected disabled>
              ---Select Role---
            </option>
            <option value={1}>Supervisor</option>
            <option value={2}>Student</option>
          </select>
        </div>
      </div>
      <div className='mb-3'>
        <label>Password</label>
        <input
          type='password'
          onChange={(e) => setState('password')(e.target.value)}
          className='form-control'
          placeholder='Enter password'
        />
      </div>
      <div className='d-grid'>
        <button type='button' onClick={handleSubmit} className='btn btn-primary'>
          {loading ? <LoadingIndicator isLoading={loading} /> : 'Sign Up'}
        </button>
      </div>
      <p className='forgot-password text-right'>
        Already registered <a href='/sign-in'>sign in?</a>
      </p>
    </>
  );
}
