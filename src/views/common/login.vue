<template>
  <section class="field-box">
		<img src="static/images/tourist.png" alt="游客" width="50px;">
    <header><h1>游客</h1></header>

    <div class="field">
      <mt-field label="" placeholder="请输入手机号" type="tel" v-model="phone" v-if="visible">
        <span @click="handleSendCaptcha" class="captcha" v-if="countDown < 0">发送验证码</span>
        <span class="captcha" v-else>{{countDown}}s</span>
      </mt-field>

      <mt-field label="" placeholder="用户名" v-model="loginForm.username"></mt-field>
      <mt-field label="" placeholder="密码" type="password" v-model="loginForm.password"></mt-field>
      <mt-field label="" placeholder="验证码" v-model="loginForm.code" :attr="{ maxlength: code.len }">
				<img :src="code.src" class="login-code-img" @click="refreshCode" />
			</mt-field>
    </div>

    <mt-button type="danger" @click="valid">进入国策数据</mt-button>
    <span class="protocol" @click="popupVisible = true" v-if="visible">点击查看"用户协议"</span>
    <div class="line-container" style="margin-top: 20px;">
      <router-link to="/register">帐号注册</router-link>
    </div>

    <!-- 用户协议 -->
    <protocol :popupVisible="popupVisible" @onClose="popupVisible = false;"></protocol>
  </section>
</template>

<script>
import API from '@/api';
import { randomLenNum, encryption, setToken } from '@/utils';
import Protocol from './protocol';
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			visible: false,
			phone: '',
			captcha: '',
			countDown: -1,
			time: '',
			popupVisible: false,
			loginForm: {
				username: '',
				password: '',
				code: '',
				randomStr: ''
			},
			code: {
				src: '',
				value: '',
				len: 4,
				type: 'image'
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
	created() {
		this.refreshCode();
	},
	methods: {
		/**
		 * 获取验证码
		 */
		refreshCode() {
			const codeUrl = `/api/code`;

			this.loginForm.randomStr = randomLenNum(this.code.len, true);
			this.code.type === 'text'
				? (this.code.value = randomLenNum(this.code.len))
				: (this.code.src = `${codeUrl}?randomStr=${this.loginForm.randomStr}`);
			this.loginForm.code = this.code.value;
		},

		/**
		 * 验证登录
		 */
		valid() {
			if (
				this.loginForm.username &&
				this.loginForm.password &&
				this.loginForm.code
			) {
				this.onSubmit();
			} else {
				Toast('请填写完整信息');
			}
		},

		/**
		 * 提交登录
		 */
		async onSubmit() {
			try {
				const user = encryption({
					data: this.loginForm,
					key: 'dipscloudisbest1',
					param: ['password']
				});

				const res = await API.login(
					user.username,
					user.password,
					user.code,
					user.randomStr
				);

				Toast('登录成功');
				setToken(res.data.access_token);
				this.$store.commit('SELECT_TAB', 'mine');
				this.$store.commit('SET_ACCESS_TOKEN', res.data.access_token);
				this.$store.commit('SET_REFRESH_TOKEN', res.data.refresh_token);

				setTimeout(() => {
					this.$router.push('mine');
				}, 1000);

				console.log('login', res);
			} catch (error) {
				console.log('Login Error', error);
				this.refreshCode();
				Toast('请输入正确的用户名、密码和验证码');
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
		}
	}
};
</script>

<style lang="scss" scoped>
.field-box {
	padding-top: 30px;
}
</style>
