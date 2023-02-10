import React, { useState } from 'react'
import { LargeText, MiniText } from '..'
import { unwrapResult } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// import { loginUser } from '../../store/reducers/auth';

// import './_forms.scss';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { createReference } from '../../store/reducers/references';


const ReferenceForm = () => {

  const location = useLocation();
  const [file, setFile] = useState('')




  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({

    initialValues: {
      title: '',
      description: '',
      author: '',
      reviewer: '',
      referenceCode: '',

    },
    validateOnMount: true
    ,
    validationSchema: YUP.object({
      title: YUP.string().required('title is required.').min(2, 'must be at least 2 characters'),
      description: YUP.string().required('description is required.').min(10, 'must be at least 10 characters'),
      author: YUP.string().required('author is required.').min(2, 'must be at least 2 characters'),
      reviewer: YUP.string().required('reviewer is required.').min(2, 'must be at least 2 characters'),
      referenceCode: YUP.number().required('reference code is required.').min(2, 'must be at least 2 characters'),


    }),
    onSubmit: (values) => {

      if (!file) return false;

      if (file) {
        const categoryId = location.state.categoryId;


        const fd = new FormData();
        fd.append('title', values.title);
        fd.append('description', values.description);
        fd.append('author', values.author);
        fd.append('reviewer', values.reviewer);
        fd.append('referenceCode', values.referenceCode);
        fd.append('file', file);

        dispatch(
          createReference({
            params: { categoryId },
            data: fd
          })
        )
          .then(unwrapResult)
          .then(promiseResponse => {
            // console.log(promiseResponse);
            if (promiseResponse.status === 'success') {
              formik.resetForm()
              navigate(`/category/${categoryId}`);
            }
          });
      }
    },
  })


  return (
    <div className='section p-[5rem] '>
      <h2 className='section-title mb-[2rem]'>Add New Reference</h2>

      <form>
        <div className='form__input-container'>

          <MiniText name={formik.values.title} classes="mb-[3rem]" inputName='title' onBlur={formik.handleBlur} onChange={formik.handleChange} label='Title' error={formik.errors.title && formik.touched.title ? formik.errors.title : null} required={true} />

        </div>

        <div className='form__input-container'>

          <MiniText name={formik.values.author} classes="mb-[3rem]" inputName='author' onBlur={formik.handleBlur} onChange={formik.handleChange} label='author name' error={formik.errors.author && formik.touched.author ? formik.errors.author : null} required={true} />

        </div>
        <div className='form__input-container'>

          <MiniText name={formik.values.reviewer} classes="mb-[3rem]" inputName='reviewer' onBlur={formik.handleBlur} onChange={formik.handleChange} label='reviewer name' error={formik.errors.reviewer && formik.touched.reviewer ? formik.errors.reviewer : null} required={true} />

        </div>

        <div className='form__input-container'>

          <MiniText name={formik.values.referenceCode} classes="mb-[3rem]" inputName='referenceCode' onBlur={formik.handleBlur} onChange={formik.handleChange} label='reference code' error={formik.errors.referenceCode && formik.touched.referenceCode ? formik.errors.referenceCode : null} required={true} />

        </div>

        <div className='form__input-container justify-end'>

          <input type='file' name='file' className="mb-[3rem]" onChange={(e) => setFile(e.target.files[0])} label='Employee name' required={true} />

        </div>
        <div className='form__input-container'>

          <LargeText name={formik.values.description} classes="mb-[3rem]" inputName='description' onBlur={formik.handleBlur} onChange={formik.handleChange} label='Description' error={formik.errors.description && formik.touched.description ? formik.errors.description : null} required={true} />

        </div>

        <div className="flex-center gap-[5rem]">
          <button type="button" className="btn-delete" onClick={() => navigate(`/category/${location.state.categoryId}`)} >
            Cancel
          </button>

          <button type="button" onClick={formik.handleSubmit} className="btn-green  px-[2rem] py-[.8rem]">
            Save
          </button>

        </div>
      </form>
    </div>
  )
}

export default ReferenceForm



