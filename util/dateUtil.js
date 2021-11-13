const moment = require('moment')
const dateFormatterHelper = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  };
  
  module.exports = dateFormatterHelper;