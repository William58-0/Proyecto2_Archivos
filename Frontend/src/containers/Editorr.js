import React from 'react';

import Editor from "@monaco-editor/react";
import { compilar } from '../utils/api';
import { getC3D } from '../utils/api';
import { Container, Row, Col } from 'reactstrap';

var Codigo = ""
var Salida = ""

class Editorr extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: Codigo,
            salida: Salida
        }

    }

    render() {
        const code = this.state.code;
        const salida = this.state.salida;
        return (
            <div>
                <Container style={{marginTop:"2%"}}>
                    <Row>
                        <Col>
                            <div class="card text-white" style={{ width: "100%", float: "left" }}>
                                <div class="card-header bg-dark d-flex justify-content-between align-items-center">
                                    INPUT
                                        <button class="btn btn-info" style={{marginLeft: "55%"}} onClick={() => { this.Ejecutar() }}>Ejecutar</button>
                                        <button class="btn btn-success" onClick={() => { this.C3D() }}>C3D</button>
                                </div>

                                <Editor
                                    height="90vh"
                                    defaultLanguage="julia"
                                    value={code}
                                    theme="vs-dark"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </Col>

                        <Col >
                            <div class="card text-white" style={{ width: "100%", float: "left" }}>
                                <div class="card-header bg-dark d-flex justify-content-between align-items-center" >
                                    OUTPUT
                                    <div>
                                        <button class="btn btn-success" onClick={() => { this.Limpiar() }}>Limpiar</button>
                                    </div>
                                </div>
                                <Editor
                                    height="90vh"
                                    //defaultLanguage="javascript"
                                    value={salida}
                                    theme="vs-dark"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
    handleChange = (e) => {
        const value = e;
        console.log(e)
        Codigo = value;
        this.setState({
            code: value,
        })
    }

    Ejecutar() {
        compilar(this.state.code)
            .then(res => {
                this.setState({ salida: res.data.salida });
                Salida=res.data.salida;
                console.log(res.data.salida);
            })
            .catch((err) => console.log(err));
    }

    C3D() {
        getC3D(this.state.code)
            .then(res => {
                this.setState({ salida: res.data.salida });
                Salida=res.data.salida;
                console.log(res.data.salida);
            })
            .catch((err) => console.log(err));
    }

    Limpiar() {
        this.setState({ salida: '' });
        Salida=""
    }
}

export default Editorr;