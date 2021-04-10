import React, { useState, useEffect } from 'react';
import {
  CContainer,
  CDataTable,
  CBadge,
  CImg,
  CButton,
  CRow,
  CCol,
  CSelect,
  CLabel,
  CInput,
} from '@coreui/react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Home() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const response = await api.get('/users');
    setUsers(response.data);
  }

  async function deleteUser(user) {
    // Apenas atualiza o status para inativo
    const request = await api
      .put(`/users/${user.id}`, {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        mobile: user.mobile,
        password: user.password,
        expire: user.expire,
        expire_date: user.expire_date,
        status: 'Inactive',
        profile: user.profile,
        company: user.company,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });

    if (request.status === 200) {
      alert('Usuário inativado com sucesso');
      const arrayUsersUpdate = [];
      arrayUsersUpdate.push(...users);

      const index = arrayUsersUpdate.findIndex((item) => item.id === user.id);
      arrayUsersUpdate[index].status = 'Inactive';

      setUsers(arrayUsersUpdate);
    } else {
      alert('Erro ao inativar usuário');
    }
  }

  /* Busco todas as informações dos navers quando o componente é criado */
  useEffect(() => {
    try {
      getUsers();
    } catch (error) {
      console.log('error: ', error);
    }
  }, []);

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
      default:
        return 'primary';
    }
  };

  return (
    <CContainer fluid className="home-container mt-4">
      <CRow className="mb-3 align-items-center">
        <CCol md="4">
          <Link to="/user">
            <CButton color="warning border border-dark text-white font-weight-bold">
              + Add
            </CButton>
          </Link>
        </CCol>
        <CCol md="1" className="text-md-right align-self-end mt-4 mt-md-0">
          <CLabel htmlFor="select">Status</CLabel>
        </CCol>
        <CCol md="3" className="d-flex">
          <CSelect custom name="status" id="status">
            <option value="0">Please select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Banned">Banned</option>
          </CSelect>
          <CImg src="/icons/filter.svg" className="ml-3" />
        </CCol>
        <CCol md="4" className="mt-4 mt-md-0">
          <CInput type="text" id="expire_date" name="expire_date" placeholder="Search" />
        </CCol>
      </CRow>

      <CDataTable
        items={users}
        fields={fields}
        hover
        sorter
        pagination={{
          doubleArrows: false,
          previousButton: 'Previous',
          nextButton: 'Next',
          align: 'end',
        }}
        scopedSlots={{
          name: (item) => (
            <td>
              {item.first_name} {item.last_name}
            </td>
          ),
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          actions: (item, index) => {
            return (
              <td>
                <Link to={`/user/${encodeURIComponent(item.id)}`}>
                  <CImg src="/icons/edit.svg" className="cursor-ponter" />
                </Link>
                <CImg
                  src="/icons/remove.svg"
                  className={`ml-3 cursor-ponter ${item.status !== 'Active' && 'd-none'}`}
                  onClick={() => deleteUser(item)}
                />
              </td>
            );
          },
        }}
      />
    </CContainer>
  );
}
