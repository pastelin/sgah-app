import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMenuSelected } from '../../store/sgah/sgahSlice';

export const NavBarItem = ({ menuItem }) => {

  return (
		<div className="nav__item">
          <a href="#">{ menuItem }</a>
		</div>
  );
}
