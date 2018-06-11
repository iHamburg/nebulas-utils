/**
 * Created by zhangyiqing on 2018/6/11.
 */

let NebulasUtils = require('../index')

let nebulasUtils = new NebulasUtils('n1mzNMuZLcmyipr4h15BxwqU8SfFWuDAiC3', {
  nebServerUrl: 'https://mainnet.nebulas.io'
})

// nebulasUtils.print()

nebulasUtils.query('login', ['123', 'sss'], (err) => {
  if (err) {
    return console.log('err #', err);
    // return callback(err)
  }

  // console.log(result);
})

