import React from 'react'

const Filter = ({onChange}) => {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input type="text" onChange={onChange} />
    </div>
  )
}

export default Filter
