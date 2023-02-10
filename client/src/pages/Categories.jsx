import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories } from '../store/reducers/categories';
import { CategoryCard, ErrorCard, Spinner } from '../components';

const Categories = () => {
  const dispatch = useDispatch()

  const { categories, isLoading, error } = useSelector(state => state.categories)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    dispatch(loadCategories());
  }, []);

  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && !categories && error &&
        <ErrorCard />
      }

      {/* no error no data */}
      {!isLoading && !error && categories?.length === 0 && <ErrorCard message='No data found.' />}


      {!isLoading && !error && categories && <div className='categories-layout'>
        {categories.map((category, i) => <CategoryCard key={i} category={category} />)}
      </div>}
    </>

  )
}

export default Categories