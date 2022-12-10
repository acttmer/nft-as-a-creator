const webpack = require('webpack')

module.exports = {
  webpack: {
    configure: {
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
      resolve: {
        fallback: {
          buffer: require.resolve('buffer'),
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify'),
        },
      },
    },
  },
}
