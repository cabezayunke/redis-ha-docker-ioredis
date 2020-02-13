const Redis = require('ioredis')

const redis = new Redis({
  host: 'localhost',
  port: 6381,
  name: 'mymaster',
  password: 'redisPassword'
});

redis.on('ready', () => {
  console.log(`>>> ready`)
  console.log('setting foo key')
  redis.set('foo', 'bar').then((data) => {
      console.log(data)
      console.log('getting foo key')
      return redis.get('foo')
  }).then((data) => {
      console.log(data);
  }).catch(console.error)
})

