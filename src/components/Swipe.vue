<template>
  <mt-swipe :auto="auto" style="height:214px">
    <mt-swipe-item><a href="http://nianhui.govmade.com/"><img :src="'static/images/banner-1.jpg'" alt="banner"></a></mt-swipe-item>
    <mt-swipe-item><a href="http://nianhui.govmade.com/node/802"><img :src="'static/images/banner-2.jpg'" alt="banner"></a></mt-swipe-item>
    <mt-swipe-item><a href="http://nianhui.govmade.com/node/804"><img :src="'static/images/banner-3.jpg'" alt="banner"></a></mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
	data() {
		return {
			auto: 4000
		};
	}
};
</script>

<style lang="scss" scoped>
img {
	width: 100%;
}
</style>




