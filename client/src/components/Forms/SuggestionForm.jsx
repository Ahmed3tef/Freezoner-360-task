import React from 'react'
import { LargeText, MiniText } from '..'
import { unwrapResult } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// import { loginUser } from '../../store/reducers/auth';

// import './_forms.scss';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { createSuggestionCategory } from '../../store/reducers/category';

const SuggestionForm = () => {

  const location = useLocation();


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({

    initialValues: {
      title: '',
      description: '',
      employee: '',
    },
    validateOnMount: true
    ,
    validationSchema: YUP.object({
      title: YUP.string().required('title is required.').min(2, 'must be at least 2 characters'),
      description: YUP.string().required('description is required.').min(10, 'must be at least 10 characters'),
      employee: YUP.string().required('employee name is required.'),

    }),
    onSubmit: (values) => {
      const categoryId = location.state.categoryId;

      dispatch(
        createSuggestionCategory({
          data: {
            title: values.title,
            description: values.description,
            employee: values.employee,
          }, params: { categoryId }
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
    },
  })
  return (
    <div className='section p-[5rem] '>
      <h2 className='section-title mb-[2rem]'>Suggestion Request</h2>

      <form>
        <div className='form__input-container'>

          <MiniText name={formik.values.title} classes="mb-[3rem]" inputName='title' onBlur={formik.handleBlur} onChange={formik.handleChange} label='Title' error={formik.errors.title && formik.touched.title ? formik.errors.title : null} />

        </div>

        <div className='form__input-container'>

          <MiniText name={formik.values.employee} classes="mb-[3rem]" inputName='employee' onBlur={formik.handleBlur} onChange={formik.handleChange} label='Employee name' error={formik.errors.employee && formik.touched.employee ? formik.errors.employee : null} required={true} />

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

export default SuggestionForm