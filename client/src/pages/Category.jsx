import React, { useEffect } from 'react'
import { ErrorCard, References, Spinner, Suggestions } from '../components'
import { loadCategory } from '../store/reducers/category'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Category = () => {

  const dispatch = useDispatch()

  const { category, isLoading, error } = useSelector(state => state.category)

  const { id } = useParams()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    dispatch(loadCategory({ id }));
  }, []);

  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && !category && error &&
        <ErrorCard />
      }

      {/* no error no data */}
      {!isLoading && !error && !category && <ErrorCard message='No data found.' />}


      {!isLoading && !error && category && <div className='flex flex-col gap-[1.2rem]'>
        {category?.suggestions?.length > 0 && <Suggestions data={category.suggestions} categoryName={category?.name} categoryId={id} />}

        {id && <References categoryId={id} />}

      </div>}
    </>
  )
}

export default Category