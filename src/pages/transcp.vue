<template>
	<div id="app">
		<img src="../assets/create_bg.png" id="bg">
		<div id="block">
			<el-upload
			  class="upload"
			  drag
			  action="https://jsonplaceholder.typicode.com/posts/"
			  :before-upload="beforeUpload"
			  :limit="1"
			  :on-exceed="handleExceed"
			  multiple>
			  <i class="el-icon-upload"></i>
			  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			  <div class="el-upload__tip" slot="tip">请上传mp3文件</div>
			</el-upload>
			
			<div class="midi">
				<img src="../assets/empty.png" id="empty"/>
				<p id="noFile">
					转换后乐谱将显示在这里
				</p>
			</div>
			<div class="button1">
				<el-button plain round type="success">在线浏览</el-button>
				<el-button plain style="margin-left: 50px;" round type="danger">下载PDF</el-button>
			</div>
			<router-link to="/create">
				<i class="el-icon-s-home" id="home"></i>
			</router-link>
			<router-link to="/mine">
				<div class="uesr">
					<img src="../assets/info.png" id="info"/>
					<span id="tx_username">Mikey</span>
				</div>
			</router-link>
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
			beforeUpload(file) {
				// console.log(file.type);
				const isMp3 = file.type === 'audio/mpeg';
				if(!isMp3) {
					this.$message.error('只能上传mp3格式喔😯');
				}
				return isMp3;
			},
			handleExceed() {
				this.$message.warning('一次只能生成一个文件喔😯');
			}
		},
	}
</script>

<style>
#app {
	/* text-align: center; */
	height: 100vh;
	width: 100vw;
	/* font-family: SimSong-Regular; */
	font-weight: 400;
}
/* 1125/1440=0.78125 */
/* 0.73828 */
#bg {
	margin: 0px;
	width: 100vw;
	height: 100vh;
	background-attachment: fixed;
	min-width: 70.3125rem;
	position: absolute;
	left: 0px;
	z-index: -1;
}
#white {
	width: 959px;
	height: 580px;
	z-index: 1;
}
#block {
	/* padding-top: 120px;
	text-align: center;
	background-image: url(../assets/white.png);
	width: 959px;
	height: 580px; */
	/* z-index: 1; */
	width: 959px;
	height: 580px;
	background: #FFFFFF;
	box-shadow: 4px 9px 29px 0 rgba(0,0,0,0.21);
	border-radius: 42px;
	margin: auto;
	position: relative;
	top: 120px;
}
.content {
	z-index: 100;
	position: absolute;
}
.upload {
	width: 300px;
	height: 330px;
	display: inline-block;
	background-image: url(../assets/dashed.png);
	background-size: 100% 100%;
	position: absolute;
	left: 90px;
	top: 90px;
	text-align: center;
}
.el-upload-dragger {
	width: 300px;
	height: 330px;
	border: none;
	background-color: transparent;
}
.el-upload-dragger .el-icon-upload {
	margin-top: 110px;
}
#file {
	margin-top: 115px;
}
#tx_upload {
	margin-top: 20px;
}
.midi {
	width: 400px;
	height: 440px;
	border: 3px solid #dfdce1;
	border-radius: 30px;
	position: absolute;
	left: 480px;
	top: 40px;
	text-align: center;
	/* background-image: url(../assets/dashed.png);
	background-size: 100% 100%; */
}
#noFile {
	margin-top: 30px;
	color: #7E8C8D;
	font-size: 13px;
}
.button1 {
	position: absolute;
	left: 550px;
	top: 510px;
}
#empty {
	width: 150px;
	margin-top: 100px;
	opacity: 0.8;
}
#home {
	color: #FFFFFF;
	position: absolute;
	top: -61px;
	left: 730px;
	font-size: 23px;
}
.uesr {
	position: absolute;
	top: -75px;
	left: 780px;
}
#info {
	height: 50px;
}
#tx_username {
	position: absolute;
	top: 17px;
	left: 62px;
	font-size: 17px;
	color: #FFFFFF;
}
#back {
	position: absolute;
	left: 90px;
	top: 30px;
}
</style>
