const Service = require('egg').Service;
class Msg extends Service {
  sendMsg(paramA, paramB) {
    const TopClient = require( './topClient' ).TopClient;
    const client = new TopClient({
       'appkey' : '' ,
       'appsecret' : '',
       'REST_URL' : 'http://gw.api.taobao.com/router/rest'
    });
    client.execute('alibaba.aliqin.fc.sms.num.send', {
        'sms_type': 'normal',
        'sms_free_sign_name': '每日结算',
        'sms_param':'{\"filestate\":\"' + paramA + '\",\"filename\":\"' + paramB + '\"}',
        'rec_num':'',
        'sms_template_code':'SMS_11485985'
    }, function(error, response) {
        if (!error) console.log(response);
        else console.log(error);
    });
  }
}
module.exports = Msg;