<template>
	
	<view class="wrap">

		<view class="content">
			<view class="title">VKC Mobile</view>
			<input class="u-border-bottom" type="text" v-model="username" placeholder="Please enter use name" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="Please enter password" />
			<!-- <button @tap="submit" :style="[inputStyle]" :shape="circle" class="getCaptcha">登陆</button> -->
			<u-button @click="submit"   shape="circle" >Login</u-button>
		</view>

	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				username: 'jerry',
				password: 'VKc@2016L'
			}
		},
		computed: {
			inputStyle() {
				let style = {};

				return style;
			}
		},
		onLoad() {
			uni.setStorageSync('Authorization','');
		},
		methods: {
			submit() {
				let _this = this;
				let request = {
					"username": _this.username,
					"password": _this.password,
					"tenantcode": "mig"
				}
				this.$u.post('/v1/vkc/Auth/login', request).then(res => {
			
					if (res.code == 200) {
						let userToken = 'Bearer ' + res.usertoken.authtoken;
						uni.setStorageSync('Authorization',userToken)
						this.$u.route({
							url: 'pages/app/valveList/valveList'
						})
					}
				}, err => {
					console.log(err);
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;
		margin: 80rpx auto 0;
		.content {
			width: 600rpx;
			margin: 160rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 60rpx;
				padding-bottom: 10rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
