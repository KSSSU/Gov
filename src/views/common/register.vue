<template>
  <section class="field-box">
		<img src="../../assets/images/logo.png" alt="国策" width="120px;">
    <header><h1>国策数据, 决策数据</h1></header>
    <div class="field">
      <mt-field label="" placeholder="请输入手机号" type="tel" v-model="phone"  v-if="visible">
        <span @click="handleSendCaptcha" class="captcha" v-if="countDown < 0">发送验证码</span>
        <span class="captcha" v-else>{{countDown}}s</span>
      </mt-field>
      <mt-field label="" placeholder="请输入验证码" type="number" v-model="captcha" v-if="visible"></mt-field>

			<mt-field label="" placeholder="用户名" v-model="form.username"></mt-field>
			<mt-field label="" placeholder="真实姓名" v-model="form.realName"></mt-field>
			<mt-field label="" placeholder="手机号" v-model="form.phone"></mt-field>
			<mt-field label="" placeholder="密码" type="password" v-model="form.password"></mt-field>
			<mt-field label="" placeholder="确认密码" type="password" v-model="form.checkPass"></mt-field>
    </div>
    <mt-button type="danger" @click="valid">注册</mt-button>
    <span class="protocol" @click="popupVisible = true" v-if="visible">我已阅读并同意"用户协议"</span>
    <div class="line-container" style="margin-top: 15px">
      <span @click="handleLogin">立即登陆</span>
		</div>

		<!-- 用户协议 -->
		<protocol :popupVisible="popupVisible" @onClose="popupVisible = false;"></protocol>
  </section>
</template>

<script>
import API from '@/api';
import Protocol from './protocol';
import { Toast } from 'mint-ui';
import { isMobile } from '@/utils/validate';
export default {
	data() {
		return {
			visible: false,
			userID: 2, // 临时测试用户
			phone: '',
			captcha: '',
			countDown: -1,
			time: '',
			popupVisible: false,
			form: {
				username: '',
				realName: '',
				phone: '',
				password: '',
				checkPass: ''
			}
		};
	},
	components: {
		Protocol
	},
	watch: {
		/**
		 * 监听计时器变化
		 */
		countDown(value) {
			if (value < 0) {
				this.countDown = -1;
				clearInterval(this.time);
			}
		}
	},
	beforeDestroy() {
		/**
		 * 组件销毁前清除计时器
		 */
		clearInterval(this.time);
	},
	methods: {
		/**
		 * 验证登录
		 */
		valid() {
			if (
				this.form.username &&
				this.form.realName &&
				this.form.phone &&
				this.form.password &&
				this.form.checkPass
			) {
				if (!isMobile(this.form.phone)) {
					return false;
				}
				this.onSubmit();
			} else {
				Toast('请填写完整信息');
			}
		},

		/**
		 * 注册帐号
		 */
		async onSubmit() {
			try {
				this.form.newpassword1 = this.form.password;
				const res = await API.register(this.form);
				console.log('register', res);

				if (res.data.data == true) {
					Toast('注册成功，3秒后跳转到登录页。');
					// this.$cookie.set('token', this.userID);
					this.$store.commit('SELECT_TAB', 'mine');
					this.$store.commit('RESET_TOPIC_EDITING_STATUS', true);

					setTimeout(() => {
						this.$router.push('login');
					}, 3000);
				}
			} catch (error) {
				console.log('注册失败', error);
			}
		},

		/**
		 * 发送验证码
		 */
		handleSendCaptcha() {
			this.countDown = 60;
			this.timer();
			console.log('Send captcha', this.countDown);
		},

		/**
		 * 倒计时器
		 */
		timer() {
			this.time = setInterval(() => {
				this.countDown--;
			}, 1000);
		},

		/**
		 * 回退到登陆页
		 */
		handleLogin() {
			this.$router.go('-1');
		}
	}
};
</script>

<style lang="scss" scoped>
header h1 {
	margin-top: 0;
}
</style>
