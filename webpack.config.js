const { resolve } = require('node:path');  //достаем функцию эту - кот умеет склеивать адреса
const HtmlWebpackPlugin = require('html-webpack-plugin'); //этот пакет будет использ как класс - это подключили плагин
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //этот пакет будет использ как класс - это подключили плагин для css


module.exports = (argv, env) => {
  // console.log(argv);
  // console.log(env);
  const isProd = env.mode === 'production';  //в константе хранится либо true либо false -- могу исп как условие



  return {
    target: 'web',            //цель приложения
    mode: 'development',     //режим разработки жестко указан у нас
    devtool: 'source-map', //чтобы исходники посмотреть в консоли оригинальные - желательно чтобы в продакшн-версии они были для отладки тоже

    entry: {
      main: './src/index.ts',         //наш главный чанк с именем main - точка входа
    },

    output: {         //директорию указать куда все сложить скомпилировааное
      publicPath: '/',  //при обновлении страницы адреса сохраняются
      path: resolve(__dirname, './dist'),       //указать полный путь надо - 2 аргумента склеятся - это и будет путь
      filename: '[name].[contenthash].js',      //в name подставится мой главный чанк main, [contenthash] - если содержимое файла меняется - то и [contenthash] поменяется - это просто набор цифр и букв в имени main
      clean: true,           //чтобы директорию - куда будет все складывать - предварительно очистил
    },

    resolve: {
      extensions: ['.ts', '.js'],    //вебпак будет пытаться дописывать расширения к нашим импортам
    },

    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|svg)$/,   //название фото заканчиваются на ...
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext]' //из-за хеша будут фото переименованы по-разному в dist
          },
        },

        {
          test: /\.ts$/,
          use: 'ts-loader',  //лоадер для ts - скомпилирует ts в js
        },

        {
          test: /\.s?css$/,   //этим лоадером можно обработать scss и css
          exclude: /\.module\.s?css$/, //скажем чтобы первое правило не трогало  файлы с module
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',  //чтобы понимал плагин какие файлы ему вырезать из js файла. В больших пректах лучше чтобы отрабатывал style-loader - он быстрее. А для прдакшн версии лучше миницсс 
            'css-loader',  //стандартный loader
            'sass-loader',   //один и тот же лоадер для sass и scss
          ]
        },

        {
          test: /\.module\.s?css$/,   //имя файла начинается с module.scss или .css 
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',  //чтобы понимал плагин какие файлы ему вырезать из js файла. В больших пректах лучше чтобы отрабатывал style-loader - он быстрее. А для прдакшн версии лучше миницсс 
            {
              loader: 'css-loader',
              options: {      //укажем как дб настроен специфич css-loader
                esModule: true,
                modules: {
                  exportLocalsConvention: 'camelCaseOnly',   //экспортировать классы как сС
                  localIdentName: '[name]__[local]--[hash:base64:5]',  //и задали шаблон как переименовывать css-класс
                },
              },
            },
            'sass-loader',   //один и тот же лоадер для sass и scss
          ]
        },


      ],
    },

    plugins: [
      new HtmlWebpackPlugin({          //подключаем это плагин для html 
        template: './src/index.html',  // путь к html файлу - куда мы будем скрипты вставлять, стили и тд
        inject: 'head',
        scriptLoading: 'defer'
      }),
      new MiniCssExtractPlugin({   //вставит в html тег link с сыллкой на файл кот он вытащит из main.js 
        filename: '[name].[contenthash].css'   //имя чанка подставится
      })
    ],



  };
}