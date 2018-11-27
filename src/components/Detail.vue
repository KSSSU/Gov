<template>
  <section class="article">
		<mt-header title="政策详情" fixed>
			<span @click="goBack" slot="left">
				<mt-button icon="back"></mt-button>
			</span>
		</mt-header>
		
    <header class="header">
      <h1>{{article.declareTitle || article.generalTitle}}</h1>
      <p class="line-container">
        <span>{{article.declareSource || article.generalSource}}</span>
        <span>{{formatDate(article.declarePublishTime || article.generalPublishTime)}}</span>
      </p>
    </header>

    <article class="desc">
      <p class="line-container" style="margin-bottom: 5px">
				<span>发文号: {{article.declareIssue || article.generalIssue}}</span>
				<span>成文时间: {{formatDate(article.declareWriteTime || article.generalWriteTime)}}</span>
			</p>
      <p class="line-container">
				<span>发文单位: {{article.declareSource || article.generalSource}}</span>
				<span>发文时间: {{formatDate(article.declarePublishTime || article.generalPublishTime)}}</span>
			</p>
    </article>

    <article class="content" v-html="article.declareText || article.generalText"></article>
  </section>
</template>

<script>
import API from '@/api';
export default {
	data() {
		return {
			article: {}
		};
	},
	created() {
		this.fetchData();
	},
	watch: {
		// 如果路由有变化，会再次执行该方法
		$route: 'fetchData'
	},
	methods: {
		/**
		 * 获取数据
		 * @param {page} Number 当前页数
		 */
		async fetchData() {
			let res = '';
			const flag = this.$route.params.declareFlag;

			// flag：一个申报政策的标记，用来区分通用政策和申报政策的API请求
			if (flag) {
				res = await API.getDeclarePolicyDetail(this.$route.params.id);
			} else {
				res = await API.getPolicyDetail(this.$route.params.id);
			}

			if (res.data.code == 0 && res.data.data) {
				this.article = res.data.data;
			} else {
				this.article = {};
			}
			console.log('res', res.data);
		},

		/**
		 * 格式化日期
		 * @param {date} String 日期
		 */
		formatDate(date) {
			return date ? date.substr(0, 10).replace(/-/g, '.') : '';
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

<style lang="scss">
.article {
	padding: 0 1.3rem;
	background: #fff;

	.header {
		padding-top: 40px;
		margin-bottom: 1rem;

		h1 {
			font-size: 1.4rem;
			font-weight: 700;
		}
	}

	img {
		width: 100%;
	}

	.line-container {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		font-size: 0.85rem;
		color: #999;
	}

	.desc {
		background: #f8f8f8;
		padding: 0.8rem;
		margin: 20px 0;
	}

	.content {
		line-height: 1.8;
		font-size: 1.1rem;

		p {
			margin-bottom: 15px;
		}
	}
}
</style>
