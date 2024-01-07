<template>
	<div id="app">
		<img src="../assets/create_bg.png" id="bg">
		<div id="block">
			<!-- 录音模块 -->
			<div id="recorder">
				<!-- 按钮们 -->
				<div class="button2">
					<div>
						<el-button icon="el-icon-mic" @click="startRecorder()">开始录音</el-button>
						<el-button icon="el-icon-turn-off-microphone" @click="pauseRecorder()">暂停录音</el-button>
						<el-button icon="el-icon-microphone" @click="resumeRecorder()">继续录音</el-button>
						<el-button icon="el-icon-switch-button" @click="stopRecorder()">结束录音</el-button>
					</div>
					<div>
						<el-button icon="el-icon-headset"  @click="playRecorder()">播放录音</el-button>
						<el-button icon="el-icon-video-pause"  @click="pausePlayRecorder()" >暂停播放</el-button>
						<el-button icon="el-icon-video-play"  @click="resumePlayRecorder()">继续播放</el-button>
						<el-button icon="el-icon-switch-button"  @click="stopPlayRecorder()" >结束播放</el-button>
					</div>
				</div>
				<div id="mask">
					<!-- 音频波浪图 -->
					<canvas id="canvas"></canvas>
				</div>
				<el-button type="danger" round @click="transForm()" id="trans">转换</el-button>
			</div>
			
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
	import Recorder from 'js-audio-recorder'
	const lamejs = require('lamejs')
	const recorder = new Recorder({
	  sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
	  sampleRate: 48000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
	  numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
	  // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
	})
	// 回调获取数据方式
	recorder.onprogress = function(params) {
	  // console.log('--------------START---------------')
	  // console.log('录音时长(秒)', params.duration);
	  // console.log('录音大小(字节)', params.fileSize);
	  // console.log('录音音量百分比(%)', params.vol);
	  // console.log('当前录音的总数据([DataView, DataView...])', params.data);
	 
	  // console.log('--------------END---------------')
	}
	export default {
		data() {
			return {
				//波浪图-录音
				drawRecordId:null,
				oCanvas : null,
				ctx : null,
				//波浪图-播放
				drawPlayId:null,
				pCanvas : null,
				pCtx : null,
			};
		},
		mounted(){
		  this.startCanvas();
		},
		methods: {
			/**
			 * 波浪图配置
			 * */
			startCanvas(){
			  //录音波浪
			  this.oCanvas = document.getElementById('canvas');
			  this.ctx = this.oCanvas.getContext("2d");
			  //播放波浪
			  this.pCanvas = document.getElementById('canvas');
			  this.pCtx = this.pCanvas.getContext("2d");
			},
			/**
			 *  录音的具体操作功能
			 * */
			// 开始录音
			startRecorder () {
				Recorder.getPermission().then(() => {
				  this.$Message.success('获取权限成功')
				}, (error) => {
				  console.log(`${error.name} : ${error.message}`);
				});
				recorder.start().then(() => {
					this.drawRecord();//开始绘制图片
				}, (error) => {
			    // 出错了
					console.log(`${error.name} : ${error.message}`);
				});
			},
			// 继续录音
			resumeRecorder () {
				recorder.resume();
				this.drawRecord();
			},
			// 暂停录音
			pauseRecorder () {
				recorder.pause();
				this.drawRecordId && cancelAnimationFrame(this.drawRecordId);
				this.drawRecordId = null;
			},
			// 结束录音
			stopRecorder () {
				recorder.stop()
				this.drawRecordId && cancelAnimationFrame(this.drawRecordId);
				this.drawRecordId = null;
			},
			// 录音播放
			playRecorder () {
				recorder.play();
				this.drawPlay();//绘制波浪图
			},
			// 暂停录音播放
			pausePlayRecorder () {
				recorder.pausePlay()
			},
			// 恢复录音播放
			resumePlayRecorder () {
				recorder.resumePlay();
				this.drawPlay();//绘制波浪图
			},
			// 停止录音播放
			stopPlayRecorder () {
				recorder.stopPlay();
			},
			/**
			   * 绘制波浪图-录音
			* */
			drawRecord () {
			    // 用requestAnimationFrame稳定60fps绘制
			    this.drawRecordId = requestAnimationFrame(this.drawRecord);
			 
			    // 实时获取音频大小数据
			    let dataArray = recorder.getRecordAnalyseData(),
			        bufferLength = dataArray.length;
			 
			    // 填充背景色
			    //this.ctx.fillStyle = 'rgb(200, 200, 200)';
				this.ctx.fillStyle = 'white';
			    this.ctx.fillRect(0, 0, this.oCanvas.width, this.oCanvas.height);
			 
			    // 设定波形绘制颜色
			    this.ctx.lineWidth = 1;
			    this.ctx.strokeStyle = 'rgb(0, 0, 0)';
			 
			    this.ctx.beginPath();
			 
			    var sliceWidth = this.oCanvas.width * 1.0 / bufferLength, // 一个点占多少位置，共有bufferLength个点要绘制
			            x = 0;          // 绘制点的x轴位置
			 
			    for (var i = 0; i < bufferLength; i++) {
			      var v = dataArray[i] / 128.0;
			      var y = v * this.oCanvas.height / 2;
			 
			      if (i === 0) {
			        // 第一个点
			        this.ctx.moveTo(x, y);
			      } else {
			        // 剩余的点
			        this.ctx.lineTo(x, y);
			      }
			      // 依次平移，绘制所有点
			      x += sliceWidth;
			    }
			 
			    this.ctx.lineTo(this.oCanvas.width, this.oCanvas.height / 2);
			    this.ctx.stroke();
			  },
			  /**
			   * 绘制波浪图-播放
			   * */
			  drawPlay () {
			    // 用requestAnimationFrame稳定60fps绘制
			    this.drawPlayId = requestAnimationFrame(this.drawPlay);
			 
			    // 实时获取音频大小数据
			    let dataArray = recorder.getPlayAnalyseData(),
			            bufferLength = dataArray.length;
			 
			    // 填充背景色
			    this.ctx.fillStyle = 'white';
			    this.pCtx.fillRect(0, 0, this.pCanvas.width, this.pCanvas.height);
			 
			    // 设定波形绘制颜色
			    this.pCtx.lineWidth = 1;
			    this.pCtx.strokeStyle = 'rgb(0, 0, 0)';
			 
			    this.pCtx.beginPath();
			 
			    var sliceWidth = this.pCanvas.width * 1.0 / bufferLength, // 一个点占多少位置，共有bufferLength个点要绘制
			            x = 0;          // 绘制点的x轴位置
			 
			    for (var i = 0; i < bufferLength; i++) {
			      var v = dataArray[i] / 128.0;
			      var y = v * this.pCanvas.height / 2;
			 
			      if (i === 0) {
			        // 第一个点
			        this.pCtx.moveTo(x, y);
			      } else {
			        // 剩余的点
			        this.pCtx.lineTo(x, y);
			      }
			      // 依次平移，绘制所有点
			      x += sliceWidth;
			    }
			 
			    this.pCtx.lineTo(this.pCanvas.width, this.pCanvas.height / 2);
			    this.pCtx.stroke();
			},
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
#canvas {
	width: 325px;
	height: 170px;
	position: absolute;
	left: 10px;
	top: 13px;
}
#mask {
	width: 350px;
	height: 200px;
	background-image: url(../assets/dash1.png);
	background-size: 100% 100%;
	position: absolute;
	left: 50px;
	top: 200px;
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
#empty {
	width: 150px;
	margin-top: 100px;
	opacity: 0.8;
}
.button1 {
	position: absolute;
	left: 550px;
	top: 510px;
}
.button2 {
	position: absolute;
	left: 30px;
	top: 110px;
}
.button2 .el-button {
	border: none;
	padding: 10px;
	margin-left: 0px;
}
#trans {
	position: absolute;
	left: 187px;
	top: 420px;
	padding: 9px 20px; 
	border-radius: 13px;
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
