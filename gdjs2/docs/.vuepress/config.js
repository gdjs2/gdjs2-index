const { config } = require("vuepress-theme-hope");

module.exports = config ({
	title: "gdjs2's Homepage",
	description: "Comming soon...",
	host: "0.0.0.0",
	port: "8080",
	theme: 'vuepress-theme-hope',
	host: "localhost",
	themeConfig: {
		hostname: "localhost",
		footer: {
			display: true,
			copyrightText: 'MIT LICENSE',
			content: 'Copyright © 2021 gdjs2 | <a href="http://beian.miit.gov.cn">粤ICP备2021110955</a>'
		}
	}
})