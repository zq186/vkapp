<template>
	<view class="wrap">

		<view class="content">
			<view class="title">欢迎登录VKC</view>
			<input class="u-border-bottom" type="text" v-model="username" placeholder="请输入用户名" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登陆</button>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		computed: {
			inputStyle() {
				let style = {};

				return style;
			}
		},
		methods: {
			submit() {
				let _this = this;
				let request = {
					"username": "zhuqiang",
					"password": "sha2118L$",
					"tenantcode": "mig"
				}
				this.$u.post('/v1/vkc/Auth/login', request).then(res => {
			
					if (res.code == 200) {
						let userToken = 'Bearer ' + res.usertoken.authtoken;
						uni.setStorageSync('Authorization',userToken)
						this.$u.route({
							url: 'pages/app/index/index'
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

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
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
