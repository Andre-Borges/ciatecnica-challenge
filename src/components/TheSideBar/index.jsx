import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSidebar, CSidebarNav, CImg } from '@coreui/react';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
      className="bg-purple"
    >
      <CSidebarNav>
        <CImg src="/icons/users.svg" className="mx-auto mt-5 w-25" />
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
