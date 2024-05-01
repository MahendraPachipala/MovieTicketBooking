import React from 'react';
import {useLocation} from 'react-router-dom';
import './confirm.css';

const Confirm = () => {
  const location = useLocation();
  console.log(location.state);
  const {Date,Theater,Time,Tickets,movie} = location.state;

  return (
 <div className = "main">
  <div class="cont">
  <div class="flex-container">
    <div class="right-pane">
      <div class="ticket">
        <h4>Tickets Confirmed</h4>
        <h2>{movie}</h2>
        <p>{Date}</p>
        <p>{Theater}</p>
        <p>Time: {Time}</p>
        <p>Seats: {Tickets.join(', ')}</p>
      </div>
    </div>
  </div>
</div>
</div>

  );
};

export default Confirm;
