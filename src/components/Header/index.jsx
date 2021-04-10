import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import {
  CHeader,
  CContainer,
  CToggler,
  CSubheader,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CImg,
} from '@coreui/react';

export default function Header() {
  const [descriptionNavigatePage, setDescriptionNavigatePage] = useState('');

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
    dispatch({ type: 'set', sidebarShow: val });
  };

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
    dispatch({ type: 'set', sidebarShow: val });
  };

  let history = useHistory();

  useEffect(() => {
    history !== '/user'
      ? setDescriptionNavigatePage('List')
      : setDescriptionNavigatePage('Create');
  }, [history]);

  return (
    <CHeader withSubheader className="home-container align-items-center bg-purple">
      <CContainer fluid className="d-flex align-items-center">
        <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />

        <Link to="/home">
          <h2 className="text-white font-weight-bold mt-1">Ciatécnica challenge</h2>
        </Link>
      </CContainer>
      <CSubheader className="mt-0 border-0 bg-purple">
        <CContainer fluid>
          <CHeaderNav>
            <span className="d-md-down-none text-white">Navigation</span>
            <CToggler inHeader className="d-md-down-none p-0" onClick={toggleSidebar} />
            <div className="d-flex w-100 justify-content-between">
              <CHeaderNavItem className="px-3">
                <CHeaderNavLink to="/user" className="text-white">
                  Users
                </CHeaderNavLink>
              </CHeaderNavItem>
              <CHeaderNavItem className="px-3 text-white">
                <Link to="/home">
                  <CImg src="/icons/home.svg" className="cursor-ponter mr-2" />
                </Link>
                / Users / {descriptionNavigatePage}
              </CHeaderNavItem>
            </div>
          </CHeaderNav>
        </CContainer>
      </CSubheader>
    </CHeader>
  );
}
