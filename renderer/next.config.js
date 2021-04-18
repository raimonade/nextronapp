const withFonts = require('next-fonts');
const withSvgr = require('next-plugin-svgr');

const nextConfig = {
	webpack: (config) =>
		Object.assign(config, {
			target: 'electron-renderer',
		}),
};

module.exports = withFonts(withSvgr(nextConfig));
