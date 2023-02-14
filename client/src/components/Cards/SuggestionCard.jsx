import React from 'react'
import { DateLine } from '..'
import { useNavigate } from 'react-router-dom'

const SuggestionCard = ({ data, categoryName }) => {

  const navigate = useNavigate();

  const handleNavigation = () => {
    localStorage.setItem('suggestionId', data._id);
    console.log(data._id);
    navigate(`/suggestion/${data._id}`);
  }

  return (
    <div className='suggestion-card'>
      <div className="text">
        <h3>{`"${data.title}" in "${categoryName}" Sent By "${data.employee}"`} </h3>
        <DateLine title='Suggested on :' date={data.date} />
      </div>
      <div className="cta">
        <button type="button" className="details"
          onClick={handleNavigation}
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default SuggestionCard