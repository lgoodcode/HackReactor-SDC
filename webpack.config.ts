import { resolve } from 'path'
import nodeExternals from 'webpack-node-externals'
import TerserPlugin from 'terser-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import NodemonWebpackPlugin from 'nodemon-webpack-plugin'
import type { Configuration, WebpackPluginInstance } from 'webpack'

const isProd = process.env.NODE_ENV === 'production'

const config: Configuration = {
  target: 'node',
  mode: isProd ? 'production' : 'development',
  entry: resolve(__dirname, 'server', 'index.ts'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'server.js',
    // Clear the directory before building
    clean: true,
  },
  // Disble source maps for production
  devtool: isProd ? false : 'inline-source-map',
  // Need to watch to restart the server on changes with nodemon
  watch: !isProd,
  // Specify node dependencies to exclude from the bundle to prevent errors
  externals: [nodeExternals()],
  optimization: {
    minimize: isProd,
    minimizer: [
      // The plugin used to access the swc engine to minify the bundle
      new TerserPlugin({
        parallel: true,
        minify: TerserPlugin.swcMinify,
      }),
    ],
  },
  // Specify the file extensions to resolve to avoid having to specify them in imports
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts'],
    alias: {
      '@': resolve(__dirname, 'server'),
    },
  },
  // Specify the loaders to use to process the files
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'swc-loader',
      },
    ],
  },
  // Specify the plugins to use to process the bundle
  plugins: [
    // Watches the files and restarts the server on changes
    isProd
      ? undefined
      : new NodemonWebpackPlugin({
          ext: '.ts',
          watch: ['./server/**/*'],
        }),
    // Runs type checking in a separate process to improve performance
    new ForkTsCheckerWebpackPlugin(),
  ].filter(Boolean) as WebpackPluginInstance[],
}

export default config
