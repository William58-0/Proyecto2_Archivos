import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// un Login
const Container = styled.div`
width: 100%;
height: 600px;
box-sizing: border-box;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
color:white
`;

class cst extends React.Component {
    render() {
        return (
            <Container>     
            <form name="login"  style={{textAlign:"center", alignItems:"center"}}>
            <h1 style={{color:"white"}}>Iniciar Sesión</h1>   
            <label>
            Usuario: <input style={{marginLeft:"2%", marginBottom:"2%"}} type="text" name="user" />
            </label><br/>
            <label>
            Contraseña: <input style={{marginLeft:"2%", marginBottom:"2%"}} type="password" name="password" />
            </label><br/><br/>

            <button class="btn btn-info" onClick={() => { this.Ejecutar() }}>Iniciar Sesion</button><br/><br/>
            
            <Link style={{color: "white"}}to="/createuser">¿Aun no tienes cuenta?</Link><br/>
            </form>

            </Container>
        );
    }

    Ejecutar() {
        console.log("valores")
    }
}

export default cst;