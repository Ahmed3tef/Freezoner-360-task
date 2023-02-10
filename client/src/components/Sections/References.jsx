import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { ErrorCard, ReferenceCard, Spinner } from '..';
import { loadReferences } from '../../store/reducers/references';
import { useNavigate } from 'react-router-dom';
const References = ({ categoryId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { references, isLoading, error } = useSelector(state => state.references)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    dispatch(loadReferences({ categoryId }));
  }, []);
  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && !references && error &&
        <ErrorCard />
      }

      {/* no error no data */}
      {!isLoading && !error && references?.length === 0 && <ErrorCard message='No data found.' />}

      {!isLoading && !error && references && <div className='section'>

        <h2 className='section-title mb-[2rem] ml-[4rem] mt-[2rem]'>Prophetic Tradition References</h2>

        <div className="cta flex justify-end">
          <button type="button" className="btn-green" onClick={() => navigate('/reference', {
            state: {
              categoryId
            }
          })}>
            Add Reference
          </button>

        </div>

        {references?.map((e) => <ReferenceCard data={e} key={e._id} />)}
      </div>
      }
    </>
  )
}

export default References