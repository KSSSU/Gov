<template>
  <section class="topicList">
    <mt-header :title="title" fixed>
      <span @click="goBack" slot="left">
				<mt-button icon="back"></mt-button>
			</span>
    </mt-header>

    <section class="wrap">
			<list :page="page" :pages="pages" :dataList=list :loading="loading" @onCreated="init" @onLoadMore="loadMore"></list>
		</section>
  </section>
</template>

<script>
import API from '@/api';
import List from './List';
export default {
	data() {
		return {
			title: '',
			loading: false,
			page: 1, //当前页数
			pages: 1, //总页数
			list: []
		};
	},
	components: {
		List
	},
	methods: {
		/**
		 * 初始化
		 */
		init() {
			this.title = this.$store.state.selectedTopicTitle;
			this.loading = true;
			this.fetchData();
		},

		/**
		 * 获取数据
		 */
		async fetchData() {
			try {
				const res = await API.getTopicList(this.$route.params.value, this.page);
				this.pages = res.data.pages;
				this.list = this.list.concat(res.data.records);

				// 设为false时触发无限滚动
				this.loading = false;

				console.log('res', res.data);
			} catch (error) {
				console.log('获取主题列表出错了~');
			}
		},

		/**
		 * 滚动载入更多
		 */
		loadMore() {
			this.loading = true;
			this.page++;
			console.log('loadmore', this.page, this.pages);
			if (this.page <= this.pages) {
				this.fetchData();
			}
		},

		/**
		 * 回退前一个页面
		 */
		goBack() {
			this.$router.go('-1');
		}
	}
};
</script>

<style lang="scss" scoped>
.topicList {
	padding-top: 40px;
}
</style>
