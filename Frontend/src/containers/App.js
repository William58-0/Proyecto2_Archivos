import React, { Component } from 'react';
import Home from '../components/Home';

// Administrador del Sistema
import AdminUsersHome from '../components/AdminSistema/AdminUsersHome';
import CargaMasiva from '../components/AdminSistema/CargaMasiva';
import AdminUsers from '../components/AdminSistema/AdminUsuarios/AdminUsers';
import CreateUser from '../components/AdminSistema/AdminUsuarios/CreateUser';
import EditUser from '../components/AdminSistema/AdminUsuarios/EditUser';

// Coordinador de Departamento
import CoordDepLogin from '../components/CoordDep/CoordDepLogin';
import CoordDepAprobados from '../components/CoordDep/Aprobados';
import CoordDepContratados from '../components/CoordDep/Contratados';

// Revisor de Expedientes
import RevisorLogin from '../components/Revisor/RevisorLogin';
import RevisorAplicantes from '../components/Revisor/Aplicantes';
import RevisorRevision from '../components/Revisor/Revision';
import RevisorVerExp from '../components/Revisor/VerExpediente';

// Aplicante
import AplicanteLogin from '../components/Aplicante/AplicanteLogin';
import AplicanteCorreccion from '../components/Aplicante/Correccion';
import AplicanteRevision from '../components/Aplicante/Revision';

// Guest
import GuestHome from '../components/Guest/GuestHome';
import GuestForm from '../components/Guest/Formulario';


import styled from 'styled-components';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Grafoo from '../components/cst';



const Container = styled.div`
  margin: 0 auto;
`;

class App extends Component {
  render() {
    return (
      <div style={{ backgroundColor: " rgb(45, 88, 138)" }}>
        <BrowserRouter>
          <Container >
            <Switch>
              <Redirect
                from="/home"
                to="/create"
              />
              <Route
                path="/"
                exact
                component={Home}
              />

              <Route
                path="/adminsistema/adminusershome"
                exact
                component={AdminUsersHome}
              />
              <Route
                path="/adminsistema/carga"
                exact
                component={CargaMasiva}
              />
              <Route
                path="/adminsistema/adminusershome/adminusers"
                exact
                component={AdminUsers}
              />
              <Route
                path="/adminsistema/adminusershome/createuser"
                exact
                component={CreateUser}
              />
              <Route
                path="/adminsistema/EditUser/:nombre"
                exact
                component={EditUser}
              />

              <Route
                path="/coorddep"
                exact
                component={CoordDepLogin}
              />
              <Route
                path="/coorddep/aprobados"
                exact
                component={CoordDepAprobados}
              />
              <Route
                path="/coorddep/contratados"
                exact
                component={CoordDepContratados}
              />

              <Route
                path="/revisor"
                exact
                component={RevisorLogin}
              />
              <Route
                path="/revisor/aplicantes"
                exact
                component={RevisorAplicantes}
              />
              <Route
                path="/revisor/revision"
                exact
                component={RevisorRevision}
              />
              <Route
                path="/revisor/revision/verexp"
                exact
                component={RevisorVerExp}
              />

              <Route
                path="/aplicante"
                exact
                component={AplicanteLogin}
              />
              <Route
                path="/aplicante/correccion"
                exact
                component={AplicanteCorreccion}
              />
              <Route
                path="/aplicante/revision"
                exact
                component={AplicanteRevision}
              />

              <Route
                path="/guest"
                exact
                component={GuestHome}
              />
              <Route
                path="/guest/form/:puesto/:departamento"
                exact
                component={GuestForm}
              />

              <Route
                path="/cst"
                exact
                component={Grafoo}
              />
              <Redirect to="/" />
            </Switch>
          </Container>
        </BrowserRouter>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default App;
