import React from 'react'
import classes from './HeaderCartButton.module.css'


const HeaderCartButton = props => {
  return (
    <div className={classes['header-button']}>
    <button onClick={props.onClick}>You Profile is incomplete. <span>Complete now</span></button>
    </div>
  )
}

export default HeaderCartButton