import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import plusIcon from '../../assets/images/add.svg'

import { ErrorCard, MiniText, ReferenceCard, Spinner } from '..';
import { loadReferences, loadSearchReferences } from '../../store/reducers/references';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import filterMenu from '../../assets/images/filter-menu.svg';

const References = ({ categoryId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('')

  const { references, isLoading, error } = useSelector(state => state.references)

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    dispatch(loadReferences({ categoryId }));
  }, []);

  const handleSearch = e => {
    // code of enter key
    dispatch(loadSearchReferences({
      categoryId,
      params: { keyword: searchValue }
    }))
  };

  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && !references && error &&
        <ErrorCard />
      }


      {!isLoading && !error && references && <div className='section'>

        <div className="flex justify-between items-center mb-[2rem] ml-[1rem] mt-[2rem] gap-[2rem] lg:gap-[5rem] flex-col lg:flex-row">

          <h2 className='section-title '>Prophetic Tradition References</h2>

          <div className="flex flex-1 justify-between ">

            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} placeholder={'Word , Reference Code , Author'} />

            <div className="cta flex justify-end items-center gap-[3rem] ml-[1rem]">
              <button type="button" className="btn-alt-green  px-[4rem] py-[1.7rem]" onClick={() => navigate(`/reference/${data._id}`)}>
                <img src={filterMenu} alt="filter menu" />
                Filter by
              </button>
              <button type="button" className="btn-green gap-[1rem]" onClick={() => navigate('/reference', {
                state: {
                  categoryId
                }
              })}>
                <img src={plusIcon} alt="plus" />  Add New
              </button>

            </div>
          </div>
        </div>

        {references?.map((e) => <ReferenceCard data={e} key={e._id} />)}
      </div>

      }
      {/* no error no data */}
      {!isLoading && !error && references?.length === 0 && <ErrorCard message='No data found.' />}

    </>
  )
}

export default References