<template>
  <section class="topic">
		<mt-header title="订阅页" fixed>
			<span @click="goBack" slot="left">
				<mt-button icon="back"></mt-button>
			</span>
		</mt-header>

		<section class="content">
			<header>
				<h2>我订阅的主题</h2>
				<img src="/static/images/loading.gif" alt="" v-if="loading" style="margin: 0 6px 0 auto;">
				<mt-button type="danger" size="small" @click="editing = true" v-if="!editing">编缉</mt-button>
				<mt-button type="primary" size="small" @click="handleSimSave" v-else>保存</mt-button>
			</header>
			<ul class="list" v-if="subscribedTopicList.length > 0">
				<li v-for="item in subscribedTopicList" :key="item.id" @click="handleClick(item)">
					<i class="mint-toast-icon mintui mintui-field-error" v-if="editing"></i>
					<span>{{item.label}}</span>
				</li>
			</ul>
			<p v-else style="color: #999">你还没有订阅主题。</p>
		</section>

		<section class="content">
			<header>
				<h2>全部主题</h2>
				<span v-if="editing" style="color: #999">请选择下面的主题进行订阅</span>
			</header>
			<ul class="list" v-if="topicList.length > 0">
				<li v-for="item in topicList" :key="item.id" @click="handleClick2(item)">
					<span>{{item.label}}</span>
				</li>
			</ul>
			<p v-else style="color: #999">你已经订阅了所有主题。</p>
		</section>
	</section>
</template>

<script>
import API from '@/api';
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			userId: 2, //测试的用户ID
			editing: this.$store.state.isEditTopic || false,
			loading: false,
			topicList: [],
			subscribedTopicList: JSON.parse(localStorage.getItem('topicID')) || []
		};
	},
	mounted() {
		this.getAllTopic();
	},
	methods: {
		/**
		 * 获取所有主题
		 */
		async getAllTopic() {
			const res = await API.getPolicyTopic();
			this.topicList = res.data.records;
			this.filterTopic();
			console.log('topic', res.data);
		},

		/**
		 * 筛选出所有主题跟已订阅主题ID值不一样的数据
		 */
		async filterTopic() {
			this.topicList = this.topicList.filter(
				item => !this.subscribedTopicList.some(ele => ele.id === item.id)
			);

			console.log('this.topicList', this.topicList);
		},

		/**
		 * 模拟保存主题，数据只保存到浏览器
		 */
		async handleSimSave() {
			this.loading = true;
			Toast('保存成功');

			console.log('this.subscribedTopicList', this.subscribedTopicList);

			localStorage.setItem('topicID', JSON.stringify(this.subscribedTopicList));

			setTimeout(() => {
				this.editing = false;
				this.loading = false;
			}, 1000);
		},

		/**
		 * 保存主题
		 */
		async handleSave() {
			this.loading = true;
			const res = await API.saveSubscribedTopic(
				this.userId,
				this.subscribedTopicList
			);

			if (res.data.code == 1) {
				this.editing = false;
				this.loading = false;
				Toast('保存成功');
			}
			console.log('save', res);
		},

		/**
		 * 点击已订阅主题的处理函数
		 * @description 如果是编辑状态可以编辑主题，否则可以跳转到主题页
		 * @param {Object} item 每个主题的对象数据
		 */
		handleClick(item) {
			if (this.editing) {
				this.cancelSubscribed(item.id);
			} else {
				this.handleToTopicList(item.value, item.label);
			}
		},

		/**
		 * 点击全部主题的处理函数
		 * @description 如果是编辑状态可以编辑主题，否则可以跳转到主题页
		 * @param {Object} item 每个主题的对象数据
		 */
		handleClick2(item) {
			if (this.editing) {
				this.handleSubscribed(item.id);
			} else {
				this.handleToTopicList(item.value, item.label);
			}
		},

		/**
		 * 跳转到主题页
		 * @param {Number} value 主题的值
		 * @param {String} title 主题的标题
		 */
		handleToTopicList(value, title) {
			this.$store.commit('SET_TOPIC_TITLE', title);
			this.$router.push({ name: 'TopicList', params: { value } });
		},

		/**
		 * 编辑订阅主题
		 * @description 先定义一个临时数组，用来存放点击订阅的主题，然后再筛选出没有点击订阅的主题，这个即是还剩下没有订阅的主题。
		 * @param {Number} id 主题ID
		 */
		handleSubscribed(id) {
			if (this.editing) {
				let temp = this.topicList.filter(item => item.id == id);
				this.topicList = this.topicList
					.filter(item => item.id != id)
					.sort(this.sortNum);
				this.subscribedTopicList = this.subscribedTopicList
					.concat(temp)
					.sort(this.sortNum);

				console.log(this.subscribedTopicList);
			}
		},

		/**
		 * 取消订阅主题
		 * @description 先定义一个临时数组，用来存放取消订阅的主题，然后再筛选出没有取消订阅的主题，这个即是还在订阅的主题数。
		 * @param {Number} id 主题ID
		 */
		cancelSubscribed(id) {
			if (this.editing) {
				let temp = this.subscribedTopicList.filter(item => item.id == id);
				this.subscribedTopicList = this.subscribedTopicList
					.filter(item => item.id != id)
					.sort(this.sortNum);
				this.topicList = this.topicList.concat(temp).sort(this.sortNum);

				console.log(this.subscribedTopicList);
			}
		},

		goBack() {
			this.$store.commit('RESET_TOPIC_EDITING_STATUS', false);
			this.$router.push('mine');
		},

		/**
		 * 排序
		 * @description 让主题以参数sort进行排序
		 */
		sortNum(a, b) {
			//排序方法
			return a.sort - b.sort;
		}
	}
};
</script>

<style lang="scss" scoped>
.topic {
	padding-top: 40px;
}

.mint-button {
	font-size: 0.8rem;
	height: 30px;
	padding: 0 15px;
}

.content {
	background: #fff;
	margin-top: 10px;
	padding: 15px 1rem;

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
	}

	h2 {
		margin: 0;
		font-size: 1.3rem;
	}

	.list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 0 -5px;

		li {
			position: relative;
			flex: 0 0 33.33%;
			padding: 0 5px;
			margin: 0 0 10px;
			height: 50px;

			span {
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				background: #f4f4f4;
				padding: 0 14px;
				height: 100%;
			}

			.mint-toast-icon {
				position: absolute;
				right: -3px;
				top: -6px;
				color: #777;
				font-size: 1.4rem;
			}
		}
	}
}
</style>
