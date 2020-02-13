# redis-ha-docker-ioredis
Redis HA environment with docker-compose and ioredis client

### Run

`docker-compose up --build`

Check in the logs how the replicas sync with the master and how the sentinels monitor the master.


#### Test failover

* Check master and slaves from a sentinel (either connect to the container to run commands on it or use shorcut commands)

`npm run show:master`

`npm run show:slaves`


* Pause master container

`docker-compose pause redis-ha-server1`

Wait 10s and watch sentinels promote a replica as new master (quorum is 2 so after 2 replicas have agreed upon a sdown event it will trigger the failover)

* Check master and slaves again. 

You should see a new master and the old master as slave.

* Add master back to the cluster

`docker-compose unpause redis-ha-server1`

This container has now become a replica and you should see in the logs how it syncs to the new master.

* Set server1 as master again

server2 and 3 have priority as slaves (check docker-compose), so if you force a failover when ther server1 is backup, it will be set as the master again

`npm run failover`

Double check it worked: `npm run show:master`

#### Try client connection

`node scripts/writeOnMaster.js` will directly connect to server1(master), write a key and read it back again.

`node scripts/writeErrorOnReplica.js` will directly connect to server2(replica) nad try to write a key which will fail.
