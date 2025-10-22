FROM node:22 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

# Recebe valor da env var, se existir
ARG ENV
ENV ENV=${ENV:-production}

# Loga o valor recebido e executa o build correto
RUN echo "\n=============================" && \
  echo "🧱 Iniciando build com ENV: $ENV" && \
  echo "=============================\n" && \
  if [ "$ENV" = "dvp" ]; then \
  echo "🚀 Executando build de desenvolvimento (npm run build:dvp)"; \
  npm run build:dvp; \
  else \
  echo "🏗️ Executando build de produção (npm run build)"; \
  npm run build; \
  fi && \
  echo "\n✅ Build finalizado com sucesso para o ambiente: $ENV\n"

FROM nginx:alpine
COPY --from=builder /app/dist/angular-docker-ci-cd-pipeline-test/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
