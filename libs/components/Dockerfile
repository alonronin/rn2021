FROM pierrezemb/gostatic

WORKDIR /app

COPY ./dist/storybook/components /app/

CMD ["-port", "3000", "-fallback", "index.html", "-path", "/app"]

