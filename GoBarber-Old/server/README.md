# My template for NodeJS with Docker and Docker Compose.

This template was created with `yarn init -y` and added `express` with main dependence, the other dependencies can be seen in `package.json`.

To know more about Yarn go to [Yarn](https://yarnpkg.com/lang/en/)
and to know more about ExpressJS go to [Express](https://expressjs.com/).

## Getting Started

To download and install Docker go to [Docker](https://www.docker.com).

Clone this repository:

```
git clone https://github.com/felipepichl/template_nodejs.git
```

Chenge the `remote origin` for using your remote directory in github.

To list remote directory.

```
git remote -v
```

To delete remote directory.

```
git remote rm origin
```

Now you can run `git remote add origin YOUR_REPOSITORIE` and the commands needed to use github

## How To Use

Start Docker containers:

> In order to change container names in `docker-compose.yml`,
> change the line `container_name: app_example` to a name you prefer the most

```
docker-compose up
```

> Run this step for the first time builds the container images.
> This process can take a while If you do not have the images of the node or postgres in your machine.

## What Next

To access your image's command line you can run the command below, you can only use the image's terminal.

```
docker exec -it YOUR_APP_NAME sh
```

This name is defined in docker-compose.yml in `container_name: app_example`

## If you will not use dockercompose follow these steps:

```
docker build -t IMAGE_NAME/node .
```

> Change IMAGE_NAME to a name you choose, it's recommended to use a suggestive name.

```
docker run --name CONTAINER_NAME -p 3333:3333 IMAGE_NAME
```

> Change CONTAINER_NAME to a name you choose, in IMAGE_NAME you must use the command name above.
