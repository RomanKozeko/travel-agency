const redis = require('redis');
const chalk = require('chalk');

class Redis {
  constructor() {
    const client = redis.createClient();

    client.on('error', (err) => {
      console.log("Error " + err);
    });
    
    client.on('connect', () => {
      chalk.green('✓ Redis connected')
    })

    return client;
  }

  static get instance() {
    if (!this.client) {
      this.client = new Redis();
    }

    return this.client;
  }
  
  static set instance(v) { throw "Can't change constant property!" }
}

module.exports = Redis;