import React, { useState, useEffect } from 'react'
import { getUsuarios } from '../../../utils/api';
import { eliminarusuario } from '../../../utils/api';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";

var original = []

const AdminUsers = () => {
    const [usuarios, setUsuarios] = useState([])
    const [filName, setFilName] = useState("");
    const [filEstado, setFilEstado] = useState("");
    const [filInicio, setFilInicio] = useState("");
    const [filFin, setFilFin] = useState("");
    const [filTipo, setFilTipo] = useState("");


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
                obj.FECHAFIN = "hoy"
                obj.ESTADO = "Inactivo"
                nuevo.push(obj)
            } else {
                nuevo.push(usuarios[i])
            }
        }
        setUsuarios(nuevo)
        eliminarusuario(NOMBRE)
            .then(res => {
                console.log(res)
            })
            .catch((err) => console.log(err));
    }

    const renderHeader = () => {
        let headerElement = ['NOMBRE', 'ESTADO', 'FECHAINICIO', 'FECHAFIN', 'ROL', 'DEPARTAMENTO', 'ELIMINAR', 'EDITAR']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return usuarios.map(({ NOMBRE, ESTADO, FECHAINICIO, FECHAFIN, TIPO, DEPARTAMENTO }) => {
            return (
                <tr key={NOMBRE}>
                    <td>{NOMBRE}</td>
                    <td>{ESTADO}</td>
                    <td>{FECHAINICIO}</td>
                    <td>{FECHAFIN}</td>
                    <td>{TIPO}</td>
                    <td>{DEPARTAMENTO}</td>
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

    const filtrar = () => {
        if (original.length == 0) {
            original = usuarios
        } else {
            setUsuarios(original)
        }
        var del = usuarios
        if (filName != "") {
            del = usuarios.filter(usuario => usuario.NOMBRE == filName)
            setUsuarios(del)
        } if (filEstado != "") {
            del = usuarios.filter(usuario => usuario.ESTADO == filEstado)
            setUsuarios(del)
        } if (filInicio != "") {
            del = usuarios.filter(usuario => usuario.FECHAINICIO == filInicio)
            setUsuarios(del)
        } if (filFin != "") {
            del = usuarios.filter(usuario => usuario.FECHAFIN == filFin)
            setUsuarios(del)
        } if (filTipo != "") {
            del = usuarios.filter(usuario => usuario.TIPO == filTipo)
            setUsuarios(del)
        }

    }

    function quitarFiltros() {
        window.location.reload();
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
                <input style={{ marginLeft: "2%", marginBottom: "2%" }}
                    type="text" placeholder="Nombre"
                    value={filName}
                    onChange={(e) => setFilName(e.target.value)}
                />
                <input style={{ marginLeft: "2%", marginBottom: "2%" }}
                    type="text" placeholder="Estado"
                    value={filEstado}
                    onChange={(e) => setFilEstado(e.target.value)}
                />
                <input style={{ marginLeft: "2%", marginBottom: "2%" }}
                    type="text" placeholder="Fecha Inicio"
                    value={filInicio}
                    onChange={(e) => setFilInicio(e.target.value)}
                />
                <input style={{ marginLeft: "2%", marginBottom: "2%" }}
                    type="text" placeholder="Fecha Fin"
                    value={filFin}
                    onChange={(e) => setFilFin(e.target.value)}
                />
                <input style={{ marginLeft: "2%", marginBottom: "2%" }}
                    type="text" placeholder="Rol"
                    value={filTipo}
                    onChange={(e) => setFilTipo(e.target.value)}
                />
                <br />
                <Button variant="success" style={{ marginLeft: "2%" }} onClick={filtrar}>
                    <i>Filtrar</i>
                </Button>
                <Button variant="info" style={{ marginLeft: "2%" }} onClick={quitarFiltros}>
                    <i>Quitar Filtros</i>
                </Button>
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


export default AdminUsers