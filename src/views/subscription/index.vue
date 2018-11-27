<template>
  <section>
		<mt-navbar v-model="selected" fixed>
      <mt-tab-item v-for="item in navBar" :key="item.id" :id="item.id">{{
        item.label
      }}</mt-tab-item>
    </mt-navbar>

    <mt-tab-container>
      <mt-tab-container-item>
				<list :page="page" :pages="pages" :tipText="tipText" :dataList=list :loading="loading" @onCreated="init" @onLoadMore="loadMore"></list>
      </mt-tab-container-item>
    </mt-tab-container>
  </section>
</template>

<script>
import API from '@/api';
import { getToken } from '@/utils';
import List from '@/components/List';
export default {
	data() {
		return {
			selected: this.$store.state.selectedNav,
			page: 1,
			pages: 1,
			list: [],
			api: '',
			loading: false,
			tipText: '',

			// 从浏览器localStorage中获取订阅主题的ID，模拟保存订阅的功能
			topicID: localStorage.getItem('topicID')
				? JSON.parse(localStorage.getItem('topicID')).map(item => item.value)[0]
				: '',
			navBar: [
				{ id: 1, label: '订阅' },
				{ id: 2, label: '通用政策' },
				{ id: 3, label: '申报政策' },
				{ id: 4, label: '政策解读' },
				{ id: 5, label: '政策资讯' }
			]
		};
	},
	components: {
		List
	},
	watch: {
		selected(newVal) {
			this.page = 0;
			this.pages = 0;
			this.loading = false;
			this.requestFun();
			this.fetchData();
			this.$store.commit('SELECT_NAVBAR', newVal);
		}
	},
	methods: {
		/**
		 * 初始化
		 */
		init() {
			this.loading = true;
			this.requestFun();
			this.fetchData();
		},

		/**
		 * 根据selected的ID值请求不同的API函数
		 */
		requestFun() {
			switch (this.selected) {
				case 1:
					this.api = API.getTopicList;
					break;
				case 2:
					this.api = API.getGeneralPolicy;
					break;
				case 3:
					this.api = API.getDeclarationPolicy;
					break;
				case 4:
					this.api = API.getAnalyzingPolicy;
					break;
				case 5:
					this.api = API.getPolicyInfo;
					break;
				default:
					this.api = API.getHotPolicy;
			}
		},

		/**
		 * 获取数据
		 */
		async fetchData() {
			// 如果不是无限滚动，就把列表清空
			if (!this.loading) {
				this.list = [];
			}

			if (!getToken() && this.selected == 1 && this.topicID) {
				// page设为10000是为了隐藏加载动画
				this.page = 10000;
				this.tipText = '你还没有订阅主题';
				return false;
			}

			try {
				let res = '';
				if (this.selected == 1) {
					// 如果是订阅列表
					if (this.topicID) {
						res = await this.api(this.topicID, this.page);
					} else {
						this.list = [];
					}
				} else {
					// 其它政策列表
					res = await this.api(this.page);
				}
				this.list = this.list.concat(res.data.records);
				this.pages = res.data.pages;
				this.tipText = '没有数据了';

				// 设为false时触发无限滚动
				this.loading = false;

				console.log('res', res.data);
			} catch (error) {
				console.log('获取政策出错了~');
			}
		},

		/**
		 * 滚动载入更多
		 */
		loadMore() {
			this.loading = true;
			this.page++;

			console.log('loadmore-page', this.page);

			if (this.page <= this.pages) {
				this.fetchData(this.page);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.mint-tab-container {
	padding-top: 56px;
}

.mint-tab-container-item {
	background: #fff;
}
</style>
