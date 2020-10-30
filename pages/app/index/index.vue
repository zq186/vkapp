<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
								<view class="order" v-for="(res, index) in  repairList[0]" :key="res.id">
								<view class="item" @click="onclick(item)" v-for="(item, index) in res.cvList" :key="index">
									<view class="left">
										<image :src="item.goodsUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.serial }}</view>
										<view class="type">{{ item.type }}</view>

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
										no valve

									</view>
									<view class="btn">add valve</view>
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
		<u-tabbar v-model="current" :list="barlist" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				repairList: [
					[],
					[],
					[],
					[]
				],
				dataList:[],
				list: [{
						name: 'CV'
					},
					{
						name: 'RV'
					},
					{
						name: 'MOV'
					},
					{
						name: 'LV',
						count: 12
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
				barlist: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						count: 2,
						isDot: true,
						customIcon: false,
					},
					{
						iconPath: "photo",
						selectedIconPath: "photo-fill",
						text: '放映厅',
						customIcon: false,

					},
					{
						iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
						selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
						text: '发布',
						midButton: true,
						customIcon: false,
					},
					{
						iconPath: "play-right",
						selectedIconPath: "play-right-fill",
						text: '直播',
						customIcon: false,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						count: 23,
						isDot: false,
						customIcon: false,
					},
				],
				midButton: true,
			};
		},
		onLoad() {
			this.getRepairList(0);
			//this.getRepairList(1);
			//this.getRepairList(3);
		},
		computed: {
			// 价格小数
			priceDecimal() {
				return val => {
					if (val !== parseInt(val)) return val.slice(-2);
					else return '00';
				};
			},
			// 价格整数
			priceInt() {
				return val => {
					if (val !== parseInt(val)) return val.split('.')[0];
					else return val;
				};
			}
		},
		methods: {
			reachBottom() {
				// 此tab为空数据
				if (this.current != 2) {
					this.loadStatus.splice(this.current, 1, "loading")
					setTimeout(() => {
						this.getRepairList(this.current);
					}, 1200);
				}
			},
			// 页面数据
			getRepairList(idx) {
				var request = {
					"mr": true,
					"offset": 1,
					"limit": 10,
					"et": "RV",
					"whereClause": "1=1",
					"pKey": "20200205133900100000",
					"oKey": "20181126164759900000",
					"retcntonly": false
				}
				let header={
					Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2a2NhcHAiOiJEN0E3NEMzRThENkY0MDZBQkFDNDVEMUQxQUZCRTFDQ3xtaWd8NjFFMzlGQTMxQTg3NDk5NkI4NTk3Q0RDQzA2NzM1RTl8emh1cWlhbmd8QTNFNjQ2ODYyQjU3NDU1REJERUZCOUQ5ODM5QzBFMjN8IiwiaWF0IjoxNjA0MDM1MzkwLCJFeHBpcmF0aW9uIjoiMTIvMTgvMjIxMCAxNjowMjoxMCIsIm5iZiI6MTYwNDAzNTM5MCwiZXhwIjo3NjA0MDM1MzMwfQ.PWEYY4T7r4wxq_mMDQBSu39LlyHkdwQXTy5aQafntkM'
				}
				this.$u.post('/v1/vkc/Valves', request).then(res => {
				
					if (res.code == 200) {
						let dataList = res.result.repairdetail;
						for (let i = 0; i < dataList.length; i++) {
							
							let data = dataList[i];
							data.id = this.$u.guid();
							this.repairList[idx].push(data);
						}
					} 

				}, err => {
					console.log(err);
				})

				
				this.loadStatus.splice(this.current, 1, "loadmore")
			},
			// 总价
			totalPrice(item) {
				let price = 0;
				item.map(val => {
					price += parseFloat(val.price);
				});
				return price.toFixed(2);
			},
			// 总件数
			totalNum(item) {
				let num = 0;
				item.map(val => {
					num += val.number;
				});
				return num;
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

				this.$u.route({
					url: 'pages/app/detail/detail'
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
