import React from 'react'

const DateLine = ({ title, date }) => {

  const finalDate = new Date(
    date
  ).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',

    hour: 'numeric',
    hour12: true,
  });

  return (
    <p className='text-[2.2rem]'>{`${title} `}{finalDate}</p>
  )
}

export default DateLine