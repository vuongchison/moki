const fs = require('fs');

class File{
    static storeData(data, path){
        try {
          fs.writeFileSync(path, JSON.stringify(data))
        } catch (err) {
          console.error(err)
        }
      }

      static loadData(path){
        try {
          return JSON.parse(fs.readFileSync(path, 'utf8'))
        } catch (err) {
          console.error(err)
          return false
        }
      }

}
module.exports = File