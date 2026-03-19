FROM denoland/deno:alpine-1.42.2

EXPOSE 7779

WORKDIR /app

COPY . .

CMD [ "run", "--unstable", "--watch", "--allow-net", "--allow-read", "--allow-env", "app.js" ]