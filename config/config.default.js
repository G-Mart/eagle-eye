const path = require('path');
const rootJoin = path.join.bind(process.cwd());
const paths = { logDir: rootJoin('private', 'log') };

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1507798838499_2134';

  // 日志配置
  config.logger = {
    dir: paths.logDir, // 日志存储目录
    rotateLogDirs: [ paths.logDir ], // 自动按日切割目录
    appLogName: 'app-log.log'
  };

  return config;
};
