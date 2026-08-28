# FieldScribe — static field-metadata app, packaged for SciLifeLab Serve.
# Base: nginx-unprivileged (runs as a non-root user), as recommended by the Serve team.
FROM nginxinc/nginx-unprivileged:alpine

# Switch to root only to copy files and set ownership; the container RUNS as uid 1000 (below).
USER root

# Serve expects a start-up script at the working directory.
WORKDIR /app

# Serve-compatible nginx config: listens on 8080, keeps pid/temp under /tmp so it
# runs cleanly as a non-root uid. Our full config does not include conf.d/, so the
# image's default server is not used.
COPY nginx.conf /etc/nginx/nginx.conf

# The application — a single self-contained file (all schemas are embedded).
COPY index.html /usr/share/nginx/html/index.html

# Start-up script at WORKDIR.
COPY start-script.sh /app/start-script.sh
RUN chmod +x /app/start-script.sh && chown -R 1000:1000 /app

# Serve requirement: run as non-root user id 1000.
USER 1000

# Serve requirement: listen on a port in the 3000–9999 range.
EXPOSE 8080

ENTRYPOINT ["./start-script.sh"]
