# Disponibilidad

#### N/A

# Rendimiento
#### N/A
# Seguridad

#### Dominio: proyecto24.dis.eafit.edu.co

#### Ip: 200.12.180.86

#### Para addicionar el dóminio (asignado por el profesor) al certificado ya existente:

      $ sudo systemctl stop haproxy
      
      $ sudo /root/certbot-auto certonly --cert-path /etc/letsencrypt/archive/st0263.dis.eafit.edu.co --expand -d proyecto19.dis.eafit.edu.co

      $ sudo /root/certbot-auto certonly -d st0263.dis.eafit.edu.co  --expand -d proyecto19.dis.eafit.edu.co
      
#### Crear el archivo proyecto24.pem, el cual es el certificado para el dominio asignado:

      Los siguientes archivos quedan en la ruta /etc/letsencrypt/live/st0263.dis.eafit.edu.co/
        - fullchain.pem
        - privkey.pem 
      
      Estos archivos se concatenan y se guardan en /etc/haproxy/certs/proyecto24.pem
      
        $ sudo cat /etc/letsencrypt/live/st0263.dis.eafit.edu.co/fullchain.pem /etc/letsencrypt/live/st0263.dis.eafit.edu.co/privkey.pem > /etc/haproxy/certs/proyecto24.pem

#### Por último se configura el archivo /etc/haproxy/haproxy.cfg

      frontend https
        bind proyecto24.dis.eafit.edu.co:443    ssl     crt     /etc/haproxy/certs/proyecto24.pem
        acl host_proyecto24 hdr(host) -i proyecto24.dis.eafit.edu.co
        use_backend proyecto24_cluster if host_proyecto24
        
      frontend http *:80
        acl host_proyecto24 hdr(host) -i proyecto24.dis.eafit.edu.co
        use_backend proyecto24_cluster if host_proyecto24
      
      backend proyecto24_cluster
        balance leastconn
        option httpclose
        cookie JSESSIONID prefix
        server node2 10.131.137.203:80

      frontend  main *:5000
        acl url_static       path_beg       -i /static /images /javascript /stylesheets
        acl url_static       path_end       -i .jpg .gif .png .css .js .scss
        use_backend static          if url_static
        default_backend             app
        
      backend static
        balance     roundrobin
        server      static 127.0.0.1:4331 check

      backend app
        balance     roundrobin
        server  app1 127.0.0.1:5001 check
        server  app2 127.0.0.1:5002 check
        server  app3 127.0.0.1:5003 check
        server  app4 127.0.0.1:5004 check

      
#### Se reinicia el servicio haproxy:

      $ sudo systemctl restart haproxy

#### Se prueba en:
      - http://proyecto24.dis.eafit.edu.co
      - https://proyecto24.dis.eafit.edu.co
