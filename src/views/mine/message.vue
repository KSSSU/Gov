<template>
  <section class="message">
    <mt-header title="消息中心" fixed>
			<router-link to="/mine" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>

    <section class="content">
      <ul v-if="msgList.legnth > 0"></ul>
      <p v-else>你没有消息通知。</p>
    </section>
  </section>
</template>

<script>
export default {
	data() {
		return {
			msgList: []
		};
	}
};
</script>

<style lang="scss" scoped>
.message {
	padding-top: 40px;
}
.content {
	background: #fff;
	margin-top: 10px;
	padding: 15px 1rem;
}
</style>
