var path = require("path"),
webpack = require('webpack'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
ExtractTextPlugin = require("extract-text-webpack-plugin");
var ENV = process.env.NODE_ENV,
    isProd = ENV === "production" ? true : false,
    BUILD_DIR = path.resolve(__dirname, 'dist'),
    APP_DIR = path.resolve(__dirname, './'),
    ROOT_DIR = path.resolve(__dirname),
    NODE_MODULES = path.resolve(__dirname, 'node_modules');

var config = {
   entry:  (isProd ? APP_DIR + "/libs/Component/VisualSearch.jsx" : APP_DIR + "/example/main.js"),
   output: {
      path: (isProd ? BUILD_DIR : ROOT_DIR),
      filename: 'bundle.js'
   },
   plugins: [
        new HtmlWebpackPlugin({
            title: 'VisualSearch',
            template: 'index.ejs',
            filename: ROOT_DIR + '/index.html'
        }), new ExtractTextPlugin({
            // Extracting all css in one file, and file name is based on what you specified in filename
            filename: "visual_search.css",
            allChunks: true
        }), new webpack.ProvidePlugin({
            "React": "react",
        }),

    ],
    resolve: {
        modules: [
            APP_DIR,
            NODE_MODULES
        ],
        extensions: ['.js', '.jsx', '.json', '.css']
    },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
         },
         {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          loader: "url-loader?limit=100000"
         },{
          test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
          loader: 'url-loader'
         },{
          test: /\.css$/,
          loader: 'style-loader!css-loader'
         }
      ]
   }
}

if (!isProd) {
    config['devtool'] = 'inline-source-map';
    config['cache'] = true;
}
module.exports = config;
