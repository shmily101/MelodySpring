<template>
	<div id="app">
		<img src="../assets/logo.png" id="logo">
		<p class="font" id="title">声生曼</p>
		<div id="bottom">
			<p class="font" id="English">your Minuet Mixer</p>
			<el-form :model="Form" ref="Form" class="form">
				<el-form-item label="用户名">
					<el-input v-model="Form.username" style="border-radius: 100px;"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input type="password" v-model="Form.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item class="button">
				   <el-button type="info" round @click="submitForm('FormMess')" style="border-radius: 15px;">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				Form: {
					username: '',
					password: '',
				}
			};
		},
		methods: {
			submitForm() {
				var that = this;
				this.$refs.Form.validate((valid) => {
				    if (valid) {
						// this.$axios({
						// 	method: 'post',
						// 	url: 'http://localhost:8085/wj/submit',
						// 	data: that.FormMess
						// }).then((res)=>{
						// 	console.log('succeed!');
						// 	console.log(JSON.stringify(that.FormMess));
						// });
						this.$router.push('/create');
				    } 
					else {
				        alert('请输入账号密码！');
				        return false;
				    }
				});
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
	text-align: center;
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
.form {
	width: 40%;
	margin: 30px auto;
}
.el-form-item__label {
	color: #FFFFFF;
	font-size: 16px;
	margin-left: 10px;
}
.button {
	margin-top: 30px;
	width: 100px;
	display: inline-block;
}
.el-form-item {
    margin-bottom: 10px;
}
.el-input__inner {
	border-radius: 10px;
}
</style>

