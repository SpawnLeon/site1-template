const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

function generateHtmlPlugins(templateDir) {
  let templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  //if (isDev) {
  templateFiles = ['detail.html'];
  //}
  return templateFiles.map((item) => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
    });
  });
}

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const htmlPlugins = generateHtmlPlugins('./src/html/views');

const config = {
  entry: ['./src/js/index.js', './src/scss/styles.scss'],
  output: {
    filename: './js/bundle.js',
    publicPath: '',
  },
  devtool: isDev ? 'source-map' : '',
  mode: 'development',
  optimization: optimization(),
  devServer: {
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        //include: path.resolve(__dirname, 'src/scss'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: `./postcss.config.js`,
              },
            },
          },
        ],
      },

      {
        test: /\.(sa|sc)ss$/,
        //include: path.resolve(__dirname, 'src/scss'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: `./postcss.config.js`,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/html/includes'),
        use: ['raw-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './template_styles.css',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/fonts',
        to: './fonts',
      },
      {
        from: './src/favicon',
        to: './favicon',
      },
      {
        from: './src/img',
        to: './img',
      },
      {
        from: './src/uploads',
        to: './uploads',
      },
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ].concat(htmlPlugins),
};

module.exports = (env, argv) => {
  if (isProd) {
    config.plugins.push(new CleanWebpackPlugin());
    // config.plugins.push(
    //   new ImageminPlugin({
    //     plugins: [
    //       imageminMozjpeg({
    //         quality: 80,
    //         progressive: true,
    //       }),
    //     ],
    //   }),
    // );
  }
  return config;
};
