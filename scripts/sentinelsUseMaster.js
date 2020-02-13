const Redis = require('ioredis')

const redis = new Redis({
  sentinels: [
    { host: 'localhost', port: 26381 },
    { host: 'localhost', port: 26382 },
    { host: 'localhost', port: 26383 },
  ],
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
