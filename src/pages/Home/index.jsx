import React, { useState } from 'react';
import { CContainer, CDataTable, CBadge } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';

export default function Home() {
  const usersData = [
    {
      id: 1,
      name: 'Leticia Lopes',
      username: 'leticia.lopes',
      profile: 'Office Support',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Maycon Cruz',
      username: 'maycon.cruz',
      profile: 'Business Contact',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Tiago Tapparo',
      username: 'tiago.tapparo',
      profile: 'Driver',
      status: 'Inactive',
    },
  ];

  const [details, setDetails] = useState([]);
  // const [items, setItems] = useState(usersData)

  const fields = [
    { key: 'name', _style: { width: '30%' } },
    { key: 'username', _style: { width: '25%' } },
    { key: 'profile', _style: { width: '25%' } },
    { key: 'status', _style: { width: '10%' } },
    { key: 'actions', _style: { width: '10%' } },
  ];

  const getBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'secondary';
      case 'Pending':
        return 'warning';
      case 'Banned':
        return 'danger';
      default:
        return 'primary';
    }
  };

  return (
    <CContainer fluid className="home-container">
      <CDataTable
        items={usersData}
        fields={fields}
        tableFilter
        hover
        sorter
        pagination={{
          doubleArrows: false,
          previousButton: 'Previous',
          nextButton: 'Next',
          align: 'end',
        }}
        scopedSlots={{
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          actions: (item, index) => {
            return (
              <td className="py-2">
                <CIcon name="edit" size={'sm'}></CIcon>
              </td>
            );
          },
        }}
      />
    </CContainer>
  );
}
