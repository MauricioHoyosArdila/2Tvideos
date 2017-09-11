# Disponibilidad

#### /etc/sysconfig/selinux
    SELINUX=disabled

#### /etc/hosts
    10.131.137.169  app1
    10.131.137.244  app2
    10.131.137.235  mongo1
    10.131.137.243  mongo2
    10.131.137.168  mongo3

#### /etc/fstab
    mongo1:/uploads1 /mnt/uploads glusterfs defaults,_netdev 0 0

#### /etc/nginx/nginx.conf
    server {
        client_max_body_size 100M;
        listen       80 default_server;
        server_name  10.131.137.169;
        root    /usr/share/nginx/html;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header HOST $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://127.0.0.1:3001/;
        proxy_redirect off;
    }


# Rendimiento

# Seguridad
