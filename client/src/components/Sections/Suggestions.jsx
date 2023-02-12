import React from 'react'
import { SuggestionCard } from '..'
import { useNavigate } from 'react-router-dom'
import plusIcon from '../../assets/images/add.svg'
const Suggestions = ({ data, categoryName, categoryId }) => {
  const navigate = useNavigate();
  return (
    <div className='section'>
      <h2 className='section-title mb-[2rem] ml-[4rem] mt-[2rem]'>Pending Suggestions Requests</h2>
      <div className="cta flex justify-end">
        <button type="button" className="btn-green gap-[1rem]" onClick={() => navigate('/suggestion', {
          state: {
            categoryId
          }
        })}>
          <img src={plusIcon} alt="plus" /> Add suggestion
        </button>
      </div>
      {data.map(e => <SuggestionCard data={e} key={e._id} categoryName={categoryName} />)}
    </div>
  )
}

export default Suggestions