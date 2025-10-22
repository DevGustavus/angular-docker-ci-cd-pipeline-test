FROM node:22 AS builder
WORKDIR /app

# Recebe o argumento de build
ARG ENV=production
# Persiste no container se quiser
ENV ENV=$ENV

COPY package*.json ./
RUN npm ci
COPY . .

# Build Angular de acordo com o ENV
RUN if [ "$ENV" = "dvp" ]; then \
  npm run build:dvp; \
  else \
  npm run build; \
  fi

FROM nginx:alpine
COPY --from=builder /app/dist/angular-docker-ci-cd-pipeline-test/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
