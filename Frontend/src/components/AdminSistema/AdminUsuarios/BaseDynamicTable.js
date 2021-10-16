import React, { useState, useEffect } from 'react'
import { getUsuarios } from '../../../utils/api';
import axios from 'axios'

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

    const removeData = (NOMBRE) => {
        const del = usuarios.filter(usuario => NOMBRE !== usuario.NOMBRE)
        setUsuarios(del)
    }

    const updateData = (NOMBRE) => {
        var nuevo=[]
        for(let i=0;i<usuarios.length;i++){
            if(usuarios[i].NOMBRE==NOMBRE){
                var obj=usuarios[i]
                obj.FECHAFIN="ahorita"
                nuevo.push(obj)
            }else{
                nuevo.push(usuarios[i])
            }
        }

        //const del = usuarios.filter(usuario => NOMBRE !== usuario.NOMBRE)
        setUsuarios(nuevo)
    }

    const renderHeader = () => {
        let headerElement = ['NOMBRE', 'ESTADO', 'FECHAINICIO', 'FECHAFIN', 'TIPO']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return usuarios && usuarios.map(({ NOMBRE, ESTADO, FECHAINICIO, FECHAFIN, TIPO }) => {
            return (
                <tr key={NOMBRE}>
                    <td>{ESTADO}</td>
                    <td>{FECHAINICIO}</td>
                    <td>{FECHAFIN}</td>
                    <td>{TIPO}</td>
                    <td className='opration'>
                        <button className='button' onClick={() => removeData(NOMBRE)}>Delete</button>
                    </td>
                    <td className='opration'>
                        <button className='button' onClick={() => updateData(NOMBRE)}>Update</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <h1 id='title'>React Table</h1>
            <table id='employee'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}


export default Table