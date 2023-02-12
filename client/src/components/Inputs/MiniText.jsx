import React from 'react';
import './_UploadForm.scss';

const MiniText = props => {
  let direction;
  const width = props.width ? props.width : '80%';
  if (props.path === 'product') {
    // دا عشان ميحودش يمين غير ف البردوكت بس
    direction = props.direction;
  }

  const handleInputChange = props.onChange ? props.onChange : (event) =>
    props.setName(event.target.value)

  return (
    <>

      <div
        className={`input-container input-text-mini ${props.classes}`}
        style={{ direction: !props.turnText ? '' : direction }}>
        {props.label && (
          <div className='input-label pt-[2rem]' style={{
            width: props.labelWidth ? props.labelWidth : ''
            , alignSelf: 'flex-start'
          }}>
            <p>{props.label}</p>
          </div>
        )}

        <div className='flex flex-col gap-[1rem]' style={{

          width: !props.label ? '100%' : width
        }}>

          <input
            style={{
              direction: props.direction ? props.direction : 'ltr',
              width: '100%'
            }}
            type={props.type || 'text'}
            placeholder={props.placeholder}
            value={props.name}
            required={props.required ? props.required : false}
            onChange={handleInputChange}
            onBlur={props.onBlur}
            name={props.inputName}
            onKeyDown={props.onKeyDown}
          />
          {props.error && <p className='input-error'>{props.error}</p>}
        </div>
      </div>
    </>
  );
};

export default MiniText;
