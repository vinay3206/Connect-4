var path = require('path');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
   loaders: [
     {
       test: /\.css$/,
       loader: 'style-loader!css-loader'
     },
     {
       test: /\.scss$/,
       loader: 'style!css!sass?outputStyle=expanded&'
       + 'includePaths[]=' + (path.resolve(__dirname, './bower_components'))
       + '&'
       + 'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
     },
     {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'babel'
     },
     {
       test: /\.(png|jpg|jpeg|gif)$/,
       loader: "file-loader"
     },
     {
       test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
       loader: "url-loader?limit=10000&minetype=application/font-woff"
     },
     {
       test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
       loader: "file-loader"
     },
     {
       test: /\.json$/,
       include: path.join(__dirname, 'node_modules', 'pixi.js'),
       loader: 'json',
     },
   ],
   postLoaders: [
     {
       include: path.resolve(__dirname, 'node_modules/pixi.js'),
       loader: 'transform?brfs'
     }
   ]
 },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
