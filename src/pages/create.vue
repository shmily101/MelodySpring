<template>
	<div id="app">
		<img src="../assets/create_bg.png" id="bg">
		<div id="block">
			<!-- <img src="../assets/white.png" id="white"/> -->
			<router-link to="/transcp">
				<img src="../assets/changpian.png" id="changpian" class="content"/>
				<span class="content" id="tx_yp">音频转换</span>
			</router-link>
			<router-link to="/transmk">
				<img src="../assets/maike.png" id="maike" class="content"/>
				<span class="content" id="tx_hc">哼唱转换</span>
			</router-link>
			<div class="line content"></div>
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
#changpian {
	left: 120px;
	top: 110px;
	height: 280px;
}
#maike {
	left: 600px;
	top: 110px;
	height: 280px;
}
.line {
	width: 1px;
	height: 500px;
	border-left: 1px solid #CCCCCC;
	left: 470px;
	top: 40px;
}
#tx_yp {
	left: 185px;
	top: 430px;
	font-size: 19px;
	color: black;
}
#tx_hc {
	left: 668px;
	top: 430px;
	font-size: 19px;
	color: black;
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
</style>
