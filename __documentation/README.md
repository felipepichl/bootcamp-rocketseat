# Configuring Mongo

**Creating Container**

`docker run --name gostack-mongo -p 27017:27017 -d -t mongo`

# Environment Variables

remove `ormconfig.json` git.

`git rm --cached ormconfig.json`

# Class Transformers

`secret: process.env.APP_SECRET || 'default'`

# Configuring cache

`docker run --name gostack-redis -p 6379:6379 -d -t redis:alpine`