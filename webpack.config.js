const path = require('path');
const fs = require('fs');

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

console.log(`development - ${isDev}`);
console.log(`production - ${isProd}`);

function generateHtmlPlugins(templateDir) {
  let templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  templateFiles = ['article.html'];
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
  entry: ['./src/js/index.js', './src/scss/style.scss'],
  output: {
    filename: './js/bundle.js',
    publicPath: '',
  },
  devtool: isDev ? 'source-map' : '',
  mode: 'development',
  optimization: optimization(),
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, 'src/scss'),
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
              ident: 'postcss',
              sourceMap: true,
              plugins: () => [
                require('cssnano')({
                  preset: [
                    'default',
                    {
                      discardComments: {
                        removeAll: true,
                      },
                    },
                  ],
                }),
              ],
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
  ].concat(htmlPlugins),
};

module.exports = (env, argv) => {
  if (isProd) {
    config.plugins.push(new CleanWebpackPlugin());
    config.plugins.push(
      new ImageminPlugin({
        plugins: [
          imageminMozjpeg({
            quality: 80,
            progressive: true,
          }),
        ],
      }),
    );
  }
  return config;
};
