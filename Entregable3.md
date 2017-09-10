# 1. Miembros del equipo

| Miembro | Atributo de calidad |
| --- | --- |
| Daniel Rendón Montaño | Disponibilidad |
| Laura Mejia Vasquez | Disponibilidad |
| Dillan Alexis Muñeton Avendaño | Rendimiento |
| Juan Fernando Ossa Vasquez | Seguridad |

# 2. Diseño de arquitectura de la aplicación y sistema

## a. Vista de desarrollo

### i. Definición de tecnologia de desarrollo

Para el desarrollo se utilizaron cuatro máquinas diferentes, pero las versiones y tecnologías fueron exactamente las mismas excepto por el editor de texto y el sistema operativo de las máquinas.

| SISTEMA OPERATIVO | Windows 10 - Linux - MacOS |
| LENGUAJE DE PROGRAMACIÓN | JavaScript / NodeJS |
| FRAMEWORK WEB - BACKEND | Express |
| FRAMEWORK WEB - FRONTEND (si aplica) | Templates de HTML |
| WEB APP SERVER | Embebido (Node) |
| WEB SERVER | NGINX |
| BASE DE DATOS | MongoDB |
| EDITOR | Visual Studio Code - Sublime text- WebStorm |
| GIT (CLI Y GUI) | GitHub |
| PRUEBAS | Postman - Jmeter |
| OTROS QUE CONSIDERE | Ninguno |


### ii. Urls de repositorio (GitHub)

https://github.com/danielr9911/2Tvideos

## b. Vista de despliegue

### i. Definición de tecnologia - Infraestructura TI

La aplicación correrá sobre dos DCA’s de 2gb de RAM, 20gb de Disco duro y dos procesadores virtuales cada uno, además esta máquina virtual tendrá el sistema .operativo CentOS 7.1, esta estará duplicada en ambas máquinas. Además habrá otras máquinas de las mismas especificaciones , donde estarán corriendo el load balancer y las bases de datos de la aplicación.

[Imagen Despliegue]


| SISTEMA OPERATIVO | LINUX CENTOS 7.1 |
| LOAD BALANCER IP | 10.131.137.203 |
| DIRECCIÓN IP SERVIDOR | 10.131.137.244- 10.131.137.169 |
| LENGUAJE DE PROGRAMACIÓN | JavaScript / NodeJS |
| FRAMEWORK WEB - BACKEND | Express |
| FRAMEWORK WEB - FRONTEND (si aplica) | Templates de HTML |
| WEB APP SERVER | Embebido (Node) |
| WEB SERVER | NGINX |
| BASE DE DATOS | MongoDB (10.131.137.235 -10.131.137.243 - 10.131.137.168) |
| GIT (CLI Y GUI) | GitHub |
| PRUEBAS | Postman-Jmeter |
| OTROS QUE CONSIDERE | Ninguno |


### ii. Urls de ejecución

http://10.131.137.203
http://proyecto24.dis.eafit.edu.co/
https://proyecto24.dis.eafit.edu.co/

# 3. Implementación y pruebas por atributo de calidad

## a. Implementación

### i. Herramientas utilizadas

#### Rendimiento

Jmeter: el cual es un proyecto de Apache que puede ser utilizado como una herramienta de prueba de carga para analizar y medir el desempeño de una variedad de servicios, con énfasis en aplicaciones web.

JMeter puede ser usado como una herramienta de pruebas unitarias para conexiones de bases de datos con JDBC, FTP, LDAP, Servicios web, JMS, HTTP y conexiones TCP genéricas. JMeter puede también ser configurado como un monitor, aunque es comúnmente considerado una solución ad-hoc respecto de soluciones avanzadas de monitoreo.

Mientras que JMeter es clasificado como una herramienta de "generación de carga", no es una descripción completa de la herramienta. JMeter soporta aserciones para asegurarse que los datos recibidos son correctos, por cookies de hilos, configuración de variables y una variedad de reportes.

Compression: La compresión de gzip puede disminuir significativamente el tamaño del cuerpo de respuesta y, por lo tanto, aumentar la velocidad de una aplicación web. Utilice el middleware de compresión para la compresión de gzip en la aplicación Express. Por ejemplo:
var compression = require('compression');
var express = require('express');
var app = express();
app.use(compression());
Para un sitio web con un tráfico elevado en producción, la mejor forma de aplicar la compresión es implementarla como un nivel de proxy inverso (consulte Utilizar un proxy inverso). En este caso, no es necesario utilizar el middleware de compresión.

Cache:En informática, la memoria caché es la memoria de acceso rápido de un microprocesador, que guarda temporalmente los datos recientes de los procesados (información).1

La memoria caché es un búfer especial de memoria que poseen las computadoras, que funciona de manera semejante a la memoria principal, pero es de menor tamaño y de acceso más rápido. Es usada por el microprocesador para reducir el tiempo de acceso a datos ubicados en la memoria principal que se utilizan con más frecuencia.

La caché es una memoria que se sitúa entre la unidad central de procesamiento (CPU) y la memoria de acceso aleatorio (RAM) para acelerar el intercambio de datos.


#### Disponibilidad

#### Seguridad

### ii. Cambios en la implementación de la aplicación

## b. Esquemas de pruebas para comprobar el atributo de calidad