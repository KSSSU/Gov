<template>
	<section>
		<div class="mint-searchbar">
			<div class="mint-searchbar-inner">
				<i class="mintui mintui-search"></i>
				<input ref="input" type="search" class="mint-searchbar-core"
					@click="handleClick"
					v-model="value"
					:placeholder="placeholder"
					v-focus
				/>
			</div>
			<a class="mint-searchbar-cancel" @click="handleCancel" v-show="visible" v-text="cancelText"></a>
		</div>

		<section class="wrap" v-if="list && list.length > 0">
			<list :page="page" :pages="pages" :dataList=list :loading="loading" @onCreated="init" @onLoadMore="loadMore"></list>
		</section>
	</section>
</template>

<script>
import API from '@/api';
import List from './List';
import { setTimeout, clearTimeout } from 'timers';
export default {
	data() {
		return {
			value: '',
			length: 2,
			loading: false,
			page: 1,
			pages: 1,
			list: [],
			visible: true,
			placeholder: '搜索政策名称',
			cancelText: '取消'
		};
	},
	components: {
		List
	},
	watch: {
		value() {
			this.list = [];
			if (this.value.length >= this.length) {
				let timer = '';
				clearTimeout(timer);
				timer = setTimeout(() => {
					this.fetchData();
				}, 500);
			}

			// if (!this.value) {
			// 	this.list = [];
			// }
		}
	},
	directives: {
		// 一个获取焦点的自定义指令
		focus: {
			// 当被绑定的元素插入到 DOM 中时
			inserted: function(el) {
				// 聚焦元素
				el.focus();
			}
		}
	},
	methods: {
		/**
		 * 初始化
		 */
		init() {},

		/**
		 * 获取数据
		 */
		async fetchData() {
			try {
				const res = await API.getSearchResult(this.value, this.page);
				this.pages = res.data.pages;
				this.list = this.list.concat(res.data.records);

				// 设为false时触发无限滚动
				this.loading = false;

				console.log('res', res.data);
			} catch (error) {
				console.log('搜索出错了~');
			}
		},

		/*
		* 载入更多
		*/
		loadMore() {
			this.loading = true;
			this.page++;
			if (this.page <= this.pages) {
				this.fetchData();
			}
		},

		/*
		* 搜索框点击时
		*/
		handleClick() {
			this.visible = true;
		},

		/**
		 * 取消并返回
		 */
		handleCancel() {
			this.$router.go('-1');
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	background: #fff;
	margin-top: 1rem;
}

.mint-searchbar {
	padding: 1px;
	background-color: #fff;
	border-bottom: 2px solid #b83539;
}

.mint-searchbar-inner {
	padding: 0 1rem;
	height: 46px;
	border-radius: 0;
	background-color: #fff;

	.mintui-search {
		font-size: 1.6rem;
		color: #b83539;
		margin-right: 0.5rem;
	}
}

.mint-searchbar-core {
	font-size: 1.1rem;
}

.mint-searchbar-cancel {
	color: #999;
	margin: 0 1rem;
}
</style>
