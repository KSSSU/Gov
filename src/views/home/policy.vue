<template>
  <section class="wrap">
    <header class="title">热门政策</header>
		<list :page="page" :pages="pages" :dataList=list :loading="loading" @onCreated="init" @onLoadMore="loadMore"></list>
	</section>
</template>

<script>
import API from '@/api';
import List from '@/components/List';
export default {
	data() {
		return {
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
			this.loading = true;
			this.fetchData(this.page);
		},

		/**
		 * 获取数据
		 * @param {page} Number 当前页数
		 */
		async fetchData(page) {
			try {
				const res = await API.getHotPolicy(page);
				this.pages = res.data.pages;
				this.list = this.list.concat(res.data.records);

				// 设为false时触发无限滚动
				this.loading = false;

				console.log('res', res.data);
			} catch (error) {
				console.log('获取热门政策出错了~');
			}
		},

		/**
		 * 滚动载入更多
		 */
		loadMore() {
			console.log('loadmore');
			this.loading = true;
			this.page++;
			if (this.page <= this.pages) {
				this.fetchData(this.page);
			}
		}
	}
};
</script>