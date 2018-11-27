<template>
	<transition name="slideInUp">
		<mt-tabbar v-model="selected" v-show="$store.state.hasFooterTab">
			<mt-tab-item id="home">
				<img slot="icon" :src="selected == 'home'?'static/icon/order-active.png':'static/icon/order.png'" />首页
			</mt-tab-item>
			<mt-tab-item id="subscription">
				<img slot="icon" :src="selected == 'subscription'?'static/icon/compass-active.png':'static/icon/compass.png'" />分类
			</mt-tab-item>
			<mt-tab-item id="mine">
				<img slot="icon" :src="selected == 'mine'?'static/icon/user-active.png':'static/icon/user.png'" />我的
			</mt-tab-item>
		</mt-tabbar>
	</transition>
</template>

<script>
export default {
	data() {
		return {
			selected: this.$store.state.selectedTab
		};
	},
	watch: {
		/**
		 * 点击tab选中
		 */
		selected(newVal, oldVal) {
			console.log(newVal);
			if (newVal == 'home') newVal = '';
			this.$router.push(`/${newVal}`);
			this.$store.commit('SELECT_TAB', newVal);
		}
	}
};
</script>

<style lang="scss">
.mint-tabbar {
	position: fixed !important;
}
</style>
