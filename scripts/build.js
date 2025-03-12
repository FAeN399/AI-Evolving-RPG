/**
 * Build script for AI-Evolving RPG
 * 
 * This script configures and runs the webpack build process.
 */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const args = process.argv.slice(2);
const mode = args.includes('--production') ? 'production' : 'development';

console.log(`Building in ${mode} mode...`);

const config = {
  mode,
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../build/web_build'),
    filename: 'bundle.[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.(mp3|wav)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/audio/[hash][ext][query]'
        }
      },
      {
        test: /\.glsl$/,
        type: 'asset/source'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'AI-Evolving RPG',
      favicon: './src/assets/favicon.ico',
      meta: {
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': '#000000'
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode)
    })
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@systems': path.resolve(__dirname, '../src/systems'),
      '@scenes': path.resolve(__dirname, '../src/scenes')
    }
  },
  devtool: mode === 'development' ? 'eval-source-map' : false,
  devServer: {
    static: './build/web_build',
    hot: true,
    open: true,
    historyApiFallback: true
  },
  performance: {
    hints: mode === 'production' ? 'warning' : false
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
};

// Execute webpack build
if (require.main === module) {
  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(err || stats.toString({
        chunks: false,
        colors: true
      }));
      process.exit(1);
    }
    
    console.log(stats.toString({
      chunks: false,
      colors: true
    }));
    console.log('Build completed successfully!');
  });
}

module.exports = config;
