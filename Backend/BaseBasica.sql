
----------------------------------------------------------------- TABLA DEPARTAMENTO
CREATE TABLE DEPARTAMENTO(
 Nombre VARCHAR(20) NOT NULL PRIMARY KEY,
 Capital FLOAT
);

BEGIN INSERT INTO DEPARTAMENTO (Nombre, Capital)
 VALUES ('uno', 123.00); 
 EXCEPTION WHEN dup_val_on_index THEN NULL;
END; 

SELECT Nombre FROM DEPARTAMENTO;
DROP TABLE DEPARTAMENTO;

----------------------------------------------------------------- TABLA PUESTO
CREATE TABLE PUESTO(
 Nombre VARCHAR(20) NOT NULL,
 Salario FLOAT,
 CalifPromedio INT,
 Calificaciones INT,
 Departamento VARCHAR(20),
 PRIMARY KEY (Nombre, Departamento),
 FOREIGN KEY (Departamento) REFERENCES DEPARTAMENTO(Nombre)
);

INSERT INTO PUESTO VALUES('unopuesto', 2000.50, 3, 28, 'uno');

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
 Revisor VARCHAR(20) NOT NULL,
 Departamento VARCHAR(20) NOT NULL,
 Puesto VARCHAR(20) NOT NULL,
 FOREIGN KEY (Revisor) REFERENCES COORDINADOR_REVISOR(Nombre),
 FOREIGN KEY (Puesto, DEPARTAMENTO) REFERENCES PUESTO(Nombre, Departamento)
);

DROP TABLE APLICANTE_EMPLEADO;
SELECT * FROM APLICANTE_EMPLEADO;
INSERT INTO APLICANTE_EMPLEADO VALUES
(2797652900101,'william alejandro', 'borrayo alarcon', '4321', 'wiliamborryo@gmail.com', 'casa', '1234', 'pendiente', 'hoy', 'maniana','reev1' ,'uno', 'unopuesto' );

UPDATE APLICANTE_EMPLEADO SET Estado='pendiente' WHERE DPI=787489379824

----------------------------------------------------------------------------------------------------

DROP TABLE CATEGORIA;
DROP TABLE REQUISITO;
DROP TABLE PUESTO;
DROP TABLE DEPARTAMENTO;

DELETE FROM CATEGORIA;
DELETE FROM REQUISITO;
DELETE FROM PUESTO;
DELETE FROM DEPARTAMENTO;


SELECT * FROM CATEGORIA;
SELECT * FROM REQUISITO;
SELECT * FROM PUESTO;
SELECT * FROM DEPARTAMENTO;

CREATE TABLE USUARIO(
 usuario VARCHAR(50) NOT NULL,
 nombre_usuario VARCHAR(50) NOT NULL,
 apellido_usuario VARCHAR(50) NOT NULL,
 password_usuario VARCHAR(50) NOT NULL,
 edad_usuario INT NOT NULL,
 correo_usuario VARCHAR(50) NOT NULL,
 CONSTRAINT USUARIO_PK PRIMARY KEY (usuario)
);

SELECT * FROM USUARIO;