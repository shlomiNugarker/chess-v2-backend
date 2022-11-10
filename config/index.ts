let configSrc =
  process.env.NODE_ENV === 'production' ? require('./prod') : require('./dev')

export default configSrc
