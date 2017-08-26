# Rendimiento

## 1. Marco de referencia:

### a. ¿Qué es? 
La idea rendimiento refiere a la proporción que surge entre los medios empleados para obtener algo y el resultado que se consigue. El beneficio o el provecho que brinda algo o alguien también se conoce como rendimiento.

Por otro lado, es el rendimiento de la computadora es la cantidad de trabajo realizado por un sistema informático. Dependiendo del contexto, un alto rendimiento de equipo puede incluir uno o más de los siguientes:

* Tiempo de respuesta corto para una determinada pieza de trabajo
* Alto throughput (tasa de procesamiento de trabajo)
* Baja utilización de recursos computacionales
* Alta disponibilidad del sistema de computación o de la aplicación
* Rápida (o muy compacta)compresión y descompresión de datos
* Gran ancho de banda
* Tiempo corto de transmisión de datos

### b. ¿Qué patrones se pueden emplear? 

**Active-active redundancy:** consiste por lo menos de 2 nodos. Los n nodos están corriendo los mismo servicios simultáneamente. Para asegurar esto, se utilizan balanceadores de carga para distribuir los workloads por todos los nodos, para prevenir una sobrecarga sobre un nodo. Los workloads distribuidos conlleva a una mejora en tiempo de respuesta y throughput.

**Cache-Aside pattern:** Cargar datos a petición en un caché desde un almacén de datos. Esto puede mejorar el rendimiento y también ayuda a mantener la coherencia entre los datos almacenados en la caché y los datos en el almacén de datos subyacente.

**Command and Query Responsibility Segregation (CQRS) pattern:** Segregar operaciones que leen datos de operaciones que actualizan datos mediante interfaces independientes. Esto puede maximizar el rendimiento, la escalabilidad y la seguridad. Soporta la evolución del sistema a través del tiempo mediante una mayor flexibilidad y evita que los comandos de actualización provoquen conflictos de combinación en el nivel de dominio.

**Event Sourcing pattern:** En lugar de almacenar sólo el estado actual de los datos en un dominio, utilice un almacén sólo de anexos para registrar la serie completa de acciones tomadas en esos datos. La tienda actúa como el sistema de registro y puede utilizarse para materializar los objetos de dominio. Esto puede simplificar tareas en dominios complejos, evitando la necesidad de sincronizar el modelo de datos y el dominio empresarial, mejorando al mismo tiempo el rendimiento, la escalabilidad y la capacidad de respuesta. También puede proporcionar consistencia para los datos transaccionales y mantener pistas de auditoría completas e historial que pueden permitir acciones compensatorias.

**Index Table pattern:** Cree índices sobre los campos en los almacenes de datos que son frecuentemente referenciados por las consultas. Este patrón puede mejorar el rendimiento de la consulta al permitir que las aplicaciones busquen más rápidamente los datos que se recuperarán de un almacén de datos.

**Materialized View pattern:** Generar vistas prepopuladas sobre los datos en uno o más almacenes de datos cuando los datos no están idealmente formateados para las operaciones de consulta requeridas. Esto puede ayudar a realizar consultas eficientes y extracción de datos, y mejorar el rendimiento de la aplicación.

**Priority Queue pattern:** Priorizar las solicitudes enviadas a los servicios para que las solicitudes con mayor prioridad sean recibidas y procesadas más rápidamente que aquellas con una prioridad menor. Este patrón es útil en aplicaciones que ofrecen garantías de nivel de servicio diferentes a clientes individuales.

**Queue-Based Load Leveling pattern:** Utilice una cola que actúa como un búfer entre una tarea y un servicio que invoca para suavizar las cargas pesadas intermitentes que pueden provocar que el servicio falle o que la tarea expire. Esto puede ayudar a minimizar el impacto de los picos de demanda sobre la disponibilidad y la capacidad de respuesta tanto para la tarea como para el servicio.

**Sharding pattern:** Divida un almacén de datos en un conjunto de particiones horizontales o fragmentos. Esto puede mejorar la escalabilidad al almacenar y acceder a grandes volúmenes de datos.

**Static Content Hosting pattern:** Implementar contenido estático en un servicio de almacenamiento basado en la nube que pueda entregarlos directamente al cliente. Esto puede reducir la necesidad de instancias de computación potencialmente costosas.



**Throttling pattern:** Controlar el consumo de recursos utilizados por una instancia de una aplicación, un inquilino individual o un servicio completo. Esto puede permitir que el sistema continúe funcionando y cumpla con los acuerdos de nivel de servicio, incluso cuando el aumento de la demanda impone una carga extrema sobre los recursos.

### c. Especificación mediante escenarios 

Esquema base para representación de escenarios.



### d. ¿Qué tácticas se pueden emplear? 
* El consumo de recursos 
* El tiempo de bloqueo. 
* Arquitectura simple, diseño modular en componentes de software, estrategias de caché, automatización para actividades de mantenimiento y rendimiento.
* Nuevas versiones de las tecnologías utilizadas.
* Optimización de software (Performance tuning).
* Código limpio.
* Utilización de colas y caché.
* Incrementar recursos. (Crecer vertical y horizontalmente)
* Optimización de algoritmos.
* Utilización de computación distribuida y/o paralela.
* Testing.


### e. Qué herramientas se pueden utilizar para lograrlo?
**NGINX:** es un servidor web/proxy inverso ligero de alto rendimiento y un proxy para protocolos de correo electrónico.

Es software libre y de código abierto, licenciado bajo la Licencia BSD simplificada; también existe una versión comercial distribuida bajo el nombre de nginx plus.3​ Es multiplataforma, por lo que corre en sistemas tipo Unix (GNU/Linux, BSD, Solaris, Mac OS X, etc.) y Windows.

**Jmeter:** es un proyecto de Apache que puede ser utilizado como una herramienta de prueba de carga para analizar y medir el desempeño de una variedad de servicios, con énfasis en aplicaciones web.

JMeter puede ser usado como una herramienta de pruebas unitarias para conexiones de bases de datos con JDBC, FTP, LDAP, Servicios web, JMS, HTTP y conexiones TCP genéricas. JMeter puede también ser configurado como un monitor, aunque es comúnmente considerado una solución ad-hoc respecto de soluciones avanzadas de monitoreo.

Mientras que JMeter es clasificado como una herramienta de "generación de carga", no es una descripción completa de la herramienta. JMeter soporta aserciones para asegurarse que los datos recibidos son correctos, por cookies de hilos, configuración de variables y una variedad de reportes.

## 2. Análisis: Mediante escenarios y/o propuesta en marco teórico
 


## 3. Diseño: En Aplicación y en Sistema

### a. Vistas de arquitectura 

### b. Patrones de arquitectura. 

Se implementará una arquitectura basada en los siguientes patrones:

**Active-active redundancy:** consiste por lo menos de 2 nodos. Los n nodos están corriendo los mismo servicios simultáneamente. Para asegurar esto, se utilizan balanceadores de carga para distribuir los workloads por todos los nodos, para prevenir una sobrecarga sobre un nodo. Los workloads distribuidos conlleva a una mejora en tiempo de respuesta y throughput. Nota: Este trabaja directamente con la disponibilidad del sistema.

**Cache-Aside pattern:** Cargar datos a petición en un caché desde un almacén de datos. Esto puede mejorar el rendimiento y también ayuda a mantener la coherencia entre los datos almacenados en la caché y los datos en el almacén de datos subyacente.

### c. Best Practices. 
Se utilizará caché y código limpio.

### d. Tácticas. 
* Las tácticas que se van a utilizar son las siguientes:
* Arquitectura simple, diseño modular en componentes de software, estrategias de caché, automatización para actividades de mantenimiento y rendimiento.
* Código limpio.
* Utilización de caché.
* Optimización de algoritmos.

### e. Herramientas
* NGINX
* Jmeter






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
