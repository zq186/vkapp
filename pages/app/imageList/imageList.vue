<template>
	
	<view class="wrap">
	<!-- <swiper class="swiper" @change="change">
			<swiper-item>
				<u-grid :col="3" @click="click" hover-class="hover-class">
					<u-grid-item v-for="(item, index) in imageList" :index="index" :key="index">
						<u-image  mode="aspectFill" :src="item"></u-image>
					
					</u-grid-item>
				</u-grid>
				
			</swiper-item>
			
		</swiper> -->
	<view class="page">
	        <view class="image-list">
	            <view class="image-item" v-for="(item,index) in imageList" :key="index">
	                <view class="image-content">
	                    <image style="width: 200px; height: 200px; background-color: #eeeeee;" :mode="left" :src="item"
	                        @error="imageError"></image>
	                </view>
	                <view class="image-title">{{item.text}}</view>
	            </view>
	        </view>
	    </view>
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
		<u-upload @on-choose-fail="onChooseFail" :before-remove="beforeRemove" ref="uUpload" :custom-btn="customBtn" :show-upload-list="showUploadList" :action="action" :header="header"  :auto-upload="autoUpload" :file-list="fileList"
		 :show-progress="showProgress" :deletable="deletable" :max-count="maxCount" @on-list-change="onListChange">
			<view v-if="customBtn" slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
				<u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
			</view>
		</u-upload>
		<u-button :custom-style="{marginTop: '20rpx'}" @click="upload">上传</u-button>
		<u-button :custom-style="{marginTop: '40rpx'}" @click="clear">清空列表</u-button>
		
	</view>
	
</template>

<script>
	
	export default {
		data() {
			return {
				action: '',
				fileList: [],
				current: 0,
				show: true,
				header:{
					Authorization:uni.getStorageSync('Authorization')
				},
				//repairKey:this.$route.query.repairKey,
				//equipType:this.$route.query.equipType,
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
				maxCount: 2,
				valveInfo:{
					serial:null,
					tagNumber:null,
					modelNumber:null,
					manufacturer:null
				},
				lists: [],
				title: false,
				mode: 'round',
				indicatorPos: 'bottomCenter',
				effect3d: true,
				current: 0,
			    imageList: ['http://47.97.109.45/valve/1.jpg','http://47.97.109.45/valve/1.jpg','http://47.97.109.45/valve/1.jpg','http://47.97.109.45/valve/1.jpg','http://47.97.109.45/valve/1.jpg','http://47.97.109.45/valve/1.jpg']
			}
		},
		onLoad(){
			let request={uniquekey:this.$route.query.repairKey};
			// this.$u.get('/v1/vkc/Valves/RV',request).then(res => {
			// console.log(res);
			// 	if (res.code == 200) {
					
			// 	   this.valveInfo.serial=res.result.data[0].serialnumber;
			// 	   this.valveInfo.tagNumber=res.result.data[0].tagnumber;
			// 	   this.valveInfo.modelNumber=res.result.data[0].modelnumber;
			// 	   this.valveInfo.manufacturer=res.result.data[0].maintfor;
			// 	} 
			
			// }, err => {
			// 	console.log(err);
			// })
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
			upload() {
				console.log( this.$refs.uUpload.lists);
				var file =  this.$refs.uUpload.lists[0].file;
				var reader = new FileReader();  
				reader.readAsDataURL(file);
				let _this=this;
				reader.onload=function(e){  
					var request={
						  file:e.target.result,
						  recorddata:{
							  imagefor:'123',
							  filename:file.name
						  }
					  }
					  _this.$u.post('/v1/vkc/Valves/Image/RV/'+_this.$route.query.repairKey,request).then(res=>{
					  	
					  })
				    } 
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
			},
			change(e) {
					this.current = e.detail.current;
				}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
