module.exports = app => {
  return {
    schedule: {
      interval: 5000,
      immediate: true,
      type: 'worker',
      disable: false
    },
    async task(ctx) {
      await ctx.service.crawlerTask.runTask();
    }
  };
};
