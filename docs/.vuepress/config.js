module.exports = {
	title: "惊梦三更",
	theme: "reco",
	head: [
		['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
		['link', { rel: 'icon', href: './favicon.ico'}]
	],
	locales: {
		"/": {
			lang: 'zh-CN'
		}
	},
	themeConfig: {
		type: "blog",
		author: "gdjs2",
		authorAvatar: '/avatar.png',
		record: "粤ICP备2021110955号",
		recordLink: "http://beian.miit.gov.cn",
		cyberSecurityRecord: "粤公网安备 44030502007941号",
		cyberSecurityLink: "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502007941",
		startYear: "2021",
		subSidebar: 'auto',
		sidebar: 'auto',
		// logo: '/logo.png',
		lastUpdated: '上次更新',
		smoothScroll: true,
		blogConfig: {
			category: { location: 2, text: "分类" },
			tag: { location: 3, text: "标签" }
		},
		friendLink: [
			{
				title: 'Trust_04zh',
				desc: 'CTFer，南方科技大学 2020 级本科生，Smart，Brilliant',
				email: 'trust04zh@gmail.com',
				logo: 'http://www.trust04zh.xyz/img/ava.jpg',
				link: 'http://www.trust04zh.xyz'
			}
		],
		nav: [
			{ text: "时间轴", link: "/timeline/", icon: "reco-date" },
			{ text: "Github", link: "https://github.com/gdjs2", icon: "reco-github" },
			{ text: "关于", link: "/about/", icon: "reco-account" }
		]
	},
}