<template>
  <div id="app">
    <img src="../assets/logo.png" id="logo">
	<p class="font" id="title">声生曼</p>
	<div id="bottom">
		<p class="font" id="English">your Minuet Mixer</p>
		<p>
			<el-button round class="button" id="login" @click="gotologin" style="border-radius: 40px;font-size: 1.125rem;">登录</el-button>
		</p>
		<p>
			<el-button type="info" round class="button" id="register" style="border-radius: 40px;font-size: 1.125rem;">注册</el-button>
		</p>
	</div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	methods: {
		gotologin() {
			this.$router.push('/login');
		}
	},
}
</script>

<style>
#app {
	text-align: center;
	height: 100%;
}
#logo {
	width: 18.125rem;
	height: 18.75rem;
	margin-top: 1.5625rem;
}
#bottom {
	width: 100%;
	height: calc(50vh);
	min-height: 350px;
	margin-bottom: -55vh;
	background-color: #89281B;
}
.font {
	font-family: SimSong-Regular;
	font-weight: 400;
}
#title {
	font-size: 50px;
	letter-spacing: 6.5px;
	color: #7B7172;
	margin-bottom: 0.9375rem;
}
#English {
	font-size: 25px;
	color: #FFFFFF;
	letter-spacing: 3.5px;
	padding-top: 0.625rem;
}
.button {
	width: 25rem;
	height: 3.5rem;
}
#login {
	margin-top: 5rem;
}
#register {
	margin-top: 2rem;
}
</style>
