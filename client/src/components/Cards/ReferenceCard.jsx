import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteReferences } from '../../store/reducers/references';
import { unwrapResult } from '@reduxjs/toolkit';
import { loadCategory } from '../../store/reducers/category';
import { APIBase } from '../../store/reducers/api';

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
          <a href={data.file} target="_blank"
            rel="noreferrer">
            preview
          </a>
        </button>
        <button type="button" className="details">
          Edit
        </button>
        <button type="button" className="btn-delete" onClick={deleteHandler}>
          Delete
        </button>
      </div>
      <span className="code">Reference Code : {data.referenceCode}</span>
    </div>
  )
}

export default ReferenceCard