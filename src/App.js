import './css/App.css'
import './css/input.css'
import {handleResponse} from './js/responsehandler'
import { getAnalytics } from './js/analytics';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Spinner } from 'react-bootstrap';

import React, { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [user1NotFound, setUser1NotFound] = useState(false);
  const [user2NotFound, setUser2NotFound] = useState(false);
  const [incorrectDetails, setIncorrectDetails] = useState(false);

  const [response1Result, setResponse1Result] = useState(null);
  const [response2Result, setResponse2Result] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  const handleUser1Change = (event) => {
    setUser1(event.target.value);
    setUser1NotFound(false);
  };

  const handleUser2Change = (event) => {
    setUser2(event.target.value);
    setUser2NotFound(false);
  };

  const fetchData = async () => {
    setLoading(true);
    setUser1NotFound(false);
    setUser2NotFound(false);
    setResponse1Result(null);
    setResponse2Result(null);
    setIncorrectDetails(false)
    setAnalytics(null);

    try {

      if(!user1 || !user2){
        setIncorrectDetails(true)
        return;
      }
      const response1 = await axios.get(`https://faisal-leetcode-api.cyclic.app/${user1}`);
      if ('errors' in response1.data) {
        setUser1NotFound(true);
        console.log(user1)
      }

      const response2 = await axios.get(`https://faisal-leetcode-api.cyclic.app/${user2}`);
      if ('errors' in response2.data) {
        setUser2NotFound(true);
      }

      console.log(response1)
      console.log(response2)

      const processedResponse1 = handleResponse(response1.data, user1);
      const processedResponse2 = handleResponse(response2.data, user2);
      setResponse1Result(processedResponse1.responseComponent);
      setResponse2Result(processedResponse2.responseComponent);

      const submissionVector1 = processedResponse1.submissionVector;
      const submissionVector2 = processedResponse2.submissionVector;
      const analytics = getAnalytics(submissionVector1, submissionVector2, user1, user2);
      setAnalytics(analytics);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='main'>
    <div className='container-fluid text-center gradient-background'>
      <div className='row mb-5 mt-5'>
        <div className='col-12'>
          <h1>Welcome to ProfileBattle</h1>
          <small>-A platform to compare Leetcode profiles.</small>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-lg-4'>
          <input
            id="user1"
            className="form-control mb-2"
            placeholder="Enter first username"
            value={user1}
            onChange={handleUser1Change}
          />
          <input
            id="user2"
            className="form-control mt-2"
            placeholder="Enter second username"
            value={user2}
            onChange={handleUser2Change}
          />
        </div>
      </div>
      <div className='row mt-2'>
        <div className='col'>
          <button className="btn btn-primary" onClick={fetchData}>Submit</button>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          {incorrectDetails && <span className='userNotFound'>Username can't be empty</span>}
          {user1NotFound && <span className="userNotFound">{user1} is not present</span>}
          <br />
          {user2NotFound && <span className="userNotFound">{user2} is not present</span>}
        </div>
      </div>
    </div>
      <div className="container">
        <div className="left">{response1Result}</div>
        <div className="separator"></div>
        <div className="right">{response2Result}</div>
      </div>

      {loading && (
        <Modal show centered>
          <Modal.Body className="text-center">
            <Spinner animation="border" variant="primary" />
            <h5>Loading...</h5>
          </Modal.Body>
        </Modal>
      )}

      {analytics}
    </div>
  );
}

export default App;


