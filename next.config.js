const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const withFonts = require('next-fonts')
const vuroxConfigPlugins = require('next-compose-plugins')

const fileSystem = require('fs')
const path = require('path')

const themeVariables = lessToJS(
    fileSystem.readFileSync(path.resolve(__dirname, './public/style/variables.less'), 'utf8')
)

const { PHASE_PRODUCTION_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = vuroxConfigPlugins([
	[withLess, {
	  	lessLoaderOptions: {
	    	javascriptEnabled: true,
	    	modifyVars: themeVariables, // make your antd custom effective
	  	},
	  	webpack: (config, { isServer }) => {
	    	if (isServer) {
	      		const antStyles = /antd\/.*?\/style.*?/
	      		const origExternals = [...config.externals]
	      		config.externals = [
	        		(context, request, callback) => {
	          			if (request.match(antStyles)) return callback()
	          if (typeof origExternals[0] === 'function') {
	            origExternals[0](context, request, callback)
	          } else {
	            callback()
	          }
	        },
	        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
	      ]

	      config.module.rules.unshift({
	        test: antStyles,
	        use: 'null-loader',
	      })
	    }
	    return config
	  },
	}],
	[withCss],
	[ withFonts ]
])
