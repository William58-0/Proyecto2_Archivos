import React, { useState, useEffect } from 'react'
import { getUsuarios } from '../../../utils/api';
import { eliminarusuario } from '../../../utils/api';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";


var arreglo = []

const Table = () => {
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await getUsuarios()
        console.log(response)
        setUsuarios(response.data)
    }

    const deleteData = (NOMBRE) => {
        var nuevo = []
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].NOMBRE == NOMBRE) {
                var obj = usuarios[i]
                obj.FECHAFIN = "ahorita"
                nuevo.push(obj)
            } else {
                nuevo.push(usuarios[i])
            }
        }
        setUsuarios(nuevo)
        eliminarusuario()
        .then(res => {
          console.log(res)
        })
        .catch((err) => console.log(err));
        //const del = usuarios.filter(usuario => NOMBRE !== usuario.NOMBRE)
    }

    const renderHeader = () => {
        let headerElement = ['NOMBRE', 'ESTADO', 'FECHAINICIO', 'FECHAFIN', 'TIPO', 'ELIMINAR', 'EDITAR']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return usuarios.map(({ NOMBRE, ESTADO, FECHAINICIO, FECHAFIN, TIPO }) => {
            return (
                <tr key={NOMBRE}>
                    <td>{NOMBRE}</td>
                    <td>{ESTADO}</td>
                    <td>{FECHAINICIO}</td>
                    <td>{FECHAFIN}</td>
                    <td>{TIPO}</td>
                    <td className='opration'>
                        <Button className='button' variant="danger" onClick={() => deleteData(NOMBRE)}>Eliminar</Button>
                    </td>
                    <td className='opration'>
                        <Link to={'/adminsistema/EditUser/' + NOMBRE}>
                            <button class="btn btn-info">
                                Editar
                            </button>
                        </Link>
                    </td>

                </tr>
            )
        })
    }

    return (
        <>
            <br />
            <Link to="/adminsistema/adminusershome">
                <button style={{ marginLeft: "2%" }} class="btn btn-success">
                    Regresar
                </button>
            </Link><br /><br />

            <div style={{ textAlign: "center", color: "white" }}>
                Filtros:
                <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Nombre" name="user" />
                <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Estado" name="user" />
                <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Fecha Inicio" name="user" />
                <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Fecha FIn" name="user" />
                <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Rol" name="user" />
                <br />
                <button class="btn btn-success" style={{ marginLeft: "2%" }}>
                    <i>Filtrar</i>
                </button>
                <button class="btn btn-info" style={{ marginLeft: "2%" }}>
                    <i>Quitar Filtros</i>
                </button>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <form style={{
                        margin: "auto",
                        backgroundColor: "#4884af",
                        marginTop: "2%",
                        width: "auto",
                        padding: "2%",
                        borderRadius: "2%",
                        color: "white"
                    }}>
                        <h1 style={{ textAlign: "center" }}>Usuarios</h1>
                        <table class="table table-sm table-hover" >
                            <thead class="tblsimbolos">
                                <tr>{renderHeader()}</tr>
                            </thead>
                            <tbody class="tblsimbolos">
                                {renderBody()}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
            <br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br />
        </>
    )
}


export default Table