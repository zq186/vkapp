<template>
	<view style="height: 100%;">
		<view class="u-search-box">
			<u-toast ref="uToast"></u-toast>
			<u-search bg-color="#e5e5e5" placeholder="Please enter key words"   action-text="search"  v-model="searchValue" @change="searchTxtChange" @custom="search"
			 @search="search" :shape="shape"   :clearabled="clearabled" :show-action="showAction" :input-align="inputAlign" @clear="clear"></u-search>
		</view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100"   ref="tabs" :list="tabList" :current="current" @change="tabsChange" :is-scroll="false"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<view class="loading" v-if="loadmore">
						<u-loading mode="circle" color="blue" size="29"></u-loading>
						<text>loading</text>
			</view>
			<swiper v-if="update" class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view :scroll-top="scrollTop" scroll-y="true"  style="height: 100%;width: 100%;white-space: nowrap;"
					 :scroll-with-animation="true" :refresher-triggered="triggered" @scrolltoupper="refreshData" @scrolltolower="reachBottom">
						<view class="page-box">
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
							<view class="order" v-for="(item, index) in  repairList[0]" :key="item.id">
								<view class="item" @click="onclick(item)">
									<view class="left">
										<image :src="item.iconUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.tagnumber }}</view>
										<view class="title u-line-2">{{ item.serial }}</view>
										<view class="type">{{ item.createdby }}</view>
									</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view  :scroll-top="scrollTop" scroll-y="true" style="height: 100%;width: 100%;white-space: nowrap;"
					 :scroll-with-animation="true" @scrolltoupper="refreshData" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(item, index) in  repairList[1]" :key="item.id">
								<view class="item" @click="onclick(item)">
									<view class="left">
										<image :src="item.iconUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.tagnumber }}</view>
										<view class="title u-line-2">{{ item.serial }}</view>
										<view class="type">{{ item.createdby }}</view>
									</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<u-tabbar @change="tabbarChange" :v-model="barIndex" :list="vuex_tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				update: true,
				shape: 'round',
				triggered:true,
				clearabled: true,
				showAction: false,
				inputAlign: 'left',
				scrollTop: 0,
				loadmore:false,
				old: {
					scrollTop: 0
				},
				ValveListInfo: {
					request: {
						"mr": true,
						"offset": 1,
						"limit": 10,
						"et": "0",
						"whereClause": "1=1",
						"pKey": "",
						"oKey": "",
						"retcntonly": false
					}
				},
				repairList: [
					[],
					[]
				],
				dataList: [],
				tabList: [{
						name: 'Relief Valve'
					},
					{
						name: 'Control Valve'
					}
				],
				swiperCurrent: 0,
				current: 0,
				barIndex: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore']
			};
		},
		onLoad() {
			//debugger;
			this.ValveListInfo.request.oKey = this.vuex_tenant.ownerKey;
			this.ValveListInfo.request.pKey = this.vuex_tenant.plantKey;
			this.getRepairList(0);
			setTimeout(()=>{
				this.getRepairList(1);
			},3000)
			//
		},
		computed: {

		},
		methods: {
			searchTxtChange(value) {
			},
			search(value) {
				this.repairList[this.current] = [];
				this.ValveListInfo.request.offset = 1;
				//this.rvListInfo.request.whereClause=" serial like '%"+value+"%' or tagnumber like '%"+value+"%' ";
				if (value === '') {
					this.ValveListInfo.request.whereClause = "  1=1 ";
				} else {
					this.ValveListInfo.request.whereClause = "  serial like '%" + value + "%'  ";
				}
				//this.ValveListInfo.request.whereClause="  serial like '%"+value+"%'  ";

				this.getRepairList(this.current);
			},
			clear() {
				// console.log(this.value);
			},
			reachBottom() {
				this.ValveListInfo.request.offset++;
				this.loadStatus.splice(this.current, 1, "loading")
				setTimeout(() => {
					this.getRepairList(this.current);
				}, 200);
			},
			refreshData(e) {
				this.loadStatus.splice(this.current, 1, "loading");
				this.ValveListInfo.request.offset = 1;
				this.repairList[this.current] = [];
				this.getRepairList(this.current);

			},
			goTop() {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				// uni.showToast({
				//     icon:"none",
				//     title:"纵向滚动 scrollTop 值已被修改为 0"
				// })
			},
			tabbarChange(index) {
				this.barIndex = index++;
			},
			// 页面数据
			getRepairList(idx) {
				let _this = this;
				_this.ValveListInfo.request.et = "" + idx + "";

				this.$u.post('/v1/vkc/Valves', _this.ValveListInfo.request).then(res => {
					if (res.code == 200) {
						//debugger;
						if(_this.ValveListInfo.request.offset==0)
						{
							_this.repairList[idx]=[];
						}
						let dataList = res.result.repairdetail;
						for (let i = 0; i < dataList.length; i++) {

							let data = dataList[i];
							data.id = this.$u.guid();
							//data.iconUrl = 'http://47.97.109.45/valve/1.jpg';
							if(data.image=='')
							{
								data.iconUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCACWAPIBAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAIDBQQGAQf/xAA0EAACAgIBAgMGAwcFAAAAAAAAAQIDBBEFEiETMUEUMlFhcZEGM6EjQkNScoGxFRbh8PH/2gAIAQEAAD8A/fwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZWbyVmPlOuCg1FLeyEebkvfpT+ki6PNUP3oTj+pdHk8SX8VL6povjk0z922D+kkWgAAAAAAAAAAAA8vmT8Xk7F8bOnt9jblxWJJfluP8AS2UT4Sl+5bZH66ZTLg7F7l8X9Y6ODLw7cNx8Rxal5OLNfhU/YXJtvc3o0gAAAAAAAAAAARckt7a7LZ5TCftHK1+vVY5P/J63yBC22umDnZOMYr1bPPc7fGeRT0vcfD6vubHFw6ONoWtNx39zsAAAAAAAAAABCyTjXKSW2k2jInl32ec2l8I9hVNwxsq5+can3Zk8NZGvMlfPfTTVKb1/35kc/mL82XTt11b7QT/yzsq/Ec68KMJV9d67dTfZ/NmXfmX5tyd1jk29Jei+h08zLXJTrX8OEYL7HrMeHh49cP5YpfoWgAAAAAAAAAAGFdX4d04fB9ivMmquBypes2oox+NyMaEMqvItdXjQUFJR3ruT/wBPxpvVPK40vlPcT4+GzH+VKi5fGFqJ4XF5sORx/FxbIwVibk120Uzn7XzrS7qzI0vv/wAHugAAAAAAAAAAAZfI19N8Z+kl+pl89J18HRH0nbtv7nl+r5jq+YUtPaen8i+vPyqteHk3R18Js7OAi7+co296bm3/AGPegAAAAAAAAAAA5OQh1Y/V6xezihlzjUq5QhOC9JIrlVg3v9px1Um/Nxj3H+3eNyFv2W2n6TaOaz8H4734eVbH4dSTOSz8H5K/Ky6pf1RaOvgeCyuOz535Hh9Kg4x6Zb3v/wAPSgAAAAAAAAAAAjOKnBxfk1pnNDj6Y92nJ/NnTGuMFqEUl8kSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKq8iq6yyFdkZSrfTNL91n2q2u6tTrkpRba2iwrpuryKo21S6oS8nrzLAAAAAAAAAAAAADBpjKnIzM2tNyryZRsiv3oaW/7rzK8K1zxsGrx5V0Wytk5wfT1NS7Lfp5tmlxls7IXwdjtrrucK7G9uUdL19dPaM3j7b8x4VdmVd0zx5yl0z05NT15k8e29Y2DkyyrZznkeDJSl2cdtd18ey7kJ5dmoZNd1upXpJ2W62urTSguyX1PmRkzWHk3yzbYZSucFUp60urSSX09SV+RkzszZuyVc6bHGH7dQjFJdm4+u/M3q25VQctdTSb0TAAAAAAAAAABBQjHeopdT29LzZGWPTKrwnVW6/wCTpWvsThCNcVGEVGK8klpIjGquGnGuMWlpaSWkFVWkkoR1F7S15P4kVi0KUpKmtSl7z6FtnLdxjvsl4mRY6pS6nDpW/PeurW9dvI6549NlisnTXKa8pSim0WgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q==';
							}else{
								data.iconUrl='data:image/jpeg;base64,'+data.image;
							}
							_this.repairList[idx].push(data);
						}
						
						if (dataList.length<=res.result.pagesize||dataList.length==0) {
							this.loadStatus.splice(this.current, 1, "nomore");
						}
					}else{
						this.loadStatus.splice(this.current, 1, "nomore");
					}
					//this.triggered=false;
					//uni.stopPullDownRefresh();
					this.update = false;
					this.update = true;
				}, err => {
					console.log(err);
					
				})


				//this.loadStatus.splice(this.current, 1, "loadmore")
			},
			// tab栏切换
			tabsChange(index) {
				console.log(index);
				this.ValveListInfo.request.offset = 1;
				this.swiperCurrent = index;
				//this.repairList[index]=[];
				//this.getRepairList(index);
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
					params: {
						repairKey: value.uniquekey,
						equipType: this.current===0?'rv':'cv'
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
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
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
			margin: 20rpx 0 0;

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

		.page-box {
			display: inline-block;
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
		height: calc(88vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	.u-search-box {
		 //margin: 10rpx ; 
	}
	.loading {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 90rpx;
				margin-bottom: 20rpx;
	
				text {
					margin-left: 20rpx;
					font-size: 30rpx;
				}
			}
</style>
