<template>
  <div id="app">
    <div :class="$store.state.hasFooterTab ? 'has-tab' : ''">
      <router-view/>
    </div>
    <footer-tabs></footer-tabs>
  </div>
</template>

<script>
import FooterTabs from '@/components/FooterTabs';

export default {
	name: 'app',
	data() {
		return {};
	},
	components: {
		FooterTabs
	},
	watch: {
		$route(to, from) {
			this.$store.commit('SELECT_TAB', to.name);
			console.log('to', to);
			console.log('from', from);
		}
	}
};
</script>