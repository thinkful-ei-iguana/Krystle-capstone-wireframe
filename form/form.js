import React from 'react'
import './NotefulForm.css'
import PropTypes from 'prop-types';

export default function Form(props) {
  const { className, ...otherProps } = props
  return (
    <form
      className={['Form', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}

Form.propTypes = {
  className: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}