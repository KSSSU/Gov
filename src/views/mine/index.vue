<template>
  <section class="personal">
		<mt-header title="个人中心" fixed></mt-header>

		<div class="personal-into">
			<div class="avatar">
				<img :src="avatar ? avatar : 'static/images/default.png'" alt="avatar" class="avatar-img">
				<p style="color: #999; font-size: 1rem; text-align: center">普通会员</p>
			</div>
			<div class="info">
				<div class="name">{{name}}</div>
				<div class="phone">{{phone}}</div>
				<div class="signature" v-if="visible">{{signature}}</div>
			</div>
			<mt-button type="danger" size="small" v-if="visibleEditButton">编辑</mt-button>
			<!-- <mt-button type="danger" size="small" @click="handleLogout">退出</mt-button> -->
		</div>

		<ul class="line-container">
			<li v-for="(item,index) in perList" :key="index">
				<router-link :to="item.to">
					<img :src="item.icon" :alt="item.label">
					<span>{{item.label}}</span>
				</router-link>
			</li>
		</ul>

		<div class="wrap">
			<header class="title">热门政策</header>
			<list :page="page" :pages="pages" :dataList=list :loading="loading" @onCreated="init" @onLoadMore="loadMore"></list>
		</div>
	</section>
</template>

<script>
import API from '@/api';
import { Toast } from 'mint-ui';
import { getToken, removeToken } from '@/utils';
import List from '@/components/List';
import { setTimeout } from 'timers';
export default {
	data() {
		return {
			name: '',
			phone: '',
			signature: '个性签名',
			avatar: '',
			loading: false,
			page: 1, //当前页数
			pages: 1, //总页数
			list: [],
			visible: false,
			visibleEditButton: false,
			perList: [
				{
					label: '订阅',
					to: '/subscription',
					icon: 'static/icon/subscription.png'
				},
				{
					label: '消息通知',
					to: '/message',
					icon: 'static/icon/message.png'
				},

				{ label: '浏览历史', to: '/history', icon: 'static/icon/history.png' }
			]
		};
	},
	components: {
		List
	},
	mounted() {
		this.getUserInfo();
	},
	methods: {
		/**
		 * 初始化
		 */
		init() {
			this.loading = true;
			this.fetchData();
		},

		/**
		 * 获取用户信息
		 */
		async getUserInfo() {
			const user = getToken();
			this.name = `${user} (游客)`;
		},

		/**
		 * 获取用户信息
		 */
		async getUserInfo2() {
			try {
				const res = await API.getUserInfo('');

				if (res.data.code == 0 && res.data.data) {
					this.name = res.data.data.sysUser.username;
					this.phone = res.data.data.sysUser.phone;
					this.$store.commit('SET_USER_INFO', res.data.data.sysUserVO);
					this.$store.commit('SET_ROLES', res.data.data.roles);
				}
				console.log('user', res);
			} catch (error) {
				console.log('获取用户信息失败~', error);
			}
		},

		/**
		 * 获取数据
		 * @param {page} Number 当前页数
		 */
		async fetchData() {
			try {
				const res = await API.getTodayPolicy(this.page);
				this.pages = res.data.pages;
				this.list = this.list.concat(res.data.records);

				// 设为false时触发无限滚动
				this.loading = false;

				console.log('res', res.data);
			} catch (error) {
				console.log('获取今日政策出错了~');
			}
		},

		/**
		 * 退出
		 */
		async handleLogout() {
			const res = await API.logout();

			if (res.data.code == 0 && res.data.data == true) {
				Toast('注销成功');
				removeToken();
				setTimeout(() => {
					this.$store.commit('SELECT_TAB', 'home');
					this.$router.push('/');
				}, 1000);
			}
			console.log('logout', res);
		},

		/**
		 * 滚动载入更多
		 */
		loadMore() {
			console.log('loadmore');
			this.loading = true;
			this.page++;
			if (this.page <= this.pages) {
				this.fetchData();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.personal {
	padding-top: 40px;
}

.personal-into {
	display: flex;
	flex-direction: row;
	padding: 20px 1rem;
	justify-content: space-between;
	align-items: center;
	background: #fff;

	.avatar {
		width: 60px;
	}

	.avatar-img {
		width: 100%;
		border-radius: 50%;
		background: #eee;
		border: 1px solid #eee;
	}

	.info {
		display: flex;
		flex: 1;
		margin: 0 20px;
		flex-direction: column;
		color: #999;

		.name {
			font-weight: bold;
			color: #333;
			margin-bottom: 5px;
		}
	}

	.mint-button {
		font-size: 0.8rem;
		height: 30px;
		padding: 0 15px;
	}
}

.line-container {
	display: flex;
	padding: 20px 0;
	list-style: none;
	margin: 0;
	background: #fff;
	justify-content: space-evenly;
	text-align: center;

	li {
		flex: 0 0 24%;

		a {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-decoration: none;
			color: #999;
			font-size: 1rem;
		}

		img {
			width: 40px;
			margin-bottom: 10px;
		}
	}
}
</style>
