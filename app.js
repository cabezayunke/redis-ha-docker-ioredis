const Redis = require('ioredis')

let opts = {}
const test = process.env.SENTINELS_TEST || 'sentinels_use_master'
console.log(test)
switch(test) {
  case 'sentinels_use_master': {
    opts = {
      sentinels: [
        { host: 'redis-ha-sentinel1', port: 26379 },
        { host: 'redis-ha-sentinel2', port: 26379 },
        { host: 'redis-ha-sentinel3', port: 26379 },
      ],
      name: 'mymaster',
      password: 'redisPassword',
    }
  }
  break
  case 'sentinels_use_replicas': {
    opts = {
      sentinels: [
        { host: 'redis-ha-sentinel1', port: 26379 },
        { host: 'redis-ha-sentinel2', port: 26379 },
        { host: 'redis-ha-sentinel3', port: 26379 },
      ],
      name: 'mymaster',
      password: 'redisPassword',
      role: 'slave'
    }
  }
  break
  case 'single_master': {
    opts = {
      host: 'redis-ha-server1', // this is the master by default, might have changed if you've forced a failover
      port: 6379,
      password: 'redisPassword',
    }
  }
  break
  case 'single_replica': {
    opts = {
      host: 'redis-ha-server2',  // this is one of the replicas by default, might have changed if you've forced a failover
      port: 6379,
      password: 'redisPassword',
    }
  }
  break
}

const redis = new Redis(opts)
redis.on('ready', async () => {
  console.log(`>>> ready`)
  console.log('---------')
  try {
    console.log('getting foo key')
    const value = await redis.get('foo')
    console.log(value);
    console.log('setting foo key')
    const result = await redis.set('foo', `bar_${Date.now()}`)
    console.log(result)
    console.log('getting foo key again')
    const value2 = await redis.get('foo')
    console.log(value2);
    console.log('---------')
    process.exit(0)
  } catch (err) {
    console.warn(err)
    process.exit(1)
  }

})
redis.on('connect', () => console.log(`>>> connect`))
redis.on('error', (err) => {
  console.error(`error: ${err}`)
  process.exit(1)
})
redis.on('close', () => console.log(`close`))
redis.on('reconnecting', (data) => console.log(`reconnecting: ${data}`))
redis.on('end', (data) => console.log(`end: ${data}`))

