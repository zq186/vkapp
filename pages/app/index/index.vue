<template>
	<view>
		<view class="u-page">
			<!-- 所有内容的容器 -->
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		 <u-tabbar v-model="current" :list="vuex_tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				current: 0,
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
