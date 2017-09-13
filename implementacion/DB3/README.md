# Disponibilidad
Primero se desactivo Selinux:
#### /etc/sysconfig/selinux
    SELINUX=disabled

#### /etc/hosts
    10.131.137.169  app1
    10.131.137.244  app2
    10.131.137.235  mongo1
    10.131.137.243  mongo2
    10.131.137.168  mongo3

### Configurando MongoDB

Se añadio el repositorio de MongoDB:
#### /etc/yum.repos.d/mongodb-org.repo
    [mongodb-org-3.4]
    name=MongoDB Repository
    baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
    gpgcheck=1
    enabled=1
    gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc
    
Se instalo MongoDB:

    sudo yum install mongodb-org

Se incio el servicio de mongod:

    sudo systemctl enable mongod
    sudo systemctl start mongod

Se abrieron los puertos necesarios para mongo:

    firewall-cmd --permanent --add-port=22/tcp
    firewall-cmd --permanent --add-port=27017/tcp

Para configurar el ReplicaSet:

#### /etc/mongod.conf
    replication:
      replSetName: drendon

Inicializamos el ReplicaSet:

    mongo
    rs.initiate()
    rs.add("mongo2")
    rs.add("mongo3")
    
# Rendimiento
#### N/A
# Seguridad
#### N/A
