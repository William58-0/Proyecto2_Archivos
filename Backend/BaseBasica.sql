
----------------------------------------------------------------- TABLA DEPARTAMENTO
CREATE TABLE DEPARTAMENTO(
 Nombre VARCHAR(20) NOT NULL PRIMARY KEY,
 Capital FLOAT
);

BEGIN INSERT INTO DEPARTAMENTO (Nombre, Capital)
 VALUES ('uno', 123.00); 
 EXCEPTION WHEN dup_val_on_index THEN NULL;
END; 

SELECT * FROM DEPARTAMENTO;
DROP TABLE DEPARTAMENTO;

----------------------------------------------------------------- TABLA ṔUESTO
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

INSERT INTO REQUISITO VALUES('dosrequisito','unopuesto','uno', null, 20, 1 );
BEGIN UPDATE REQUISITO SET Formato='img' WHERE Nombre='dosrequisito' AND Puesto='unopuesto' AND Departamento='uno'; END;

SELECT * FROM REQUISITO;
DROP TABLE REQUISITO;

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