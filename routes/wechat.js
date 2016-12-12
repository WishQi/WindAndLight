var router = require('koa-router')();
var crypto = require('crypto');
const querystring = require('querystring');

var verifyInfo = {  //验证信息
    token: 'WeChatMaoge',  // your wechat token
    appid: 'wxf540ae16cc7b380d',
    encodingAESKey: 'VsIy0UESAMpD6FS5DpDW4ccKIe9dXTtffysKLlmG0oO'
    // signature: 'ce9689eca9b612cb679899e9e9ffe2bf5ea1a41b',
    // echostr: '6748768348601843615',
    // timestamp: '1481438358',
    // nonce: '53846050'
};

router.get('/verify', function *(next) {
    var url = this.request.url;
    var params = querystring.parse(url.split('?')[1]);
    console.log(params);

    var arr = [params.timestamp, params.nonce, verifyInfo.token].sort();
    console.log(arr);
    var str = '';
    for (index in arr) {
        str += arr[index];
    }
    console.log(str);

    var sha1 = crypto.createHash('sha1');
    var sha1result = sha1.update(str).digest('hex');
    console.log(sha1result);

    if (sha1result == params.signature) {
        console.log('true');
        this.response.body = params.echostr;
    } else {
        console.log('false');
        return false;
    }
});

module.exports = router;
