## Run Migration

`sequelize db:migrate`

## Run Seeder

`sequelize db:seed:all`

# START THE KAFKA ENVIRONMENT

## Kafka with ZooKeeper

### Start Zookeper Service

`bin/zookeeper-server-start.sh config/zookeeper.properties`

### Start the Kafka broker service

`bin/kafka-server-start.sh config/server.properties`

## Run Node

`node app.js`
