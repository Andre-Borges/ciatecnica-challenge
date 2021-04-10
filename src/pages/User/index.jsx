import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';
import InputMask from 'react-input-mask';

import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CInputRadio,
  CCard,
  CCardBody,
  CSelect,
  CCardFooter,
  CButton,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react';

import { Link } from 'react-router-dom';

const initialUser = {
  id: '',
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  phone: '',
  mobile: '',
  password: '',
  confirm_password: '',
  expire: '',
  expire_date: '',
  status: '',
  profile: '',
  company: '',
};

export default function User() {
  /* Verifica se tem id, se tiver é modo de edição */
  const { id } = useParams();
  /* Recurso para navegar entre as telas */
  const { push } = useHistory();
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [isExpireDateVisible, setExpireDataVisible] = useState(false);

  async function getUserById(id) {
    try {
      const request = await api.get(`/users/${id}`);
      setUser(request.data);
      if (request.data.expire === 'yes') {
        setExpireDataVisible(true);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }

  /* Busco as informações dos users quando for edição */
  useEffect(() => {
    if (id) {
      getUserById(id);
      setEdit(true);
    }
  }, [id]);

  function onOptionChange(e) {
    if (e.target.value === 'yes') {
      setExpireDataVisible(true);
    } else {
      setExpireDataVisible(false);
    }

    isExpireDateVisible
      ? setUser({ ...user, expire: e.target.value })
      : setUser({ ...user, expire: e.target.value, expire_date: '' });
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(e) {
    let request = null;
    if (edit) {
      request = await api
        .put(`/users/${id}`, {
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          mobile: user.mobile,
          password: user.password,
          expire: user.expire,
          expire_date: user.expire_date,
          status: user.status,
          profile: user.profile,
          company: user.company,
        })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          return err.response;
        });
    } else {
      request = await api
        .post('/users', {
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          mobile: user.mobile,
          password: user.password,
          expire: user.expire,
          expire_date: user.expire_date,
          status: user.status,
          profile: user.profile,
          company: user.company,
        })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          return err.response;
        });
    }
    /* Se deu sucesso */
    if (request.status === 200 || request.status === 201) {
      alert('Sucesso');
      console.log(request.data.id);
      request.status === 201 && push(`/user/${request.data.id}`);
    } else {
      alert('Erro: ' + request.data.message);
    }
  }

  return (
    <CContainer fluid className="mt-4 registry-container">
      <CRow>
        <CCol sm="12">
          <CTabs activeTab="user">
            <CNav variant="tabs" className="border-bottom-0 ml-5">
              <CNavItem>
                <CNavLink data-tab="user" className="border border-dark text-dark">
                  User Registry
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  data-tab="profile"
                  className={`border border-dark text-dark ${!edit && 'disabled'}`}
                >
                  Profile
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="user">
                <CCard>
                  <CCardBody>
                    <CForm className="form-horizontal">
                      <CFormGroup row className="align-items-md-baseline">
                        <CCol md="2" className="text-md-right">
                          <CLabel htmlFor="username">Username</CLabel>
                        </CCol>
                        <CCol xs="12" md="4">
                          <CInput
                            type="text"
                            id="username"
                            name="username"
                            value={user.username}
                            onChange={(e) => handleOnChange(e)}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row className="align-items-md-baseline">
                        <CCol md="2" className="text-md-right">
                          <CLabel htmlFor="first_name">Full name</CLabel>
                        </CCol>
                        <CCol xs="12" md="4">
                          <CInput
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="First name"
                            value={user.first_name}
                            onChange={(e) => handleOnChange(e)}
                          />
                        </CCol>
                        <CCol xs="12" md="4">
                          <CInput
                            className="mt-3 mt-md-0"
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="Last name"
                            value={user.last_name}
                            onChange={(e) => handleOnChange(e)}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row className="align-items-md-baseline">
                        <CCol md="2" className="text-md-right">
                          <CLabel htmlFor="email">E-mail Address</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                          <CInput
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={(e) => handleOnChange(e)}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row className="align-items-md-baseline">
                        <CCol md="2" className="text-md-right">
                          <CLabel htmlFor="phone">Phone Number</CLabel>
                        </CCol>
                        <CCol xs="12" md="2">
                          <InputMask
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            mask="(99) 99999-9999"
                            value={user.phone}
                            onChange={(e) => handleOnChange(e)}
                          />
                        </CCol>
                        <CCol md="3" className="text-md-right mt-3 mt-md-0">
                          <CLabel htmlFor="mobile">Mobile Phone</CLabel>
                        </CCol>
                        <CCol xs="12" md="3">
                          <InputMask
                            type="text"
                            className="form-control"
                            id="mobile"
                            name="mobile"
                            mask="(99) 9999-9999"
                            value={user.mobile}
                            onChange={(e) => handleOnChange(e)}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row className="align-items-md-baseline">
                        <CCol md="2" className="text-md-right">
                          <CLabel htmlFor="password">Password</CLabel>
                        </CCol>
                        <CCol xs="12" md="6">
                          <CInput
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            value={user.password}
                            onChange={(e) => handleOnChange(e)}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row className="align-items-md-baseline">
                        <CCol md="2" className="text-md-right">
                          <CLabel htmlFor="confirm_password">Confirm Password</CLabel>
                        </CCol>
                        <CCol xs="12" md="6">
                          <CInput
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            autoComplete="new-password"
                            value={user.confirm_password}
                            onChange={(e) => handleOnChange(e)}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row className="align-items-md-baseline">
                        <CCol md="2" className="text-md-right">
                          <CLabel>Expire</CLabel>
                        </CCol>
                        <CCol md="2">
                          <CFormGroup variant="custom-radio" inline>
                            <CInputRadio
                              custom
                              id="expire-radio-yes"
                              name="inline-radios"
                              value="yes"
                              checked={user.expire === 'yes'}
                              onChange={(e) => onOptionChange(e)}
                            />
                            <CLabel variant="custom-checkbox" htmlFor="expire-radio-yes">
                              Yes
                            </CLabel>
                          </CFormGroup>
                          <CFormGroup variant="custom-radio" inline>
                            <CInputRadio
                              custom
                              id="expire-radio-never"
                              name="inline-radios"
                              value="never"
                              checked={user.expire === 'never'}
                              onChange={(e) => onOptionChange(e)}
                            />
                            <CLabel
                              variant="custom-checkbox"
                              htmlFor="expire-radio-never"
                            >
                              Never
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                        <CCol
                          md="1"
                          className={`text-md-right mt-3 mt-md-0 ${
                            isExpireDateVisible ? '' : 'd-none'
                          }`}
                        >
                          <CLabel htmlFor="expire-date">Expire Date</CLabel>
                        </CCol>
                        <CCol
                          xs="12"
                          md="3"
                          className={isExpireDateVisible ? '' : 'd-none'}
                        >
                          <CInput
                            type="date"
                            id="expire_date"
                            name="expire_date"
                            placeholder="date"
                            value={user.expire_date}
                            onChange={(e) => handleOnChange(e)}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row className="align-items-md-baseline">
                        <CCol md="2" className="text-md-right">
                          <CLabel htmlFor="status">Status</CLabel>
                        </CCol>
                        <CCol xs="12" md="2">
                          <CSelect
                            custom
                            name="status"
                            id="status"
                            value={user.status}
                            onChange={(e) => handleOnChange(e)}
                          >
                            <option value="0">Please select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                    </CForm>
                  </CCardBody>
                  <CCardFooter className="border-0 d-flex justify-content-end">
                    <Link to="/home">
                      <CButton
                        type="submit"
                        size="sm"
                        className="border border-dark font-weight-bold"
                      >
                        Cancel
                      </CButton>
                    </Link>

                    <CButton
                      type="submit"
                      size="sm"
                      color="warning"
                      className="border border-dark text-white font-weight-bold mr-5 ml-3"
                      onClick={() => handleSubmit()}
                    >
                      Save
                    </CButton>
                  </CCardFooter>
                </CCard>
              </CTabPane>
              <CTabPane data-tab="profile">
                <CCard>
                  <CCardBody>
                    <CForm action="" method="post" className="form-horizontal">
                      <CFormGroup row className="align-items-md-baseline">
                        <CCol md="2" className="text-md-right">
                          <CLabel>Username</CLabel>
                        </CCol>
                        <CCol xs="12" md="4">
                          <CInput
                            type="text"
                            name="username"
                            disabled
                            value={user.username}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row className="align-items-md-baseline">
                        <CCol md="2" className="text-md-right">
                          <CLabel>Full name</CLabel>
                        </CCol>
                        <CCol xs="12" md="4">
                          <CInput
                            type="text"
                            name="first-name"
                            disabled
                            value={user.first_name}
                          />
                        </CCol>
                        <CCol xs="12" md="4">
                          <CInput
                            className="mt-3 mt-md-0"
                            type="text"
                            name="last-name"
                            disabled
                            value={user.last_name}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row className="align-items-md-baseline">
                        <CCol md="2" className="text-md-right">
                          <CLabel htmlFor="profile">Profile</CLabel>
                        </CCol>
                        <CCol xs="12" md="2">
                          <CSelect
                            custom
                            name="profile"
                            id="profile"
                            value={user.profile}
                            onChange={(e) => handleOnChange(e)}
                          >
                            <option value="0">Please select</option>
                            <option value="Owner">Owner</option>
                            <option value="Driver">Driver</option>
                            <option value="Office">Office</option>
                          </CSelect>
                        </CCol>
                        <CCol md="1" className="text-md-right mt-3 mt-md-0">
                          <CLabel htmlFor="company">Company</CLabel>
                        </CCol>
                        <CCol xs="12" md="2">
                          <CSelect
                            custom
                            name="company"
                            id="company"
                            value={user.company}
                            onChange={(e) => handleOnChange(e)}
                          >
                            <option value="0">Please select</option>
                            <option value="Company 1">Company 1</option>
                            <option value="Company 2">Company 2</option>
                            <option value="Company 3">Company 3</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                    </CForm>
                  </CCardBody>
                  <CCardFooter className="border-0 d-flex justify-content-end">
                    <Link to="/home">
                      <CButton
                        type="submit"
                        size="sm"
                        className="border border-dark font-weight-bold"
                      >
                        Cancel
                      </CButton>
                    </Link>

                    <CButton
                      type="submit"
                      size="sm"
                      color="warning"
                      className="border border-dark text-white font-weight-bold mr-5 ml-3"
                      onClick={() => handleSubmit()}
                    >
                      Save
                    </CButton>
                  </CCardFooter>
                </CCard>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCol>
      </CRow>
    </CContainer>
  );
}
