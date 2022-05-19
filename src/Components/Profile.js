import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import { setItemHelper } from '../utils';
import LoadingIndicator from './LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../redux/actions/user';
import { updateUser } from '../apis';

export default function Profile() {
  const { user } = useSelector((state) => state.userDetails);
  const [state, setstate] = useState({ ...user });
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const setState = setItemHelper(state, setstate);

  const handleSubmit = () => {
    setloading(true);
    console.log(state);
    updateUser({ ...state }).then((res) => {
      if (res.success) {
        dispatch(editUser(res));
        alert('changes successfully saved!');
        setloading(false);
      } else {
        alert(res.message);
        setloading(false);
      }
    });
  };

  return (
    <div className='d-flex'>
      <Sidebar />
      <div className='col'>
        <TopHeader title={'Manage Profile'} />
        <div className='m-3 col-3 mx-auto'>
          <div className=''>
            <>
              <div className='mb-3'>
                <label>Name</label>
                <input
                  type='text'
                  className='form-control'
                  value={state.name}
                  onChange={(e) => setState('name')(e.target.value)}
                  placeholder='First name'
                />
              </div>
              <div className='mb-3'>
                <label>Email address</label>
                <input
                  type='email'
                  className='form-control'
                  value={state.email}
                  onChange={(e) => setState('email')(e.target.value)}
                  placeholder='Enter email'
                  disabled
                />
              </div>
              <div className='mb-3'>
                <label>Phone</label>
                <input
                  type='text'
                  value={state.phone}
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
                    value={state.gender}
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
                <label>Password</label>
                <input
                  type='password'
                  onChange={(e) => setState('password')(e.target.value)}
                  value={state.password}
                  className='form-control'
                  placeholder='Enter password'
                />
              </div>
              <div className='d-grid'>
                <button type='button' onClick={handleSubmit} className='btn btn-primary'>
                  {loading ? <LoadingIndicator isLoading={loading} /> : 'Save'}
                </button>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
