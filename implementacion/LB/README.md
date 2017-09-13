# Disponibilidad
Primero se desactivo selinux:

#### /etc/sysconfig/selinux
    SELINUX=disabled
    
Se instalo HAProxy:

    yum install haproxy
    
Se configuro el HAProxy:
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

Se abrio el puerto 80:

        firewall-cmd --permanent --add-port=80/tcp
        firewall-cmd --reload
        
Se inicio el servicio de HAProxy:

        systemctl enable haproxy
        systemctl start haproxy

# Rendimiento

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


# Seguridad
#### N/A
