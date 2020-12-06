<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
								<view class="order" v-for="(item, index) in  repairList[0]" :key="item.id">
								<view class="item" @click="onclick(item)"  >
									<view class="left">
										<image :src="item.iconUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.tagnumber }}/{{ item.serial }}</view>
										<view class="type">{{ item.createdby }}</view>

									</view>

								</view>
							</view>
							
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							

								<view class="item" @click="onclick(item)" v-for="(item, index) in repairList" :key="index">
									<view class="left">
										<image :src="item.goodsUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="type">{{ item.type }}</view>

									</view>

								</view>

							
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										No items to dislay

									</view>
									<view class="btn">Add Valve</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							

								<view class="item" @click="onclick(item)" v-for="(item, index) in repairList" :key="index">
									<view class="left">
										<image :src="item.goodsUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="type">{{ item.type }}</view>
									</view>

								</view>

							
							<u-loadmore :status="loadStatus[3]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		 <u-tabbar @change="tabbarChange" :v-model="barIndex"  :list="vuex_tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				repairList: [
					[],
					[]
				],
				rvListInfo:{
					request:{
						"mr": true,
						"offset": 1,
						"limit": 10,
						"et": "RV",
						"whereClause": "1=1",
						"pKey": "20200727092324600000",
						"oKey": "20200727092222600000",
						"retcntonly": false
					},
					response:{
						
					}
				},
				dataList:[],
				list: [{
						name: 'Relief Valve'
					},
					{
						name: 'Control Valve'
					}
				],
				swiperCurrent: 0,
				current:0,
				barIndex:0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
				
			};
		},
		onLoad() {
			this.getRepairList(0);
			//this.getRepairList(1);
			//this.getRepairList(3);
		},
		computed: {
			
		},
		methods: {
			
			reachBottom() {
				// 此tab为空数据
				if (this.current != 2) {
					this.rvListInfo.request.offset++;
					this.loadStatus.splice(this.current, 1, "loading")
					setTimeout(() => {
						this.getRepairList(this.current);
					}, 1200);
				}
			},
			tabbarChange(index){
				this.barIndex=index++;
			},
			// 页面数据
			getRepairList(idx) {
				let _this=this;
			
				this.$u.post('/v1/vkc/Valves', _this.rvListInfo.request).then(res => {
				
					if (res.code == 200) {
						 let dataList = res.result.repairdetail;
						for (let i = 0; i < dataList.length; i++) {
							
							let data = dataList[i];
							data.id = this.$u.guid();
							data.iconUrl='http://47.97.109.45/valve/1.jpg';
							this.repairList[idx].push(data);
						}
					   
					} 

				}, err => {
					console.log(err);
				})

				
				this.loadStatus.splice(this.current, 1, "loadmore")
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.getRepairList(index);
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			onclick(value) {
				//this.valveList(value);
				console.log(value);
				this.$u.route({
					url: 'pages/app/detail/detail',
					params:{
						repairKey:value.uniquekey,
						equipType:this.current
					}
				})
			}
		}
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 8rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 10rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 8rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
