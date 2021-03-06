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
import CoordDepVerExp from '../components/CoordDep/VerExpediente';

// Revisor de Expedientes
import RevisorLogin from '../components/Revisor/RevisorLogin';
import RevisorAplicantes from '../components/Revisor/Aplicantes';
import RevisorRevision from '../components/Revisor/Revision';
import RevisorVerExp from '../components/Revisor/VerExpediente';
import RevisorMessenger from '../components/Revisor/RevisorMessenger';

// Aplicante
import AplicanteLogin from '../components/Aplicante/AplicanteLogin';
import AplicanteVerificacion from '../components/Aplicante/Verificacion';
import AplicanteCorreccion from '../components/Aplicante/Correccion';
import AplicanteRevision from '../components/Aplicante/Revision';
import AplicanteMessenger from '../components/Aplicante/AplicanteMessenger';

// Guest
import GuestHome from '../components/Guest/GuestHome';
import GuestForm from '../components/Guest/Formulario';

// CorreosGuest
import GuestLogin from '../components/CorreosGuest/GuestLogin';
import GuestMessenger from '../components/CorreosGuest/GuestMessenger';

// Reportes
import Organigrama from '../components/Reportes/Organigrama';
import Planilla from '../components/Reportes/Planilla';
import Top5Contratadas from '../components/Reportes/Top5Contratadas';
import Top5InvRev from '../components/Reportes/Top5InvRev';
import Top5DocsRechAp from '../components/Reportes/Top5DocsRechAp';
import Top5UsoCapDep from '../components/Reportes/Top5UsoCapDep';

import styled from 'styled-components';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

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
                path="/coorddep/aprobados/:departamento/:coordinador"
                exact
                component={CoordDepAprobados}
              />
              <Route
                path="/coorddep/contratados/:departamento/:coordinador"
                exact
                component={CoordDepContratados}
              />
              <Route
                path="/coorddep/contratados/verExp/:coordinador/:dpi/:departamento"
                exact
                component={CoordDepVerExp}
              />

              <Route
                path="/revisor"
                exact
                component={RevisorLogin}
              />
              <Route
                path="/revisor/aplicantes/:revisor"
                exact
                component={RevisorAplicantes}
              />
              <Route
                path="/revisor/revision/:revisor"
                exact
                component={RevisorRevision}
              />
              <Route
                path="/revisor/revision/verExp/:revisor/:dpi/:departamento/:puesto"
                exact
                component={RevisorVerExp}
              />
              <Route
                path="/revisor/messenger/:revisor"
                exact
                component={RevisorMessenger}
              />
              <Route
                path="/revisor/messenger/:revisor/:receptor"
                exact
                component={RevisorMessenger}
              />

              <Route
                path="/aplicante"
                exact
                component={AplicanteLogin}
              />
              <Route
                path="/aplicante/verificacion/:dpi/:departamento/:puesto"
                exact
                component={AplicanteVerificacion}
              />
              <Route
                path="/aplicante/revision/:dpi/:departamento/:puesto"
                exact
                component={AplicanteRevision}
              />
              <Route
                path="/aplicante/correccion/:dpi/:departamento/:puesto"
                exact
                component={AplicanteCorreccion}
              />
              <Route
                path="/aplicante/messenger/:dpi/:departamento/:puesto/:revisor"
                exact
                component={AplicanteMessenger}
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
                path="/guestLogin"
                exact
                component={GuestLogin}
              />
              <Route
                path="/guestLogin/messenger/:dpi"
                exact
                component={GuestMessenger}
              />

              <Route
                path="/reportes/organigrama"
                exact
                component={Organigrama}
              />
              <Route
                path="/reportes/planilla"
                exact
                component={Planilla}
              />
              <Route
                path="/reportes/top5contratadas"
                exact
                component={Top5Contratadas}
              />
              <Route
                path="/reportes/top5invrev"
                exact
                component={Top5InvRev}
              />
              <Route
                path="/reportes/top5docsrechap"
                exact
                component={Top5DocsRechAp}
              />
              <Route
                path="/reportes/top5usocapdep"
                exact
                component={Top5UsoCapDep}
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
