<template>
  <section class="history">
    <mt-header title="浏览历史" fixed>
			<router-link to="/mine" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>

    <section class="content">
      <ul v-if="historyList.legnth > 0"></ul>
      <p v-else>你没有浏览记录。</p>
    </section>
  </section>
</template>

<script>
export default {
	data() {
		return {
			historyList: []
		};
	}
};
</script>

<style lang="scss" scoped>
.history {
	padding-top: 40px;
}
.content {
	background: #fff;
	margin-top: 10px;
	padding: 15px 1rem;
}
</style>
