<template>
	<view class="wrap">
		<view class="u-card-wrap">
			<u-card :head-border-bottom="true" :foot-border-top="true" :title="orderInfo" :sub-title="valveInfo.datetested"
			 :head-style="headStyle" margin="15rpx" :border="true">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-1">
							Owner Name : {{valveInfo.ownerName}}
						</view>
					</view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">
							Plant Location : {{valveInfo.plantLocation}}
						</view>
					</view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-3">
							Tag Number : {{valveInfo.tagNumber}}
						</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-4">
							Serial Number : {{valveInfo.serial}}
						</view>
					</view>
				</view>
				<view @click="click" class="" style="display: flex;" slot="foot">
					<u-icon v-if="true" name="photo-fill" size="34" :label="valveInfo.imageCount"></u-icon>
						<u-loading :show="showLoading" mode="flower"></u-loading>
				</view>
			</u-card>
			<!-- <u-card :head-border-bottom="true" :foot-border-top="true" :title="general" :sub-title="valveInfo.datetested" :head-style="headStyle"  margin="15rpx" :border="true">
				<view class="" slot="body"> 
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">
						 Tag Number : {{valveInfo.tagNumber}}
					</view>
				</view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">
							 Serial Number : {{valveInfo.serial}}
						</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">
							Name : {{valveInfo.name}}
						</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">
							Equipment Location : {{valveInfo.equipmentLocation}}
						</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">
							Device Type : {{valveInfo.deviceType}}
						</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">
							Job Number : {{valveInfo.jobNumber}}
						</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">
							Status : {{valveInfo.status}}
						</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">
							Equipment Link : {{valveInfo.equipmentLink}}
						</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">
							Universal 1 : {{valveInfo.universal1}}
						</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">
							Universal 2 : {{valveInfo.universal2}}
						</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">
							Manufacturer : {{valveInfo.manufacturer}}
						</view>
					</view>
				</view>
				<view @click="click" class="" slot="foot">
					<u-icon v-if="true" name="chat-fill" size="34" label="30评论"></u-icon>
				</view>
			</u-card>
			<u-card :head-border-bottom="true" :foot-border-top="true" :title="config" :sub-title="valveInfo.datetested" :head-style="headStyle"  margin="15rpx" :border="true">
				<view class="" slot="body"> 
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">
						 Model Number : {{valveInfo.modelNumber}}
					</view>
				</view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">
							 Style : {{valveInfo.style}}
						</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">
							Bonnet : {{valveInfo.bonnet}}
						</view>
					</view>
				
				</view>
				<view @click="click" class="" slot="foot">
					<u-icon v-if="true" name="chat-fill" size="34" label="30评论"></u-icon>
				</view>
			</u-card> -->
		</view>
		<!-- <view class="item">
			<view class="title"   >
				 SerialNumber : {{valveInfo.serial}}
			</view>
			<view class="title"   >
				 TagNumber : {{valveInfo.tagNumber}}
			</view>
			<view class="title"  >
				 Manufacturer : {{valveInfo.manufacturer}}
			</view>
			<view class="title"  >
				 DateTested : {{valveInfo.datetested}}
			</view>
			<view class="title"  >
				 images : {{valveInfo.datetested}}
			</view>
		</view> -->
		<!-- 	<view class="item">
			<u-swiper  :height="500" :autoplay=false :list="imageList" :title="title" :effect3d="effect3d"
			:indicator-pos="indicatorPos" :mode="mode" :interval="3000" @click="click"></u-swiper>
		</view> -->
		<view class="pre-box" v-if="!showUploadList">
			<view class="pre-item" v-for="(item, index) in lists" :key="index">
				<image class="pre-item-image" :src="item.url" mode="aspectFill"></image>
				<view class="u-delete-icon" @tap.stop="deleteItem(index)">
					<u-icon name="close" size="20" color="#ffffff"></u-icon>
				</view>
				<u-line-progress v-if="item.progress > 0 && !item.error" :show-percent="false" height="16" class="u-progress"
				 :percent="item.progress"></u-line-progress>

			</view>

		</view>
		<u-upload @on-choose-fail="onChooseFail" upload-text="choose" :before-remove="beforeRemove" ref="uUpload" :custom-btn="customBtn"
		 :show-upload-list="showUploadList" :action="action" :header="header" :auto-upload="autoUpload" :file-list="fileList"
		 :show-progress="showProgress" :deletable="deletable" :max-count="maxCount" @on-list-change="onListChange">
			<view v-if="customBtn" slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
				<u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
			</view>

		</u-upload>
		<view v-if="isSelectImage" class="image">
			<view class="u-config-item">
				<view>image for :
					<view @click="ImageForChange" class="u-demo-result-line">{{ imageInfo.imageFor ? imageInfo.imageFor : 'choose image for' }}</view>
				</view>
				<view>Image Quality :
					<view @click="ImageQualityChange" class="u-demo-result-line">{{ imageInfo.ImageQuality ? imageInfo.ImageQuality : 'choose Image Quality' }}</view>
				</view>
			</view>
			<u-picker mode="selector" @confirm="confirmChoose" v-model="show" :defaultSelector="[0]" :range="imageForList" />
			</u-picker>
			<u-picker mode="selector" @confirm="confirmChooseImageQuality" v-model="showImageQuality" :defaultSelector="[0]" :range="ImageQualityList" />
			</u-picker>
		</view>
		<u-button :custom-style="{marginTop: '20rpx'}" @click="upload">upload</u-button>
		<u-button :custom-style="{marginTop: '40rpx'}" @click="clear">remove</u-button>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				action: '',
				fileList: [],
				current: 0,
				show: false,
				showImageQuality:false,
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				headStyle: {

				},
				showLoading:true,
				orderInfo: 'Order Info',
				general: 'general',
				config: 'config',
				bgColor: '#ffffff',
				borderTop: true,
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#5098FF',
				showImageTypeSelection: false,
				showUploadList: true,
				customBtn: false,
				autoUpload: false,
				showProgress: true,
				deletable: true,
				customStyle: false,
				maxCount: 9,
				isSelectImage: false,
				valveInfo: {
					serial: '',
					tagNumber: '',
					modelNumber: '',
					manufacturer: '',
					dateTested: '',
					ownerName: '',
					plantLocation: '',
					contact: '',
					jobNumber: '',
					jobDate: '',
					woNumber: '',
					customerPo: '',
					dateReceived: '',
					receivedBy: '',
					deviceType: '',
					name: '',
					status: '',
					equipmentLink: '',
					universal1: '',
					universal2: '',
					deviceType: '',
					equipmentLocation: '',
					style: '',
					bonnet: '',
					configUniversal: '',
					bodyMaterial: '',
					imageCount: ''
				},
				lists: [],
				// imageList: [
				// ],
				title: false,
				mode: 'round',
				indicatorPos: 'bottomCenter',
				effect3d: true,
				imageForList: ['valve', 'repair'],
				ImageQualityList:['Original','High','Good','Clear','Normal','Low'],
				imageInfo: {
					repairKey: null,
					imageFor: '',
					ImageQuality:''
				},
				repairKey: "",
				equipType: ""
			}
		},
		onLoad() {
			this.repairKey = this.$route.query.repairKey;
			this.equipType = this.$route.query.equipType;
			let request = {
				uniquekey: this.$route.query.repairKey
			};
			let equipmentType = this.$route.query.equipType;
			this.$u.get('/v1/vkc/Valves/' + equipmentType, request).then(res => {
				console.log(res);
				if (res.code == 200) {

					this.valveInfo.serial = res.result.data[0].serialnumber;
					this.valveInfo.tagNumber = res.result.data[0].tagnumber;
					this.valveInfo.modelNumber = res.result.data[0].modelnumber;
					this.valveInfo.manufacturer = res.result.data[0].maintfor;
					this.valveInfo.datetested = res.result.data[0].datetestedeffective;
					this.valveInfo.ownerName = res.result.ownername;
					this.valveInfo.plantLocation = res.result.plantlocation;
				}
			}, err => {
				console.log(err);
			})
			request = {
				includeImages: false
			}
			this.$u.post('/v1/vkc/images/' + equipmentType + '/' + this.repairKey, request).then(res => {
				console.log(res);
				if (res.code == 200) {
					// debugger;
					this.valveInfo.imageCount = res.result.length;
					this.showLoading=false;
				}
			}, err => {
				console.log(err);
			})
		},
		methods: {
			confirm(e) {
				console.log(e[0].value);
				switch (e[0].value) {
					case '1':
						alert('aaa');
						break; //call camera
					case '2':
						{
							uni.chooseImage({
								count: 6, //默认9
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album'], //从相册选择
								success: function(res) {
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
			upload() {
				console.log(this.$refs.uUpload.lists);
				var imageCount=this.$refs.uUpload.lists.length;
				if (imageCount== 0) {
					return;
				}
				let _this = this;
				
				this.$refs.uUpload.lists.forEach(item => {
					var file = item.file;
					var reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(e) {
						var request = {
							file: e.target.result,
							recorddata: {
								imagefor: _this.imageInfo.imageFor,
								filename: file.name
							}
						}
						_this.$u.post('/v1/vkc/Valves/Image/' + _this.equipType + '/' + _this.repairKey, request).then(res => {
							if (res.code == 200) {
								_this.$refs.uUpload.clear();
							
							}
						})
					}
				})
			_this.valveInfo.imageCount+=imageCount;
				//this.$refs.uUpload.upload();
			},
			clear() {
				this.$refs.uUpload.clear();
			},
			onChooseFail(e) {
				// console.log(e);
			},
			onListChange(lists) {
				// console.log('onListChange', lists);
				if (lists.length !== 0) this.isSelectImage = true;
				else {
					this.isSelectImage = false;
				}
				this.lists = lists;
			},
			deleteItem(index) {
				this.$refs.uUpload.remove(index);

			},
			beforeRemove(index, lists) {
				return true;
			},
			modeChange(index) {
				this.mode = index == 0 ? 'circle' : 'square';
			},
			styleChange(index) {
				if (index == 0) {
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
				if (index == 0) this.sexIcon = 'man';
				if (index == 1) this.sexIcon = 'woman';
				if (index == 2) this.showSex = false;
			},
			levelChange(index) {
				this.showLevel = !index;
			},
			click(index) {
				this.$u.route({
					url: 'pages/app/imageList/imageList',
					params: {
						repairKey: this.repairKey,
						equipType: this.equipType
					}
				})
			},
			ImageForChange() {
				this.show = true;
			},
			ImageQualityChange(){
				this.showImageQuality=true;
			},
			confirmChoose(e) {
				// console.log(e);
				this.imageInfo.imageFor = this.imageForList[e[0]];
			},
			confirmChooseImageQuality(e) {
				// console.log(e);
				this.imageInfo.ImageQuality = this.ImageQualityList[e[0]];
			},
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		//font-size: 40rpx;
		position: relative;

		padding-left: 52rpx;
		padding-bottom: 52rpx;

	}

	.image {
		//font-size: 30rpx;
		position: relative;

		padding-left: 52rpx;
		padding-bottom: 52rpx;
	}

	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>
