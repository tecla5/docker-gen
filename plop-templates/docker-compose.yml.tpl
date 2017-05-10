version: "3.0"

services:
  nats:
    build:
      context: "./nats"
    expose:
      - "4222"
    ports:
      - "4222:4222"
      - "8222:8222"
    hostname: nats-server

  api:
    build:
      context: "./api"
    depends_on:
      - nats
    labels:
      - "traefik.backend=api"
      - "traefik.frontend.rule=PathPrefix: /api"
      - "traefik.port=8789"
      - "traefik.frontend.entryPoints=http"
    environment:
      NATS_URL: nats://nats:4222
      NATS_USER: ruser
      NATS_PW: T0pS3cr3t
      API_PORT: 8789
      API_HOST: 0.0.0.0
      HEMERA_LOG_LEVEL: silent

  {{#each dockerServices }}
  {{ dashCase name }}:
    labels:
      id: {{ id }}
      node-red: true
      description: {{ description }}
      framework: {{ framework }}
      topic: {{ topic }}
      pattern: {{{ pattern }}}
    build:
      context: "./services/{{ dashCase name }}"
    links:
      - nats
    depends_on:
      - nats
    deploy:
      mode: replicated
      replicas: {{ swarmCount }}
      labels: [APP={{ dashCase name }}]
      placement:
        constraints: [node.role == worker]
    restart: always
    environment:
      NATS_URL: nats://nats:4222
      NATS_USER: ruser
      NATS_PW: T0pS3cr3t
      HEMERA_LOG_LEVEL: silent
  {{/each }}

  traefik:
    image: traefik
    command: --web --docker --docker.domain=docker.localhost --logLevel=DEBUG
    ports:
      - "8182:80"
      - "8181:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /dev/null:/traefik.toml
