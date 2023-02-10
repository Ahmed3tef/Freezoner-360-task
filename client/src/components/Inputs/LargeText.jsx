import React from 'react';
import './_UploadForm.scss';
const LargeText = props => {
  const width = props.width ? props.width : '80%';
  const handleInputChange = props.onChange ? props.onChange : (event) =>
    props.setDesc(event.target.value)
  return (
    <div className={`input-container input-text-large ${props.classes}`}>
      {props.label && (
        <div className='input-label pt-[2rem]' style={{
          width: props.labelWidth ? props.labelWidth : ''
          , alignSelf: 'flex-start'
        }} >
          <p >{props.label}</p>
        </div>
      )}

      <div className='flex flex-col gap-[1rem]' style={{

        width: !props.label ? '100%' : width
      }}>

        <textarea
          placeholder={props.placeholder}
          value={props.desc}
          required={props.required ? props.required : false}
          style={{
            direction: props.direction ? 'rtl' : 'ltr',
            height: props.height ? props.height : '15rem',
            width: '100%',
          }}
          onChange={handleInputChange}
          onBlur={props.onBlur}
          name={props.inputName}

        />
        {props.error && <p className='input-error'>{props.error}</p>}
      </div>
    </div>
  );
};

export default LargeText;
