# Seguridad

## 1. Marco de referencia:

### a. ¿Qué es? 
Seguridad es la capacidad de un sistema para prevenir acciones maliciosas o accidentales que estén fuera del uso para el que fue creada la aplicación o sistema, y para prevenir divulgación o pérdida de la información. Las aplicaciones en la nube están expuestas en internet fuera de los límites locales confiables, son a menudo abiertas al público, y puede supervisar a usuarios no confiables. Las aplicaciones deben ser diseñadas y desplegadas de forma que estén protegidas de ataques maliciosos, con acceso restringido solo para usuarios autorizados, y proteger la sensibilidad de los datos. 
En general dentro de este QA se deben de tener en cuenta siempre tres simples atributos que son:
Confidencialidad: el acceso a los activos del sistema está limitado a usuarios autorizados.
Integridad: los activos del sistema solo pueden ser borrados o modificados por usuarios autorizados.
Disponibilidad: el acceso a los activos en un tiempo razonable está garantizado para usuarios autorizados.

### b. ¿Qué patrones se pueden emplear? 

** Patrón de Identidad Federada: ** Delegar la autenticación en un proveedor de identidad externo. Esto puede simplificar el desarrollo, minimizar los requisitos de administración de usuarios y mejorar la experiencia del usuario de la aplicación.
![Alt text](https://ibb.co/j3LKU5)

**Gatekeeper pattern:** Proteja las aplicaciones y los servicios utilizando una instancia de host dedicada que actúa como intermediario entre los clientes y la aplicación o servicio valida y desinfecta las solicitudes y pasa solicitudes y datos entre ellas. Esto puede proporcionar una capa adicional de seguridad y limitar la superficie de ataque del sistema.



**Patrón de Valet Key:** Utilice un token que proporcione a los clientes acceso restringido directo a un recurso específico para descargar la transferencia de datos de la aplicación. Esto es particularmente útil en aplicaciones que utilizan sistemas de almacenamiento alojados en la nube o colas, y puede minimizar el costo y maximizar la escalabilidad y el rendimiento.



**Autenticación por terceros con openID:** Con eso se busca que otro servidor diferente a los de la aplicación se encargue de la autenticación.


### c. Especificación mediante escenarios 

Esquema base para representación de escenarios.



### d. ¿Qué tácticas se pueden emplear? 

**Autenticar a los usuarios.** La autenticación es asegurar que un usuario o un equipo remoto es realmente quien dice ser. Contraseñas, contraseñas de una sola vez, certificados digitales, y las identificaciones biométricas proporcionan autenticación.

**Autorizar a los usuarios.** La autorización es garantizar que un usuario autenticado tiene los derechos para acceder y modificar datos o servicios. Esto es generalmente administrado ofreciendo algunas pautas de control de acceso dentro de un sistema. Control de acceso puede ser por usuario o por clase de usuario. Clases de usuarios pueden ser definidos por grupos de usuarios, por los roles de usuario, o por listas de las personas.

**Mantener la confidencialidad de los datos.** Los datos deben estar protegidos contra el acceso no autorizado. La confidencialidad se logra generalmente mediante la aplicación de algún tipo de encriptación de datos y enlaces de comunicación. 
El cifrado es la única protección para pasar datos a través de enlaces de comunicación de acceso público. El enlace puede ser implementado por una red privada virtual (VPN) o por una capa de sockets seguros (SSL) para un enlace basado en la Web. Cifrado puede ser simétrico (ambas partes utilizan la misma clave) o asimétrico (claves públicas y privadas).

**Mantener la integridad.** Los datos deben ser entregados según lo previsto. Puede tener información redundante codificada en ella, como sumas o los resultados de hash, que pueden ser encriptados con o independientemente de los datos originales.

**Límite de exposición.** Los ataques suelen depender de la explotación de una sola debilidad para atacar a todos los datos y servicios en un host. El arquitecto puede diseñar la asignación de servicios a los servidores para que los servicios disponibles estén limitados en cada host. 

**Limitar el acceso.** Los firewalls restringen el acceso basado en la fuente del mensaje o puerto de destino. Los mensajes de fuentes desconocidas puede ser una forma de ataque pero no se pueden limitar siempre. Un sitio web público, por ejemplo, puede obtener las solicitudes desde fuentes desconocidas. Una configuración que se utilizan en este caso es la llamada zona desmilitarizada (DMZ) cuando se debe proporcionar acceso a los servicios de Internet, pero no a una red privada. Se encuentra entre Internet y un firewall delante de la red interna. La DMZ contiene dispositivos de espera para recibir mensajes de fuentes arbitrarias tales como servicios Web, correo electrónico y los servicios de nombres de dominio (DNS).

**Detección de ataques:** La detección de un ataque es generalmente a través de un sistema de detección de intrusos. Estos sistemas trabajan mediante la comparación de los patrones de tráfico de red con una base de datos. 
Puede implementarse para detectar: 
Mal uso: El patrón de tráfico se compara con los patrones históricos de ataques conocidos
Anomalías: El patrón de tráfico se compara con una base histórica de sí mismo. 

**Recuperación de ataques:** Tácticas que participan en la recuperación de un ataque se puede dividir en:
Las relacionados con la restauración de estado.
Las relacionados con la identificación atacante (con fines de carácter preventivo o punitivo).


### e. Qué herramientas se pueden utilizar para lograrlo?

**OpenID:** Es un sistema de autenticación digital descentralizado, con el que un usuario puede identificarse en una página web a través de una URL (o un XRI en la versión actual) y puede ser verificado por cualquier servidor que soporte el protocolo.
En los sitios que soporten OpenID, los usuarios no tienen que crearse una nueva cuenta de usuario para obtener acceso. En su lugar, solo necesitan disponer de un identificador creado en un servidor que verifique OpenID, llamado proveedor de identidad o IdP
El proveedor de identidad puede confirmar la identificación OpenID del usuario a un sitio que soporte este sistema.
A diferencia de arquitecturas Single Sign-On, Open ID no especifica el mecanismo de autenticación.

**SonarQube:** Es una herramienta para auditar código tremendamente potente, tiene soporte para un montón de lenguajes de programación, tiene un ‘Dashboard’ con muchísima información y permite utilizarlo desde clientes permitiendo crear un sistema de auditoría continua de código(Esto último es muy interesante).

**Pruebas con DoS:** Se harán pruebas con ataques de denegación de servicio, para luego corregir los posibles problemas o debilidades de la aplicación con este tipo de ataques.

## 2. Análisis: Mediante escenarios y/o propuesta en marco teórico
 



## 3. Diseño: En Aplicación y en Sistema

### a. Vistas de arquitectura 

### b. Patrones de arquitectura. 

Se implementará una arquitectura basada en el siguiente patrón:

Autenticación por terceros con openID: Con eso se busca que otro servidor diferente a los de la aplicación se encargue de la autenticación, siguiendo la siguiente secuencia:

### c. Best Practices. 
Elaborar un mapa de posibles riesgos o fallos de la aplicación para controlarlos.

### d. Tácticas. 
Las tácticas que se van a utilizar son las siguientes:
* Autenticar a los usuarios.
* Autorizar a los usuarios.  
* Mantener la integridad. 
* Limitar el acceso.
* Detección de ataque

### e. Herramientas
* OpenID
* SonarQube
