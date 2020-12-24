<template>
	<view>
		<view class="list-box">
			<view v-for="(item,index) in photoList" :key="index" :class="{'active':item.active}" :data-index="index" @tap="previewPhoto">
				<image :src="item.url" mode="aspectFill" lazy-load="true"></image>
				<view>Image For: {{item.imagefor}}</view>
			</view>
		</view>
		<!-- <view class="load">{{loadTxt}}</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				photoList: [],
				rows: 10,
				page: 1,
				isGet: true,
				loadTxt: ""
			}
		},
		onLoad() {

			this.getPhoto();
		},
		onReachBottom() {
			//this.getPhoto();
		},
		methods: {
			/* 获取照片 */
			getPhoto() {
				if (!this.isGet) {
					return;
				}
				this.isGet = false;
				new Promise((success, error) => {
					/* 第一页弹出加载层 */
					if (this.page == 1) {
						uni.showLoading({
							title: '加载中',
							mask: true
						})
					} else {
						this.loadTxt = "正在加载中";
					}
					/* 无真实图片请求接口，由 setTimeout 模拟异步过程 */
					// setTimeout(()=>{
					// 	/* 拼接图片路径字符串 */
					// 	let joinUrlStr=(num)=>{
					// 		return {
					// 			index:num,
					// 			url:`http://47.97.109.45/valve/1.jpg`
					// 		}
					// 	}
					// 	let list=[];
					// 	for(let i=0;i<10;i++){
					// 		list.push(joinUrlStr((this.page-1)*this.rows+i))
					// 	}
					// 	success(list);
					// },1000);
					let equipmentType = this.$route.query.equipType;
					let repairKey = this.$route.query.repairKey;
					let request = {
						allEvents: true
					};

					this.$u.post('/v1/vkc/images/' + equipmentType + '/' + repairKey, request).then(res => {
						console.log(res);
						if (res.code == 200) {
							// debugger;
							let list = [];
							res.result.forEach((item,index) => {
								let image={index:index,url:item.image,filename:item.filename,imagefor:item.imagefor}
								if(item.image.split(',').length==1)
								{
									image={index:index,url:'data:image/jpeg;base64,'+item.image,filename:item.filename,imagefor:item.imagefor}
								}
								
								list.push(image);
							})
							success(list);
						}
					}, err => {
						console.log(err);
					})

				}).then((res) => {
					if (this.page == 1) {
						uni.hideLoading();
					}
					this.photoList = [...this.photoList, ...res];
					this.showImages();
				})
			},
			/* 显示照片 */
			showImages() {
				let index = (this.page - 1) * this.rows;
				let show = () => {
					if (index < this.photoList.length) {
						this.$set(this.photoList[index], "active", true);
						index++;
					} else {
						clearInterval(interval);
						this.loadTxt = "上拉加载更多";
						this.page++;
						this.isGet = true;
					}
				}

				let interval = setInterval(() => {
					show();
				}, 100);
			},
			/* 预览照片 */
			previewPhoto(e) {
				let index = e.currentTarget.dataset.index;
				let list = this.photoList.map((item, index) => {
					return item.url;
				});

				uni.previewImage({
					current: list[index],
					/* 传 Number H5 端出现不兼容 */
					urls: list
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eee;
	}

	.list-box {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		align-content: flex-start;
		padding: 20upx 20upx 0 20upx;
		line-height: 30upx;
		font-size: 28upx;
		color: #333;

		&>view {
			background-color: #fff;
			width: 345upx;
			padding: 20upx;
			margin-bottom: 20upx;
			box-sizing: border-box;
			opacity: 0;
			transform: translateY(40upx);
			transition: all 0.3s ease-in-out 0s;

			&.active {
				opacity: 1;
				transform: translateY(0);
			}
		}

		image {
			width: 100%;
			height: 300upx;
			margin-bottom: 10upx;
		}
	}

	.load {
		line-height: 80upx;
		text-align: center;
		font-size: 24upx;
		color: #999;
		padding-bottom: 20rpx;
	}
</style>
