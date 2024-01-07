<template>
	<div id="app">
		<img src="../assets/create_bg.png" id="bg">
		<div id="block">
			<div class="userInfo">
				<img src="../assets/info.png" id="pic"/>
				<p id="username">Mikey</p>
				<p id="signature">这个人很懒，什么都没有留下来</p>
				<el-button icon="el-icon-edit" id="edit">编辑个人信息</el-button>
				<div>
					<el-button id="exit">退出登录</el-button>
				</div>
			</div>
			<div class="work">
				 <el-table
				    :data="tableData"
				    max-height="380"
					style="margin: 0px 10px; width: 95%;">
				    <el-table-column
				      fixed
				      prop="works"
				      label="我的作品">
				    </el-table-column>
					<el-table-column
					    fixed="right"
					    label=""
						width="100px">
						<template slot-scope="scope">
							<el-button
								@click.native.prevent="viewRow(scope.$index, tableData)"
								type="text"
								size="small">
								查看
							</el-button>
					        <el-button
								@click.native.prevent="deleteRow(scope.$index, tableData)"
								type="text"
								size="small">
								移除
					        </el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<router-link to="/create">
				<i class="el-icon-s-home" id="home1"></i>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [
					{
						works: "哼唱录音转谱1",
					},
					{
						works: "哼唱录音转谱2",
					},
					{
						works: "音频转谱1",
					},
					{
						works: "音频转谱2",
					},
				]
			}
		},
		methods: {
			deleteRow(index, rows) {
			    rows.splice(index, 1);
			}
		}
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
.uesr {
	position: absolute;
	top: -75px;
	left: 780px;
}
#home1 {
	color: #FFFFFF;
	position: absolute;
	top: -61px;
	left: 840px;
	font-size: 23px;
}
.userInfo {
	text-align: center;
	width: 300px;
	height: 500px;
	position: absolute;
	left: 80px;
	top: 20px;
}
/* 78 80 */
#pic {
	height: 200px;
	/* position: absolute; */
	/* left: 100px; */
	/* top: 90px; */
	margin-top: 90px;
}
#username {
	/* position: absolute; */
	/* left: 173px; */
	/* top: 287px; */
	font-size: 19px;
	margin-top: 0px;
}
#signature {
	/* position: absolute; */
	/* left: 105px; */
	/* top: 320px; */
	font-size: 14px;
	color: grey;
	margin-top: 10px;
}
#edit {
	border: none;
	/* position: absolute; */
	/* left: 145px; */
	/* top: 360px; */
	padding: 0px;
	margin-top: 20px;
}
#exit {
	border: none;
	/* position: absolute; */
	/* left: 145px; */
	/* top: 360px; */
	padding: 0px;
	margin-top: 20px;
}
.work {
	width: 400px;
	height: 400px;
	position: absolute;
	left: 480px;
	top: 85px;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    transition: .3s;
	box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
	border-radius: 4px;
	overflow: hidden;
}
.el-table th>.cell {
	margin-top: 12px;
	margin-bottom: 5px;
	color: #303133;
	font-size: 16px;
}
.el-table td, .el-table th.is-leaf {
	border: none;
}
.el-table__fixed-right::before, .el-table__fixed::before, .el-table::before {
	width: 0px;
	height: 0px;
}
</style>
