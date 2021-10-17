import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";

var arreglo = []



class CoordDepLogin extends React.Component {

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
      }).isRequired,
      staticContext: PropTypes.object
    }).isRequired
  };
  
  handleOnClick = () => {
    this.context.router.push('/');
  }

  


  render() {
    //this.AErrores()
    

    /*
    return (
      <div>
        <br /><br />
        <Link to="/">
          <button style={{ marginLeft: "2%"}} class="btn btn-success">
            Regresar
          </button>
        </Link>
        
        <br /><br />
        <br /><br />
        <form style={{ textAlign: "center", alignItems: "center", color: "white" }}>
          <h1 style={{ color: "white" }}>Iniciar Sesión como Coordinador de Departamento</h1>
          <label>
            Nombre de Usuario: <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" name="user" />
          </label><br />
          <label>
            Contraseña: <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="password" name="password" />
          </label><br />
          <br />
          
          <Button class="btn btn-info" onClick={this.setRedirect()}>Iniciar Sesión</Button><br /><br />
          
        </form>
        <br /><br />
        <br /><br />
        <br /><br />


      </div>
    );*/
   
  }

  
  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }
  render () {
    return (
       <div>
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Redirect</button>
       </div>
    )
  }


}

export default CoordDepLogin;