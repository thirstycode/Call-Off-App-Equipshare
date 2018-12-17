

const path = require('path');
const nodeExternals = require('webpack-node-externals');
console.log("$$$$$$$$$$$$$$$$$$$$$$$$"+__dirname);
module.exports = {
  target: "node",
  mode: 'production',
  entry: {
  // 	// path: path.resolve(__dirname, ""),
    app: ["./bin/www"]
  //    // entry: path.resolve(__dirname, '../bin') + 'www',
  },
  node: {
   fs: "empty"
},
  // entry:"./src/www",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "bundle-back.js"
  },
    resolve: {
        extensions: ['','.js'],
        root: path.join(__diranme, ''),
    },
  externals: [nodeExternals()],
};