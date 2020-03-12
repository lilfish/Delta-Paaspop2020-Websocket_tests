FROM nginx
RUN echo "soft nofile 1024000" >> /etc/security/limits.conf
RUN echo "hard nofile 1024000" >> /etc/security/limits.conf

# RUN rm /etc/nginx/nginx.conf
COPY adminpanel.conf /etc/nginx/sites-available/adminpanel.conf
COPY clientapp.conf /etc/nginx/sites-available/clientapp.conf