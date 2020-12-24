<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">Current Owner/Plant</view>
			<view class="u-demo-area">

				<view class="u-demo-result-line">{{ input ? input : 'please choose owner/plant' }}</view>
			</view>
			<u-select  mode="mutil-column-auto" confirm-text="ok" cancel-text="cancel" v-model="show" :list="ownerList" @confirm="confirm"></u-select>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">Change Owner/Plant</view>
			<view class="u-config-item">
				<view class="u-item-title">select</view>
				<u-button @click="cityChange">Change</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				show: false,
				input: '',
				ownerList: []
			};
		},
		onLoad() {
			//debugger;
			let _this = this;
			this.input = this.vuex_tenant.ownerName + '-' + this.vuex_tenant.plantName;
			this.$u.post('/v1/vkc/OwnerPlant/Owners', {
				includeplants: true
			}).then(res => {
				if (res.code === 200) {
					
					for (let i = 0; i < res.result.length; i++) {
						let plant = [];
						res.result[i].plants.forEach(item => {
							plant.push({
								value: item.plantkey,
								label: item.plantlocation
							});
						})
						let owner = {
							value: res.result[i].ownerkey,
							label: res.result[i].ownername,
							children: plant
						}
						_this.ownerList.push(owner);
					}
				}
			}, err => {
				console.log(err);
			})
		},
		methods: {
			cityChange() {
				this.show = true;
			},
			confirm(e) {
				this.input = e[0].label + '-' + e[1].label;
				this.$store.commit('changeOwnerPlant', {
					ownerKey: e[0].value,
					ownerName: e[0].label,
					plantKey: e[1].value,
					plantName: e[1].label
				});
			},
		}
	};
</script>

<style scoped>
	.btn-wrap {
		margin: 100rpx 30rpx;
	}
</style>
