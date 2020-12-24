import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let lifeData = {};

try {
	lifeData = uni.getStorageSync('lifeData');
} catch (e) {

}

let saveStateKeys = ['vuex_user', 'vuex_token','vuex_tenant'];

const saveLifeData = function(key, value) {
	if (saveStateKeys.indexOf(key) != -1) {
		let tmp = uni.getStorageSync('lifeData');
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		uni.setStorageSync('lifeData', tmp);
	}
}
const store = new Vuex.Store({
	state: {
		vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {
			name: ''
		},
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		vuex_version: '1.0.1',
		vuex_demo: '',
		vuex_tenant: lifeData.vuex_tenant?lifeData.vuex_tenant:{
			ownerKey:'',
			ownerName:'',
			plantKey:'',
			plantName:'',
		},
		vuex_tabbar: [{
				iconPath: "/static/uview/example/component.png",
				selectedIconPath: "/static/uview/example/component_select.png",
				text: 'Home',
				pagePath: '/pages/app/index/index'
			},
			{
				iconPath: "/static/uview/example/template.png",
				selectedIconPath: "/static/uview/example/template_select.png",
				text: 'Settings',
				pagePath: '/pages/app/myCenter/myCenter'
			}
		]
	},
	mutations: {
		$uStore(state, payload) {
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if (len >= 2) {
				let obj = state[nameArr[0]];
				for (let i = 1; i < len - 1; i++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		},
		changeOwnerPlant(state, payload) {
			let tenant=lifeData['vuex_tenant']?lifeData['vuex_tenant']:{};
			tenant.ownerKey=payload.ownerKey;
			tenant.ownerName=payload.ownerName;
			tenant.plantKey=payload.plantKey;
			tenant.plantName=payload.plantName;
			saveLifeData('vuex_tenant', tenant);
		}
	}
})

export default store
