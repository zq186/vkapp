<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
				<view class="u-item-title">Serial Number: Value here</view>
				<view class="u-item-title">Tag Number: Value here</view>
				<view class="u-item-title">Model Number: Value here</view>
				<view class="u-item-title">Manufacturer: Value here</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				Valve Images Information
			</view>
			<view>
				<u-button @click="showImageTypeSelection = true">Upload Images</u-button>
				<u-select v-model="showImageTypeSelection" :list="imageSelectType" @confirm="confirm"></u-select>
			</view>
			<view class="u-demo-wrap">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<view class="page-box">
						<u-grid :col="2">
							<view v-for="(item, index) in  imageList" :key="index">
								<u-grid-item>
									<image :src="item.src" width="250rpx" height="250rpx"></image>
								</u-grid-item>
							</view>
						</u-grid>
					</view>
				</scroll-view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				show: true,
				bgColor: '#ffffff',
				borderTop: true,
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#5098FF',
				showImageTypeSelection: false,
				imageSelectType: [
					{
						value: '1',
						label: 'Camera'
					},
					{
						value: '2',
						label: 'Gallary'
					}
				],
				list: [{
						iconPath: "/static/uview/example/min_button.png",
						selectedIconPath: "/static/uview/example/min_button_select.png",
						text: 'Add Image',
						midButton: true,
						customIcon: false,
					}],
				imageList:[
					{
						id: 1,
						src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604422766169&di=7507d548d8c042746907b2f3944b9431&imgtype=0&src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2015%2F749%2F942%2F2616249947_556392056.jpg'
					},
					{
						id: 2,
						src:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=188133365,2901067113&fm=26&gp=0.jpg'
					},
					{
						id: 3,
						src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604422766156&di=6cd59894d40103fd5b3f4439d9a9a8cb&imgtype=0&src=http%3A%2F%2Fi03.c.aliimg.com%2Fimg%2Fibank%2F2014%2F211%2F198%2F1876891112_970172961.310x310.jpg'
					},
					{
						id: 4,
						src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604422815387&di=6d61b3ae6ee86f54601986a11a22eb2d&imgtype=0&src=http%3A%2F%2Ffile.youboy.com%2Fa%2F26%2F4%2F4%2F7%2F6908087s.jpg'
					},
					{
						id: 5,
						src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604422815386&di=891bc2f01683ad4bca5252fd95eae4ee&imgtype=0&src=http%3A%2F%2Fimg24.hc360.cn%2F24%2Fbusin%2F178%2F130%2Fb%2F24-178130664.jpg'
					},
					{
						id: 6,
						src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604422815381&di=376b5c88aeff17edca59c47b609b3332&imgtype=0&src=http%3A%2F%2Fimg2018.cn5135.com%2Fuploads%2FPic%2F2018%2F4%2F17%2F112089_20184179102673.jpg'
					}
					
				]
			}
		},
		methods: {
			confirm(e) {
				console.log(e[0].value);
				switch(e[0].value){
					case '1':
						alert('aaa'); break;//call camera
					case '2':
					{
						uni.chooseImage({
							count: 6, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album'], //从相册选择
							success: function (res) {
								uni.previewImage({
											urls: res.tempFilePaths,
											longPressActions: {
												itemList: ['发送给朋友', '保存图片', '收藏'],
												success: function(data) {
													console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
												},
												fail: function(err) {
													console.log(err.errMsg);
												}
											}
										});
							}
						});
					}
					break;
				}
				
			},
			modeChange(index) {
				this.mode = index == 0 ? 'circle' : 'square';
			},
			styleChange(index) {
				if(index == 0) {
					this.text = '';
					this.src = 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg';
				} else {
					this.text = '无头像';
				}
			},
			sizeChange(index) {
				this.size = index == 0 ? 'large' : index == 1 ? 'default' : index == 2 ? 'mini' : 160;
			},
			sexChange(index) {
				this.showSex = true;
				if(index == 0) this.sexIcon = 'man';
				if(index == 1) this.sexIcon = 'woman';
				if(index == 2) this.showSex = false;
			},
			levelChange(index) {
				this.showLevel = !index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
