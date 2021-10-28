----------------------------------------------------------------- TABLA DEPARTAMENTO
CREATE TABLE DEPARTAMENTO(
 Nombre VARCHAR(20) NOT NULL PRIMARY KEY,
 Capital FLOAT,
 CapDis FLOAT
);

----------------------------------------------------------------- TABLA PUESTO
CREATE TABLE PUESTO(
 Nombre VARCHAR(20) NOT NULL,
 Salario FLOAT,
 CalifPromedio INT,
 Departamento VARCHAR(20),
 PRIMARY KEY (Nombre, Departamento),
 FOREIGN KEY (Departamento) REFERENCES DEPARTAMENTO(Nombre)
);

----------------------------------------------------------------- TABLA REQUISITO
CREATE TABLE REQUISITO(
 Nombre VARCHAR(20) NOT NULL,
 Puesto VARCHAR(20) NOT NULL,
 Departamento VARCHAR(20) NOT NULL,
 Formato VARCHAR(20),
 Tamanio INT,
 Obligatorio INT,
 PRIMARY KEY(Nombre, Puesto, Departamento, Formato),
 FOREIGN KEY (Puesto, Departamento) REFERENCES PUESTO(Nombre, Departamento)
);

----------------------------------------------------------------- TABLA CATEGORIA
CREATE TABLE CATEGORIA(
 Nombre VARCHAR(20) NOT NULL,
 Puesto VARCHAR(20) NOT NULL,
 Departamento VARCHAR(20) NOT NULL,
 PRIMARY KEY(Nombre, Puesto, Departamento),
 FOREIGN KEY (Puesto, Departamento) REFERENCES PUESTO(Nombre, Departamento)
);

----------------------------------------------------------------- TABLA CALIFICACION
CREATE TABLE CALIFICACION(
 Fecha VARCHAR(20) NOT NULL PRIMARY KEY,
 Valor INT NOT NULL,
 Puesto VARCHAR(20) NOT NULL,
 Departamento VARCHAR(20) NOT NULL,
 FOREIGN KEY (Puesto, Departamento) REFERENCES PUESTO(Nombre, Departamento)
);

----------------------------------------------------------------- TABLA COORDINADOR_REVISOR
CREATE TABLE COORDINADOR_REVISOR(
 Nombre VARCHAR(20) NOT NULL PRIMARY KEY,
 Contrasenia VARCHAR(20) NOT NULL,
 FechaInicio VARCHAR(20) NOT NULL,
 FechaFin VARCHAR(20) NOT NULL,
 Tipo VARCHAR(20) NOT NULL,						
 Estado VARCHAR(20) NOT NULL,
 ParaRevisar INT NOT NULL,
 Departamento VARCHAR(20) NOT NULL,
 FOREIGN KEY (Departamento) REFERENCES DEPARTAMENTO(Nombre)
);

----------------------------------------------------------------- TABLA APLICANTE_EMPLEADO
CREATE TABLE APLICANTE_EMPLEADO(
 DPI INT NOT NULL PRIMARY KEY,
 Nombres VARCHAR(30) NOT NULL,
 Apellidos VARCHAR(30) NOT NULL,
 Contrasenia VARCHAR(20) NOT NULL,
 Correo VARCHAR(30) NOT NULL,
 Direccion VARCHAR(40) NOT NULL,
 Telefono VARCHAR(15) NOT NULL,
 Estado VARCHAR(20) NOT NULL,
 FechaInicio VARCHAR(20) NOT NULL,
 FechaFin VARCHAR(20) NOT NULL,
 PrimerLogin INT NOT NULL,				-- 1 si si; 0 si no
 Revisor VARCHAR(20) NOT NULL,
 Departamento VARCHAR(20) NOT NULL,
 Puesto VARCHAR(20) NOT NULL,
 FOREIGN KEY (Revisor) REFERENCES COORDINADOR_REVISOR(Nombre),
 FOREIGN KEY (Puesto, DEPARTAMENTO) REFERENCES PUESTO(Nombre, Departamento)
);

----------------------------------------------------------------- TABLA MENSAJE
CREATE TABLE MENSAJE(
 Emisor VARCHAR(30) NOT NULL,
 Orden INT NOT NULL,
 Receptor VARCHAR(30) NOT NULL,
 Texto VARCHAR(200),
 PRIMARY KEY(Emisor, Orden)
);

----------------------------------------------------------------- TABLA DOCUMENTO
CREATE TABLE DOCUMENTO(
 Nombre VARCHAR(25) NOT NULL,
 Formato VARCHAR(5) NOT NULL,					
 Estado VARCHAR(20) NOT NULL,
 Aplicante INT NOT NULL
);

----------------------------------------------------------------- TABLA RECHAZO
CREATE TABLE RECHAZO(
 Documento VARCHAR(25) NOT NULL,
 Fecha VARCHAR(15) NOT NULL,					
 Motivo VARCHAR(50) NOT NULL,
 Formato VARCHAR(5) NOT NULL,
 Aplicante INT NOT NULL,
 FOREIGN KEY (Aplicante) REFERENCES APLICANTE_EMPLEADO(DPI)
);

DROP TABLE CALIFICACION;
DROP TABLE RECHAZO;
DROP TABLE DOCUMENTO;
DROP TABLE MENSAJE;
DROP TABLE APLICANTE_EMPLEADO;
DROP TABLE COORDINADOR_REVISOR;
DROP TABLE CATEGORIA;
DROP TABLE REQUISITO;
DROP TABLE PUESTO;
DROP TABLE DEPARTAMENTO;

DELETE FROM CALIFICACION;
DELETE FROM RECHAZO;
DELETE FROM DOCUMENTO;
DELETE FROM MENSAJE;
DELETE FROM APLICANTE_EMPLEADO;
DELETE FROM COORDINADOR_REVISOR;
DELETE FROM CATEGORIA;
DELETE FROM REQUISITO;
DELETE FROM PUESTO;
DELETE FROM DEPARTAMENTO;

SELECT * FROM CALIFICACION;
SELECT * FROM RECHAZO;
SELECT * FROM DOCUMENTO;
SELECT * FROM MENSAJE;
SELECT * FROM APLICANTE_EMPLEADO;
SELECT * FROM COORDINADOR_REVISOR;
SELECT * FROM CATEGORIA;
SELECT * FROM REQUISITO;
SELECT * FROM PUESTO;
SELECT * FROM DEPARTAMENTO;