----------------------------------------------------------------- TABLA DEPARTAMENTO
CREATE TABLE DEPARTAMENTO(
 Nombre VARCHAR(20) NOT NULL PRIMARY KEY,
 Capital FLOAT
);

BEGIN INSERT INTO DEPARTAMENTO (Nombre, Capital)
 VALUES ('uno', 123.00); 
 EXCEPTION WHEN dup_val_on_index THEN UPDATE DEPARTAMENTO SET Capital=0 WHERE Nombre='uno';
END; 

SELECT * FROM DEPARTAMENTO;
DROP TABLE DEPARTAMENTO;

----------------------------------------------------------------- TABLA PUESTO
CREATE TABLE PUESTO(
 Nombre VARCHAR(20) NOT NULL,
 Salario FLOAT,
 CalifPromedio INT,
 Departamento VARCHAR(20),
 PRIMARY KEY (Nombre, Departamento),
 FOREIGN KEY (Departamento) REFERENCES DEPARTAMENTO(Nombre)
);

INSERT INTO PUESTO VALUES('unopuesto', 2000.50, 3, 'uno');

SELECT * FROM PUESTO;
SELECT * FROM REQUISITO WHERE Puesto='Analista de RRHH' AND DEPARTAMENTO ='RRHH2'
DROP TABLE PUESTO;

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

INSERT INTO REQUISITO VALUES('dosrequisito','unopuesto','uno', 'pdf', 20, 1 );
BEGIN UPDATE REQUISITO SET Formato='img' WHERE Nombre='dosrequisito' AND Puesto='unopuesto' AND Departamento='uno'; END;

SELECT * FROM REQUISITO;
DROP TABLE REQUISITO;

SELECT DISTINCT NOMBRE, FORMATO, TAMANIO, OBLIGATORIO FROM REQUISITO WHERE DEPARTAMENTO ='RRHH' AND PUESTO='Analista de RRHH'

----------------------------------------------------------------- TABLA CATEGORIA
CREATE TABLE CATEGORIA(
 Nombre VARCHAR(20) NOT NULL,
 Puesto VARCHAR(20) NOT NULL,
 Departamento VARCHAR(20) NOT NULL,
 PRIMARY KEY(Nombre, Puesto, Departamento),
 FOREIGN KEY (Puesto, Departamento) REFERENCES PUESTO(Nombre, Departamento)
);

INSERT INTO CATEGORIA VALUES('unocategoria','unopuesto', 'uno' );
INSERT INTO CATEGORIA VALUES('doscategoria','unopuesto', 'uno' );

SELECT * FROM CATEGORIA;
DROP TABLE CATEGORIA;

----------------------------------------------------------------- TABLA CALIFICACION
CREATE TABLE CALIFICACION(
 Fecha VARCHAR(20) NOT NULL PRIMARY KEY,
 Valor INT NOT NULL,
 Puesto VARCHAR(20) NOT NULL,
 Departamento VARCHAR(20) NOT NULL,
 FOREIGN KEY (Puesto, Departamento) REFERENCES PUESTO(Nombre, Departamento)
);

INSERT INTO CALIFICACION VALUES('HOY',3, 'Supervisor de RRHH', 'RRHH');
INSERT INTO CALIFICACION VALUES('MANIANA',5, 'Supervisor de RRHH', 'RRHH');



SELECT * FROM PUESTO;
SELECT * FROM REQUISITO WHERE Puesto='Analista de RRHH' AND DEPARTAMENTO ='RRHH2'
DROP TABLE PUESTO;

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

DROP TABLE COORDINADOR_REVISOR;
INSERT INTO COORDINADOR_REVISOR VALUES('coord1','1234', 'hoy', 'maniana', 'Coordinador', 'Activo',0 ,'uno' );
INSERT INTO COORDINADOR_REVISOR VALUES('reev3','1234', 'hoy', 'maniana', 'Revisor', 'Activo',0 ,'uno' );
UPDATE COORDINADOR_REVISOR SET Nombre = 'william', Contrasenia='nueva', Tipo='Coordinador', Departamento='uno' WHERE Nombre = 'Anderson';
BEGIN UPDATE COORDINADOR_REVISOR SET Nombre='william', Contrasenia='nueva', Tipo='Coordinador', Departamento='RRHH' WHERE Nombre='alejandro'; COMMIT; END;
BEGIN UPDATE COORDINADOR_REVISOR SET Nombre='alejandro', Contrasenia='nueva', Tipo='Coordinador', Departamento='RRHH' WHERE Nombre='william'; COMMIT; END;

SELECT Nombre FROM COORDINADOR_REVISOR t WHERE t.ParaRevisar = ( SELECT MIN( ParaRevisar )  FROM COORDINADOR_REVISOR) AND t.Tipo='Revisor' AND t.DEPARTAMENTO = 'uno'

UPDATE COORDINADOR_REVISOR SET ParaRevisar = ParaRevisar + 1 WHERE Nombre='reev1' AND Tipo='Revisor' AND Departamento='uno' AND Estado='Activo'

SELECT * FROM COORDINADOR_REVISOR;
DROP TABLE COORDINADOR_REVISOR;
SELECT Nombre FROM COORDINADOR_REVISOR t WHERE t.ParaRevisar = ( SELECT MIN( ParaRevisar )
FROM COORDINADOR_REVISOR WHERE Tipo='Revisor' AND DEPARTAMENTO = 'RRHH') AND t.Tipo='Revisor' AND t.DEPARTAMENTO = 'RRHH'

UPDATE COORDINADOR_REVISOR SET Estado='Activo', FechaFin='3/9/2021' WHERE Nombre='william580'

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

DROP TABLE APLICANTE_EMPLEADO;
SELECT * FROM APLICANTE_EMPLEADO;
INSERT INTO APLICANTE_EMPLEADO VALUES
(27976529001017,'william alejandro', 'borrayo alarcon', '4321', 'wiliamborryo@gmail.com', 'casa', '1234', 'pendiente', 'hoy', 'maniana',1,'reev1' ,'uno', 'unopuesto' );

UPDATE APLICANTE_EMPLEADO SET Estado='pendiente' WHERE DPI=787489379824
UPDATE APLICANTE_EMPLEADO SET Estado='pendiente' WHERE DPI=2797652900101
UPDATE APLICANTE_EMPLEADO SET Estado='pendiente' WHERE DPI=787489379824
UPDATE APLICANTE_EMPLEADO SET Estado='pendiente' WHERE DPI=797495
UPDATE APLICANTE_EMPLEADO SET Estado='pendiente' WHERE DPI=201909103

SELECT * FROM DEPARTAMENTO
SELECT * FROM APLICANTE_EMPLEADO ae 
SELECT * FROM COORDINADOR_REVISOR cr 
SELECT * FROM puesto cr 

SELECT * FROM APLICANTE_EMPLEADO WHERE Departamento='RRHH' AND Revisor='william580' AND Estado='pendiente'

----------------------------------------------------------------- TABLA MENSAJE
CREATE TABLE MENSAJE(
 Emisor VARCHAR(30) NOT NULL,
 Orden INT NOT NULL,
 Receptor VARCHAR(30) NOT NULL,
 Texto VARCHAR(200),
 PRIMARY KEY(Emisor, Orden)
 -- FOREIGN KEY (Emisor) REFERENCES COORDINADOR_REVISOR(Nombre),
 -- FOREIGN KEY (Emisor) REFERENCES APLICANTE_EMPLEADO(DPI),
 -- FOREIGN KEY (Destino) REFERENCES COORDINADOR_REVISOR(Nombre),
 -- FOREIGN KEY (Destino) REFERENCES APLICANTE_EMPLEADO(DPI),
);

DROP TABLE MENSAJE;
SELECT * FROM MENSAJE;
SELECT * FROM APLICANTE_EMPLEADO;
SELECT * FROM COORDINADOR_REVISOR;
INSERT INTO MENSAJE VALUES
(2797652900101,12, 'william580', 'hola');

INSERT INTO MENSAJE VALUES ('william580',12, '2797652900101', 'stas');

SELECT * FROM MENSAJE WHERE Emisor='william580' OR Receptor='william580' ORDER BY Orden ASC;

----------------------------------------------------------------- TABLA DOCUMENTO
CREATE TABLE DOCUMENTO(
 Nombre VARCHAR(25) NOT NULL,
 Formato VARCHAR(5) NOT NULL,					
 Estado VARCHAR(20) NOT NULL,
 Aplicante INT NOT NULL
);

DROP TABLE DOCUMENTO;
SELECT * FROM DOCUMENTO;
INSERT INTO DOCUMENTO VALUES('BOLETO DE ORNATO','PDF', 'pendiente', 201909103 );
INSERT INTO COORDINADOR_REVISOR VALUES('reev3','1234', 'hoy', 'maniana', 'Revisor', 'Activo',0 ,'uno' );

----------------------------------------------------------------- TABLA RECHAZO
CREATE TABLE RECHAZO(
 Documento VARCHAR(25) NOT NULL,
 Fecha VARCHAR(15) NOT NULL,					
 Motivo VARCHAR(50) NOT NULL,
 Formato VARCHAR(5) NOT NULL,
 Aplicante INT NOT NULL,
 FOREIGN KEY (Aplicante) REFERENCES APLICANTE_EMPLEADO(DPI)
);

DROP TABLE RECHAZO;
SELECT * FROM PUESTO;
INSERT INTO RECHAZO VALUES('BOLETO DE ORNATO','hoy', 'no sirve', 'pdf', 201909103);

----------------------------------------------------------------------------------------------------
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