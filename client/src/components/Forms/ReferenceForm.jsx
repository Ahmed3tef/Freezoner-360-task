import React, { useEffect, useState } from 'react'
import { ErrorCard, LargeText, MiniText, Spinner } from '..'
import { unwrapResult } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { loginUser } from '../../store/reducers/auth';

// import './_forms.scss';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { createReference } from '../../store/reducers/references';
import { loadReference } from '../../store/reducers/reference';


const ReferenceForm = () => {

  const { id } = useParams()


  const location = useLocation();
  const [file, setFile] = useState('')

  const [refState, setRefState] = useState()

  const { reference, isLoading, error } = useSelector(state => state.reference)


  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    if (id) dispatch(loadReference({ id }))
  }, [dispatch, id]);

  useEffect(() => {
    if (reference && id) setRefState(reference)
  }, [reference, id]);



  const formik = useFormik({

    initialValues: {
      title: refState?.title ?? '',
      description: refState?.description ?? '',
      author: refState?.author ?? '',
      reviewer: refState?.reviewer ?? '',
      referenceCode: refState?.referenceCode ?? '',

    },
    // validateOnMount: true,
    enableReinitialize: true,
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

        const categoryId = localStorage.getItem('categoryId')


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
    <>
      {id && isLoading && <Spinner />}

      {id && !isLoading && !reference && error &&
        <ErrorCard />
      }

      {/* no error no data */}
      {id && !isLoading && !error && !reference && <ErrorCard message='Unexpected Error Happened.' />}

      {id && !isLoading && !error && reference && <div className='section p-[5rem] '>
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

          <div className='form__input-container flex-center'>

            <input type='file' name='file' className="mb-[3rem]" onChange={(e) => setFile(e.target.files[0])} label='Employee name' required={true} />

          </div>
          <div className='form__input-container'>

            <LargeText desc={formik.values.description} classes="mb-[3rem]" inputName='description' onBlur={formik.handleBlur} onChange={formik.handleChange} label='Description' error={formik.errors.description && formik.touched.description ? formik.errors.description : null} required={true} />

          </div>

          <div className="flex-center gap-[5rem]">
            <button type="button" className="btn-delete" onClick={() => navigate(`/category/${location?.state?.categoryId ?? reference.categoryId}`)} >
              Cancel
            </button>

            <button type="button" onClick={formik.handleSubmit} className="btn-green  px-[2rem] py-[.8rem]">
              Save
            </button>

          </div>
        </form>
      </div>}
      {!id && <div className='section p-[5rem] '>
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

          <div className='form__input-container flex-center'>

            <input type='file' name='file' className="mb-[3rem]" onChange={(e) => setFile(e.target.files[0])} label='Employee name' required={true} />

          </div>
          <div className='form__input-container'>

            <LargeText desc={formik.values.description} classes="mb-[3rem]" inputName='description' onBlur={formik.handleBlur} onChange={formik.handleChange} label='Description' error={formik.errors.description && formik.touched.description ? formik.errors.description : null} required={true} />

          </div>

          <div className="flex-center gap-[5rem]">
            <button type="button" className="btn-delete" onClick={() => navigate(`/category/${location?.state?.categoryId ?? reference.categoryId}`)} >
              Cancel
            </button>

            <button type="button" onClick={formik.handleSubmit} className="btn-green  px-[2rem] py-[.8rem]">
              Add
            </button>

          </div>
        </form>
      </div>}
    </>
  )
}

export default ReferenceForm



