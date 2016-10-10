module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', './js/script.js'],
  output: {
    path: './build',
    filename: '[name].js',
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-rest-spread'],
        },
      },
    ],
  },
};
