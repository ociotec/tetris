# Tetris

Tetris game clone in a HTML page based on JavaScript.

## Run inside docker container

To run the docker container win an nginx server on port `8888`, just execute:

```
docker run --name tetris --detach --publish 8888:80 --restart always ociotec/tetris
```

## Build the docker image

Just run:

```
docker image build --tag ociotec/tetris .
```
