import { type ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';
import { type BuildOptions } from './types/types';

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
  const { mode } = options;

  const isDev = mode === 'development';

  const tsLoader = {
    // ts-loader из коробки работает с JSX. Иначе пришлось бы настраивать babel-loader
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: isDev,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [autoprefixer()],
          },
          sourceMap: isDev,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: isDev,
        },
      },
    ],
  };

  return [tsLoader, cssLoader];
};