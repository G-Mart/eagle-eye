const Service = require('egg').Service;
class Msg extends Service {
  sendMsg(paramA, paramB) {
    const TopClient = require( './topClient' ).TopClient;
    const client = new TopClient({
       'appkey' : '23352198' ,
       'appsecret' : 'c8dd2b4bb0c50a98bf1d4b6b68e43b92',
       'REST_URL' : 'http://gw.api.taobao.com/router/rest'
    });
    client.execute('alibaba.aliqin.fc.sms.num.send', {
        'sms_type': 'normal',
        'sms_free_sign_name': '每日结算',
        'sms_param':'{\"filestate\":\"' + paramA + '\",\"filename\":\"' + paramB + '\"}',
        'rec_num':'13533828487,13929590471,13416416929,13416199362',
        'sms_template_code':'SMS_11485985'
    }, function(error, response) {
        if (!error) console.log(response);
        else console.log(error);
    });
  }
}
module.exports = Msg;