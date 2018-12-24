
module.exports = function(raw, allowed = [], notallowes = []){
    return  Object.keys(raw)
    .filter(key => allowed.includes(key) && !notallowes.includes(key))
    .reduce((obj, key) => {
      obj[key] = raw[key];
      return obj;
    }, {});
}


// console.log(Filter( {
//     item1: { key: 'sdfd', value:'sdfd' },
//     item2: { key: 'sdfd', value:'sdfd' },
//     item3: { key: 'sdfd', value:'sdfd' }
//   },  ['item1', 'item9']));