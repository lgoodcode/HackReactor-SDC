import nodeExternals from 'webpack-node-externals'
import TerserPlugin from 'terser-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import type { Configuration } from 'webpack'

const isProd = process.env.NODE_ENV === 'production'

export default {
  target: 'node',
  mode: !isProd ? 'development' : 'production',
  entry: './server/index.ts',
  devtool: 'source-map',
  cache: { type: 'filesystem' },
  externals: [nodeExternals()],
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        minify: TerserPlugin.swcMinify,
      }),
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'swc-loader',
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
} as Configuration
