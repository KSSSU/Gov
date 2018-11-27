<template>
  <section class="field-box">
    <h2>选择主题</h2>
    <select v-model="selected">
      <option v-for="item in topicList" :key="item.id" :value="item.value">{{item.label}}</option>
    </select>
    <p><mt-button type="danger" @click="handleClick">确认登录</mt-button></p>  
  </section>
</template>

<script>
import API from '@/api';
import { setToken } from '@/utils';
export default {
	data() {
		return {
			selected: '',
			topicList: []
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
			console.log('topic', res.data);
		},

		async handleClick() {
			const res = await API.touristRegister(this.selected);

			setToken(res.data.username);
			localStorage.setItem('select_topic', JSON.stringify(this.selected));
			this.$store.commit('SELECT_TAB', 'Subscription');
			this.$store.commit('SELECT_NAVBAR', 1);
			this.$store.commit('SELECT_TOPIC', this.selected);
			this.$router.push('Subscription');

			console.log('res', res);
		}
	}
};
</script>

<style lang="scss" scoped>
.field-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 200px 30px;

	p {
		width: 100%;
	}

	.mint-button {
		width: 100%;
	}
}

h2 {
	margin: 0;
}

select {
	border: 1px solid #ddd;
	background: #eee;
	padding: 10px;
	width: 100%;
	margin: 20px 0;
	border-radius: 4px;

	option {
		font-weight: normal;
		display: block;
		white-space: pre;
		min-height: 1.2em;
		padding: 0px 2px 1px;
	}
}
</style>
