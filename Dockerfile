FROM node:23
COPY --chown=app:app . app/
COPY ./package.json /app/package.json 
WORKDIR /app
RUN npm i
EXPOSE 3400
CMD ["npm","run", "dev:astro"]
