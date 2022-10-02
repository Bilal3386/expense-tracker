import React from 'react'
import HeaderCartButton from './HeaderCartButton'
import classes from './Header.module.css'

const Header = props => {
  return (
    <section className={classes.header}>
        <h2>Welcome to Expense Tracker!!!</h2>
        <HeaderCartButton onClick={props.onShowCart}/>
    </section>
  )
}

export default Header