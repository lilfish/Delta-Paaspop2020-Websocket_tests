FROM nginx
RUN echo "soft nofile 1024000" >> /etc/security/limits.conf
RUN echo "hard nofile 1024000" >> /etc/security/limits.conf

# RUN rm /etc/nginx/nginx.conf
# COPY nginx.conf /etc/nginx/nginx.conf