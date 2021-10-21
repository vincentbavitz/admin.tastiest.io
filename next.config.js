const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-svgr');

const nextConfig = {
  webpack(config, _options) {
    return {
      ...config,
    };
  },
  node: {
    fs: 'empty',
  },
  experimental: {
    jsconfigPaths: true,
  },
};

module.exports = withPlugins([withSvgr], nextConfig);
