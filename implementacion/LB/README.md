# Disponibilidad

#### /etc/haproxy/haproxy.cfg
    frontend firstbalance
        bind *:80
        option forwardfor
        option httpchk
        default_backend webservers
        
    backend webservers
        balance source
        hash-type consistent
        server app1 10.131.137.169:80 check
        server app2 10.131.137.244:80 check

#### /etc/sysconfig/selinux
    SELINUX=disabled

# Rendimiento

# Seguridad
#### N/A
