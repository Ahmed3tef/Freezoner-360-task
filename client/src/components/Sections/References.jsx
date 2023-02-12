import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import plusIcon from '../../assets/images/add.svg'

import { ErrorCard, MiniText, ReferenceCard, Spinner } from '..';
import { loadReferences, loadSearchReferences } from '../../store/reducers/references';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
const References = ({ categoryId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('')

  const { references, isLoading, error } = useSelector(state => state.references)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

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

        <div className="flex justify-between items-center mb-[2rem] ml-[4rem] mt-[2rem]">

          <h2 className='section-title '>Prophetic Tradition References</h2>
          {/* 
          <div className='form__input-container flex-1  max-w-[50%]'>


            <MiniText name={searchValue} inputName='search' placeholder='Word , Reference Code , Author' setName={setSearchValue} onKeyDown={handleSearchOnEnter} />

          </div> */}
          <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} />

          <div className="cta flex justify-end items-center">
            <button type="button" className="btn-green gap-[1rem]" onClick={() => navigate('/reference', {
              state: {
                categoryId
              }
            })}>
              <img src={plusIcon} alt="plus" />  Add Reference
            </button>

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