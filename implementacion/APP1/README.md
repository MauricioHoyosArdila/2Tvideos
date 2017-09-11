# Disponibilidad

#### /etc/sysconfig/selinux
```
SELINUX=disabled
```

#### /etc/mongod.conf
```
replication:
  replSetName: drendon
```

#### /etc/hosts

    10.131.137.169  app1
    10.131.137.244  app2
    10.131.137.235  mongo1
    10.131.137.243  mongo2
    10.131.137.168  mongo3

#### /etc/fstab

    mongo1:/uploads1 /mnt/uploads glusterfs defaults,_netdev 0 0

# Rendimiento

# Seguridad
