const BaseService = require('./base');
class CrawlerTask extends BaseService {
  /**
   * 运行任务
   */
  async runTask() {
    const funcName = 'runTask';

    try {
      // get base data
      const baseUrl = 'https://api-otc.huobi.pro/v1/otc/base/market/price';
      const { data: baseBody } = await this.app.curl(baseUrl, {
        method: 'GET',
        timeout: 60000,
        dataType: 'json',
        contentType: 'json',
      });
      if (!baseBody || !baseBody.data) { return; }
      const USDTItem = baseBody.data.find(item => {
        return item.coinId === 2;
      });
      const USDTBasePrice = USDTItem.price;

      // get ad data
      const outerResourceService = this.ctx.service.outerResource;
      const resDataList = await outerResourceService.btc.analyse();

      // find min price
      let minItem = resDataList[0];
      resDataList.forEach(item => {
        if (item.price < minItem.price) { minItem = item; }
      });

      // find min minTradeLimit
      const minPrice = minItem.price;
      resDataList.forEach(item => {
        if (item.price <= minPrice && item.minTradeLimit < minItem.minTradeLimit) { minItem = item; }
      });

      console.log(`length: ${resDataList.length} | currentPage: ${minItem.page} | userName: ${minItem.userName} | minTradeLimit: ${minItem.minTradeLimit} | basePrcie: ${USDTBasePrice} | price: ${minItem.price} | percent: ${(minItem.price - USDTBasePrice) / USDTBasePrice}`);

      if ((minItem.price - USDTBasePrice) / USDTBasePrice < 0.15 && minItem.price < 7) {
        const paramsA = `\n currentPage: ${minItem.page} \n userName: ${minItem.userName} \n basePrcie: ${USDTBasePrice} \n`; 
        const paramsB = `\n minTradeLimit: ${minItem.minTradeLimit} \n price: ${minItem.price} \n percent: ${(minItem.price - USDTBasePrice) / USDTBasePrice} \n`;
        this.ctx.service.msg.msg.sendMsg(paramsA, paramsB);
      }

      return true;
    } catch (e) {
      this.app.logError(this.ctx, funcName, { e });
      return false;
    }
  }
}
module.exports = CrawlerTask;
