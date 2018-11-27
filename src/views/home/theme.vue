<template>
  <section class="wrap">
    <header class="title">热门主题</header>
    <mt-swipe :auto="0" :show-indicators="false" :style="size == '8' ? 'height: 205px' : 'height: 112px'">
      <mt-swipe-item v-for="(theme, i) in topicData" :key="i">
        <div class="row">
          <div class="col" v-for="item in theme" :key="item.value" @click="toLink(item.value, item.label)">
						<img :src="item.icon" :alt="item.label" />
						<span>{{ item.label }}</span>
          </div>
        </div>
      </mt-swipe-item>
    </mt-swipe>
  </section>
</template>

<script>
import API from '@/api';
export default {
	data() {
		return {
			size: 4, // 每个小数组的长度
			number: 4, // 优先显示的主题数量
			topicData: [
				[
					{ value: 'l', label: '数字政府', icon: 'static/icon/topic-1.png' },
					{ value: 'q', label: '营商环境', icon: 'static/icon/topic-2.png' },
					{
						value: '2',
						label: '人才引进和能力提升',
						icon: 'static/icon/topic-3.png'
					},
					{ value: '3', label: '投资融资', icon: 'static/icon/topic-4.png' }
				]
			]
		};
	},
	created() {
		// this.getTopic();
	},
	methods: {
		/**
		 * 获取主题数据
		 */
		async getTopic() {
			const res = await API.getPolicyTopic(this.number);
			this.topicData = this.chunk(res.data.records, this.size);
		},

		/**
		 * 跳转到主题页
		 * @param {Number} value 主题的值
		 * @param {String} title 主题的标题
		 */
		toLink(value, title) {
			this.$store.commit('SET_TOPIC_TITLE', title);
			this.$router.push({ name: 'TopicList', params: { value } });
		},

		/**
		 * 将一个数组分隔成多个指定长度的数组
		 * @param {Array} arr 数据数组
		 * @param {Number} size 每个小数组的长度
		 */
		chunk(arr, size) {
			let temp = [];
			for (var i = 0; i < arr.length; i = i + size) {
				temp.push(arr.slice(i, i + size));
			}
			return temp;
		}
	}
};
</script>

<style lang="scss" scoped>
.row {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	.col {
		flex: 0 0 25%;
		padding: 0 1rem;
		margin: 15px 0 0;
		text-align: center;
		font-size: 0.9rem;

		a {
			text-decoration: none;
			color: #333;
		}
	}

	img {
		display: block;
		margin: 0 auto 5px;
		width: 50px;
	}
}
</style>