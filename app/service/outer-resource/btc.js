const Service = require('egg').Service;
class BTC extends Service {
  async analyse() {
    return  await this.getAdData(1, []);
  }

  async getAdData(page, arr) {
    // get ad data
    const signUrl = `https://api-otc.huobi.pro/v1/otc/trade/list/public?coinId=2&tradeType=1&currentPage=${page}&payWay=&country=&merchant=0&online=1&range=0`;
    let { data: body } = await this.app.curl(signUrl, {
      method: 'GET',
      data: {
        currPage: page
      },
      timeout: 60000,
      dataType: 'json',
      contentType: 'json',
    });

    if (!body || !body.data) { return; } 
    const buildData = body.data.map(item => {
      item.page = page;
      return item;
    });
    const newArr = arr.concat(buildData);

    if (body.data.length > 0) {
      return await this.getAdData(++page, newArr);
    } else {
      return newArr;
    }
  }
}
module.exports = BTC;
