import React from 'react'
import './GetButton.scss';
import { BiChevronRight , BiChevronLeft } from "react-icons/bi";


export default function GetButton({clickFunction , direction }) {
  return (
    <button className={ `getButton getButton--${direction}`} onClick={clickFunction}>
      {
        direction === "left" ? 
        <BiChevronLeft className='getButton__left' />
        :
        <BiChevronRight className='getButton__right' />
      }
    </button>
  )
}
