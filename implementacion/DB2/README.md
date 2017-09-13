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
    
### Configurando GlusterFS

Se añadio el repositorio para GlusterFS:
#### /etc/yum.repos.d/gluster.repo
    [gluster]
    name=Gluster
    baseurl=http://mirror.upb.edu.co/centos/7.3.1611/storage/x86_64/gluster-3.8/
    gpgcheck=0

Se instalo GlusterFS:

    sudo yum install glusterfs-server
    
Se inicio el servicio de GlusterFS:

    systemctl start glusterd
    systemctl enable glusterd

Se abrieron los puertos necesarios para el correcto funcionamiento de GlusterFS:

    firewall-cmd --zone=public --add-port=49153/tcp --permanent
    firewall-cmd --zone=public --add-port=49152/tcp --permanent
    firewall-cmd --zone=public --add-port=49151/tcp --permanent
    firewall-cmd --zone=public --add-port=49144/tcp --permanent
    firewall-cmd --zone=public --add-port=24007/tcp --permanent
    firewall-cmd --zone=public --add-port=49150/tcp --permanent
    firewall-cmd --zone=public --add-port=49143/tcp --permanent
    firewall-cmd --zone=public --add-port=49142/tcp --permanent
    firewall-cmd --zone=public --add-port=49141/tcp --permanent

Se añadieron los peer:
    
    gluster peer probe mongo1
    
Se crearon los volumenes:

    gluster volume create uploads1 replica 2 transport tcp mongo1:/home/user1/uploads1 mongo2:/home/user1/uploads1 force
    gluster volume create uploads2 replica 2 transport tcp mongo1:/home/user1/uploads2 mongo2:/home/user1/uploads2 force

Se comenzaron los volumenes:

    gluster volume start uploads1
    gluster volume start uploads2
    

# Rendimiento
#### N/A
# Seguridad
#### N/A
