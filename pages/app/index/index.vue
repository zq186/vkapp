<template>
	<view>
		<view class="u-page">
			<!-- 所有内容的容器 -->
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				
				current: 0,
				tabbar: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						count: 2,
						isDot: true,
						customIcon: false,
						pagePath:'pages/app/index/index'
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						count: 22,
						isDot: false,
						customIcon: false,
						pagePath:'pages/app/setting/setting'
					},
				]
			};
		},
		onLoad() {
		},
		computed: {
			
		},
		methods: {
		}
	};
</script>


</style>
