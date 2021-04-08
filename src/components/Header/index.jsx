import React from 'react';
import { CHeader, CContainer } from '@coreui/react';

export default function Header() {
  return (
    <CHeader fixed={false} className="align-items-center">
      <CContainer fluid>
        <h2 className="text-muted font-weight-bold">Ciatécnica challenge</h2>
      </CContainer>
    </CHeader>
  );
}
