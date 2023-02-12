import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteReferences } from '../../store/reducers/references';
import { unwrapResult } from '@reduxjs/toolkit';
import { loadCategory } from '../../store/reducers/category';
import recycleIcon from '../../assets/images/recycle.svg';
import eyeIcon from '../../assets/images/eye.svg';
import penIcon from '../../assets/images/pen.svg';
const ReferenceCard = ({ data }) => {

  const dispatch = useDispatch()

  const finalDate = new Date(
    data.createdAt
  ).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',

    hour: 'numeric',
    hour12: true,
  });

  const deleteHandler = () => {
    dispatch(deleteReferences({ id: data._id })).then(unwrapResult).then(promiseResponse => {

      if (promiseResponse.status === 'success') {
        dispatch(loadCategory({ id: data.categoryId }));
      }
    })
  }

  return (
    <div className='reference-card'>
      <div className="text">
        <h3>{data.title} </h3>
        <p>{data.description} </p>

        <div className="meta-data">
          <span>Author: {data.author}</span>
          <span>Date: {finalDate}</span>
          <span>Reviewed By: {data.reviewer}</span>
        </div>
      </div>
      <div className="cta">
        <button type="button" className="details">
          <img src={eyeIcon} alt="eye-icon" />
          <a href={data.file} target="_blank"
            rel="noreferrer">
            preview
          </a>
        </button>
        <button type="button" className="btn-alt-green">
          <img src={penIcon} alt="eye-icon" />
          Edit
        </button>
        <button type="button" className="btn-delete" onClick={deleteHandler}>
          <img src={recycleIcon} alt="eye-icon" />
          Delete
        </button>
      </div>
      <span className="code">Reference Code : {data.referenceCode}</span>
    </div>
  )
}

export default ReferenceCard