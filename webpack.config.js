const path = require('path');
const nodeExternals = require('webpack-node-externals');
const SwaggerJSDocWebpackPlugin = require('swagger-jsdoc-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@root': path.resolve(__dirname, 'src/'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@controllers': path.resolve(__dirname, 'src/api/controllers'),
      '@middlewares': path.resolve(__dirname, 'src/api/middlewares'),
      '@loaders': path.resolve(__dirname, 'src/loaders'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@route': path.resolve(__dirname, 'src/api/route'),
    },
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new Dotenv({ path: './production.env' }),
    new SwaggerJSDocWebpackPlugin({
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'Santry', // Title (required)
          version: '0.0.1', // Version (required)
          description: 'Santry Backend API', // Description (optional)
        },
      },
      apis: ['./src/swagger/**/*.yaml'],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ 
      terserOptions: { 
        ecma: 6, 
        compress: { drop_console: true }, 
        output: { comments: false }, 
      }
    })]
  }
};
