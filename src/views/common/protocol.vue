<template>
  <mt-popup	v-model="popupVisible" popup-transition="popup-fade" class="protocol-popup">
    <article>用户协议</article>
    <div style="text-align: center"><mt-button type="primary" @click="$emit('onClose')">确定</mt-button></div>
  </mt-popup>
</template>

<script>
export default {
	props: { popupVisible: { type: Boolean, default: false } }
};
</script>

<style lang="scss" scoped>
article {
	padding: 20px;
}
.mint-button {
	width: 30%;
	box-shadow: none;
}
</style>
