<template>
  <section>
    <swipe></swipe>
    <router-link to="/search" class="search-box"><i class="mintui mintui-search"></i>搜索</router-link>
		<theme></theme>
		<policy></policy>
  </section>
</template>

<script>
import Swipe from '@/components/Swipe';
import Policy from './policy';
import Theme from './theme';

export default {
	data() {
		return {};
	},
	components: {
		Swipe,
		Theme,
		Policy
	}
};
</script>

<style lang="scss">
.search-box {
	display: flex;
	justify-content: center;
	align-items: center;
	background: #fff;
	color: #999;
	height: 2.6rem;
	margin: 1.3rem 1rem 1rem;
	border-radius: 22px;
	text-decoration: none;

	.mintui-search {
		margin-right: 0.5rem;
	}
}
</style>
