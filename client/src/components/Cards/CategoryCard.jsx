import React from 'react'
import arrowRight from '../../assets/images/arrow-right.svg'
import catIcon from '../../assets/images/cat-icon.svg'
import { useNavigate } from 'react-router-dom'
import { DateLine } from '..'

const CategoryCard = ({ category }) => {
  const navigate = useNavigate()



  return (
    <div className='category-card'>
      <div className="title">

        <img src={catIcon} alt={category.name} className="category-icon" />

        <h2>{category.name}</h2>
        {category.suggestions?.length > 0 && <div className='badge'>
          {category.suggestions.length} Pending Suggestions
        </div>
        }
      </div>
      <div className="text flex flex-col pl-[7rem] text-[2.2rem] gap-[2rem]">
        {category.referenceCount && <p>{category.referenceCount} Reference</p>}
        <DateLine title='Last Upate:' date={category.updatedAt} />

      </div>
      <div className="cta" onClick={() => navigate(`/category/${category._id}`)}>
        <span>Open</span>
        <img src={arrowRight} alt="arrow" />
      </div>
    </div>
  )
}

export default CategoryCard