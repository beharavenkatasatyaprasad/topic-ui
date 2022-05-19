import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addTopic, getPreferences, getTopics, postPreferences } from '../apis';
import LoadingIndicator from './LoadingIndicator';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

export default function Preferences() {
  const [preferences, setPreferences] = useState([]);
  const [topics, settopics] = useState([]);
  const [loading, setloading] = useState(true);
  const [isAddTopicOpen, setisAddTopicOpen] = useState(false);
  const { user } = useSelector((state) => state.userDetails);
  const [label, setlabel] = useState('');
  const [description, setdescription] = useState('');

  useEffect(() => {
    fetchPreferences();
    fetchTopics();
  }, []);

  const fetchPreferences = () => {
    setloading(true);
    getPreferences(user.id)
      .then((res) => {
        if (res.success) {
          setPreferences(res.preferences);
          setloading(false);
        } else {
          setloading(false);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createTopic = () => {
    setloading(true);
    addTopic({ label, description })
      .then((res) => {
        if (res.success) {
          fetchTopics();
          alert('Successfully created!');
          setdescription('');
          setlabel('');
          setloading(false);
        } else {
          setloading(false);
          alert(res.message);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTopics = () => {
    setloading(true);
    getTopics()
      .then((res) => {
        if (res.success) {
          settopics(res.topics);
          setloading(false);
        } else {
          setloading(false);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) return <LoadingIndicator isLoading={loading} />;

  let newTopic = isAddTopicOpen ? (
    <div className='m-3'>
      <div className='mb-3'>
        <label>Topic Label</label>
        <input
          type='text'
          className='form-control'
          value={label}
          onChange={(e) => setlabel(e.target.value)}
          placeholder='Enter topic label'
        />
      </div>
      <div className='mb-3'>
        <label>Topic Description</label>
        <textarea
          className='form-control'
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          placeholder='Enter topic description'
        />
      </div>
      <div className='d-grid'>
        <button type='button' onClick={createTopic} className='btn btn-primary'>
          {loading ? <LoadingIndicator isLoading={loading} /> : 'Save'}
        </button>
        <button type='button' onClick={(e) => setisAddTopicOpen((prev) => !prev)} className='btn btn-primary'>
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <>
      <div className='text-end m-3'>
        <button onClick={(e) => setisAddTopicOpen((prev) => !prev)} className='btn btn-primary'>
          Add Topic
        </button>
      </div>
    </>
  );
  return (
    <div className='d-flex'>
      <Sidebar />
      <div className='col'>
        <TopHeader title={'Manage Preferences / Topics'} />
        {user.userTypeId == 1 && newTopic}
        <div className='m-3 col-3 mx-auto'>
          <table className='table table-striped'>
            <tbody>
              {topics.map((a) => (
                <TopicHandler
                  key={a.name}
                  a={a}
                  preferences={preferences}
                  setPreferences={(pref) => setPreferences(pref)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const TopicHandler = ({ a, preferences, setPreferences }) => {
  const [checked, setChecked] = useState(preferences.includes(a.id));
  const { user } = useSelector((state) => state.userDetails);
  const handleChange = () => {
    postPreferences(user.id, a.id, preferences.includes(a.id) ? 'delete' : 'add')
      .then((res) => {
        if (res.success) {
          setPreferences(res.preferences);
          return;
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr key={a.name}>
      <td>{a.label}</td>
      <td>
        <input
          type='checkbox'
          onChange={(e) => {
            setChecked(!checked);
            handleChange();
          }}
          defaultChecked={checked}
          name={a.name}
          className='check'
        />
      </td>
    </tr>
  );
};
