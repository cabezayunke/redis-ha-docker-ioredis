const Redis = require('ioredis')

const redis = new Redis({
  host: 'localhost',
  port: 6383,
  name: 'mymaster',
  password: 'redisPassword'
});

redis.on('ready', () => {
  console.log(`>>> ready`)
  console.log('setting foo key')
  redis.set('foo', 'bar').catch(console.error)
})
