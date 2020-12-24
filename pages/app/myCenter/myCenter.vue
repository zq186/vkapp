<template>
	<view>
	
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">JerryAdmin</view>
<!--				<view class="u-font-14 u-tips-color">user name:helang_uView</view>-->
			</view>
			<!--<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view> -->
		</view>
		
		<view class="list-wrap">
			<u-cell-group title-bg-color="rgb(243, 244, 246)" :title="getGroupTitle(item)" v-for="(item, index) in list" :key="index">
				<u-cell-item :titleStyle="{fontWeight: 500}" @click="openPage(item1.path)" :title="getFieldTitle(item1)"
				 v-for="(item1, index1) in item.list" :key="index1">
					<image slot="icon" class="u-cell-icon" :src="getIcon(item1.icon)" mode="widthFix"></image>
				</u-cell-item>
			</u-cell-group>
		</view>
		 <u-tabbar :list="vuex_tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	import list from "./myCenter.config.js";
	export default {
		data() {
			return {
				pic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604420674241&di=347686d0146f7582233128df39ee3d9e&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D130e1bfd708b4710ce7af5c8f6feefcb%2Fb90e7bec54e736d186816fd499504fc2d4626958.jpg',
				show:true,
				list:list
			}
		},
		onLoad() {
			
		},
		computed: {
			getIcon() {
				return path => {
					return 'https://cdn.uviewui.com/uview/example/' + path + '.png';
				}
			},
			desc() {
				return this.$t('js.desc');
			}
		},
		methods: {
			openPage(path) {
				if(path==='../login/login')
				{
					uni.redirectTo({
					    url: path
					});
				}else{
					// this.$u.route({
					// 	url: path
					// })
					uni.navigateTo({
						url:path
					})
				}	
			
				
			},
			getGroupTitle(item) {
				return this.$i18n.locale == 'zh' ? item.groupName : item.groupName_en
			},
			getFieldTitle(item) {
				return this.$i18n.locale == 'zh' ? item.title : item.title_en
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
<style lang="scss" scoped>
	.u-cell-icon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 8rpx;
	}
</style>
