import React from 'react';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  border: 'solid black 1px',
  padding: '0 10px',
  color: 'red',
};

const DataOutput = props =>
  <div onClick={props.onclick}>
    <i className='date' style={styles}>{props.row.date}</i>
    <i className='animal' style={styles}>{props.row.animal}</i>
    <i className='name' style={styles}>{props.row.name}</i>
  </div>

export default DataOutput