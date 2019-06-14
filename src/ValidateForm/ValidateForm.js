import React from 'react';

export default function ValidateNote(props) {
  console.log('in val', props.message)
  if(props.hasError) {
    return (
      <div className="error">{props.message}</div>
    );
  }

  return <></>
}