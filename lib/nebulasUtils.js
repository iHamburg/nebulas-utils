/**
 * Created by zhangyiqing on 2018/6/11.
 */

let nebulas  = require( 'nebulas');
// let NebPay = require( 'nebpay.js');

// let nebPay = new NebPay();
let neb = new nebulas.Neb();

let nebServerUrl = 'https://testnet.nebulas.io'
// let dappAddress

var NebulasUtils = function (dappAddress, options) {
  // console.log('constructor ', dappAddress);
  this.dappAddress = dappAddress
  this.nebServerUrl = nebServerUrl
  if (options) {
    this.nebServerUrl = options.nebServerUrl
  }
}

NebulasUtils.prototype.query = function (fcn, args, callback) {
  const Account = nebulas.Account;
  neb.setRequest(new nebulas.HttpRequest(this.nebServerUrl));
  args = this.getCallArgs(args)
  const from = Account.NewAccount().getAddressString();
  const value = '0';
  const nonce = '0';
  const gas_price = '1000000';
  const gas_limit = '2000000';
  const contract = {
    function: fcn,
    args,
  };

  neb.api.call(from, this.dappAddress, value, nonce, gas_price, gas_limit, contract).then((resp) => {
    // console.log('response of query:', JSON.stringify(resp));
    let result = resp.result;  // string
    console.log(args, result);
    let err = resp.execute_err;
    if (err && err != 'insufficient balance')
      return callback(err)

    callback(null, result)

  }).catch((err) => {
    // console.log(`Error ${fcn} :${err.message}`);
    callback(err.message)
  });
}

NebulasUtils.prototype.getCallArgs = function(list) {
  if (list.constructor !== Array){
    // console.log(list, 'is not array');
    list = [list]
  }
  // console.log('list ', list);
  let str = '['
  list.forEach((value, index) =>{
    str += '"' + value + '",'
  })
  str = str.slice(0, str.length -1)
  str+=']'
  return str
}

NebulasUtils.prototype.print = function () {
  
  console.log('dassAddress', this.dappAddress, 'SERVER URL', this.nebServerUrl);
}

NebulasUtils.prototype.queryPromise = function(fcn, args) {
  return new Promise((resolve, reject) => {
    const Account = nebulas.Account;
    neb.setRequest(new nebulas.HttpRequest(this.nebServerUrl));
    args = this.getCallArgs(args)
    const from = Account.NewAccount().getAddressString();
    const value = '0';
    const nonce = '0';
    const gas_price = '1000000';
    const gas_limit = '2000000';
    const contract = {
      function: fcn,
      args,
    };

    neb.api.call(from, this.dappAddress, value, nonce, gas_price, gas_limit, contract).then((resp) => {
      // console.log('response of query:', JSON.stringify(resp));
      let result = resp.result;  // string
      // console.log(args, result);
      let err = resp.execute_err;
      if (err && err != 'insufficient balance')
        return reject(err)

      resolve(result)
    })
  })
},

module.exports = NebulasUtils