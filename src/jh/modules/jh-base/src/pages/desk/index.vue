<!-- 自定义桌面 -->
<template>
	<div class="customDesk">
		<div class="settingBox">
			<el-radio-group v-model="type" size="small">
				<el-radio-button label="1">单屏模式</el-radio-button>
				<el-radio-button label="2">滚动模式</el-radio-button>
			</el-radio-group>
			<div class="flexBlank"></div>
			<div class="title">网格尺寸:{{ clientWidth }} x {{ clientHeight }}</div>
			<div class="flexBlank"></div>
			<el-button type="success" @click="previewDesk">预览</el-button>
			<el-button type="primary" @click="editDesk(1)">添加组件</el-button>
			<el-button type="primary" @click="editDesk()">修改组件</el-button>
			<el-button type="danger" @click="delDesk()">删除组件</el-button>
			<el-button type="primary" @click="saveDesk()">保存</el-button>
		</div>
		<div class="desk" v-show="!showPreview">
			<div class="deskContent">
				<!-- isConflictCheck冲突检测  parent是否可以移出父元素-->
				<vdr
					v-for="item in list"
					:key="item.deskId"
					:grid="grid"
					@activated="onActivated(item)"
					@resizestop="onResize"
					@dragstop="onDrag"
					:isConflictCheck="true"
					:parent="type == '1'"
					:w="item.w"
					:h="item.h"
					:x="item.x"
					:y="item.y"
				>
					<div class="flexCenter">
						<p>{{ item.compName }}</p>
					</div>
				</vdr>
			</div>
		</div>
		<div class="previewDesk" v-show="showPreview">
			<template v-if="cops.length > 0">
				<div
					v-for="item in cops"
					:key="item.name"
					:style="item.style"
					class="borderBox"
				>
					<component
						v-if="item.compStyle == '1'"
						:is="item.compUrl"
					></component>
					<iframe
						v-if="item.compStyle == '3'"
						:src="item.compUrl"
						frameborder="0"
						style="height:100%;width:100%;"
					></iframe>
					<iframe
						v-if="item.compStyle == '2'"
						:src="origin + item.compUrl"
						frameborder="0"
						style="height:100%;width:100%;"
					></iframe>
				</div>
			</template>
		</div>
		<deskComDialog
			@onSuccess="setData"
			v-if="deskComDialogVisible"
			:deskComDialogVisible.sync="deskComDialogVisible"
			:deskComDialogConfig="deskComDialogConfig"
		/>
	</div>
</template>

<script>
import vdr from 'vue-draggable-resizable-gorkys';
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css';
export default {
	name: 'customDesk',
	components: {
		vdr,
		deskComDialog: (resolve) => resolve(require('./deskComDialog')),
	},
	props: {
		//作为组件引用传值
		data: {
			type: Object,
			default: () => {},
		},
	},

	data() {
		return {
			clientWidth: 1000,
			clientHeight: 480,
			width: 10, //网格大小
			height: 10, //网格大小
			x: 0,
			y: 0,
			grid: [10, 10],
			list: [],
			drawer: false,
			type: 1, //区分设计模式1是单屏模式 2是滚动模式
			timer: null,
			deskComDialogVisible: false,
			deskComDialogConfig: { title: '添加组件' },
			currentCom: null,
			cops: [],
			showPreview: false,
		};
	},
	//设置侧边栏监听
	computed: {
		isCollapse: function() {
			return this.$store.state.init.isCollapse;
		},
	},
	watch: {
		type: function(val) {
			if (val == 1) {
				document.querySelector('.deskContent').style.height = '480px';
				document.querySelector('.deskContent').style.overflow = 'hidden';
				this.clientWidth = 1000;
				this.clientHeight = 480;
			} else {
				document.querySelector('.deskContent').style.height = '2000px';
				document.querySelector('.deskContent').style.overflow = 'auto';
				this.clientWidth = 2000;
				this.clientHeight = 480;
			}
		},
		isCollapse: function(val) {
			this.$nextTick(() => {
				this.setResize();
			});
		},
	},
	mounted() {
		console.log(document.querySelector('.customDesk').style.height);
		this.getDeskData();
		this.$nextTick(() => {
			this.setGrille();
		});
	},
	methods: {
		previewDesk() {
			this.showPreview = !this.showPreview;
			if (!this.showPreview) {
				return;
			}
			setTimeout(() => {
				let width = parseInt(
					window.getComputedStyle(document.querySelector('.previewDesk')).width
				);
				let height = parseInt(
					window.getComputedStyle(document.querySelector('.previewDesk')).height
				);
				let list = JSON.parse(JSON.stringify(this.list));
				for (let iterator of list) {
					iterator.style = {
						position: 'absolute',
						height: height * (iterator.h / 480) + 'px',
						width: width * (iterator.w / 1000) + 'px',
						left: width * (iterator.x / 1000) + 'px',
						top: height * (iterator.y / 480) + 'px',
					};
				}
				this.cops = [];
				this.$nextTick(() => {
					this.cops = list;
					this.showPreview = true;
				});
			}, 1000);
		},
		//大小变动
		onResize(x, y, width, height) {
			let index = this.list.indexOf(this.currentCom);
			this.list[index].x = x;
			this.list[index].y = y;
			this.list[index].w = width;
			this.list[index].h = height;
		},
		//组件被拖动
		onDrag(x, y) {
			let index = this.list.indexOf(this.currentCom);
			this.list[index].x = x;
			this.list[index].y = y;
		},
		//组件被激活
		onActivated(vdr) {
			console.log(vdr);
			this.currentCom = vdr;
		},
		//保存桌面
		saveDesk() {
			if (this.data) {
				let param = {
					defaultList: JSON.parse(JSON.stringify(this.list)),
					roleId: this.data.id,
				};
				for (let iterator of param.defaultList) {
					iterator.roleId = this.data.id;
				}
				this.$api
					.post('/api/basfun/desk/deskRoleCompDefault/doSaveList', param)
					.then((res) => {
						this.$message.success('保存成功');
						this.$emit('onSuccess');
					});
			} else {
				let param = {
					userCompList: JSON.parse(JSON.stringify(this.list)),
				};
				this.$api
					.post('/api/basfun/desk/deskUserComp/doSaveList', param)
					.then((res) => {
						this.$message.success('保存成功');
						this.list = [];
						this.getDeskData();
					});
			}
		},
		//删除桌面
		delDesk() {
			let index = this.list.indexOf(this.currentCom);
			console.log(index);
			this.list.splice(index, 1);
		},
		//修改桌面
		editDesk(type) {
			if (type == 1) {
				this.deskComDialogConfig.title = '添加组件';
				this.deskComDialogVisible = true;
			} else {
				if (!this.currentCom) {
					this.$message.warning('请至少选择一个组件');
					return;
				}
				this.deskComDialogConfig.title = '修改组件';
				this.deskComDialogConfig.data = JSON.parse(
					JSON.stringify(this.currentCom)
				);
				this.deskComDialogVisible = true;
			}
		},
		//弹窗返回值
		setData(data) {
			if (data.id) {
				let index = this.list.indexOf(this.currentCom);
				this.list[index] = data;
			} else {
				if (
					this.list.filter((item) => {
						return item.compName === data.compName;
					}).length > 0
				) {
					this.$message.warning('组件已存在');
				} else {
					this.list.push(data);
				}
			}
		},
		//获取桌面数据
		getDeskData() {
			this.$api
				.formPost('/api/basfun/desk/deskUserComp/doGetListByUserId', {})
				.then((res) => {
					this.list = res.retBody.list;
				});
			/* if(this.data) {
                this.$api.formPost("/api/basfun/desk/deskRoleCompDefault/doGetList",{roleId:this.data.id}).then(res => {
                    this.list = res.retBody.list;
                })
            }else {
                this.$api.formPost("/api/basfun/desk/deskUserComp/doGetListByUserId",{}).then(res => {
                    this.list = res.retBody.list;
                })
            } */
		},
		//设置网格线
		setGrille() {
			// let width = parseInt(window.getComputedStyle(document.querySelector(".customDesk")).width)%20;
			// //20是customDesk的边距
			// width = parseInt(window.getComputedStyle(document.querySelector(".customDesk")).width) - 20 - width;
			document.querySelector(
				'.deskContent'
			).style = `background-size:${this.height}px ${this.width}px, ${this.height}px ${this.width}px;`;
		},
	},
};
</script>
<style lang="scss" scoped>
.customDesk {
	height: 100%;
	width: 100%;
	padding: 0px 10px 10px 10px;
	.settingBox {
		padding: 10px 0px;
		display: flex;
		width: 100%;
		.flexBlank {
			flex-grow: 1;
		}
		.title {
			font-size: 25px;
			font-weight: 600;
		}
	}
	.desk {
		text-align: center;
		overflow: auto;
		height: calc(100% - 60px);
		.deskContent {
			position: relative;
			height: 480px;
			margin: 0 auto;
			width: 1000px;
			overflow-y: hidden;
			overflow-x: hidden;
			border: 1px solid rgba(0, 0, 0, 0.1);
			// border-bottom: 1px solid rgba(0, 0, 0, .1);
			background-color: #808080;
			background: linear-gradient(
					-90deg,
					rgba(0, 0, 0, 0.1) 1px,
					transparent 1px
				),
				linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
			background-position: '10px 10px';
		}
	}
}
.previewDesk {
	height: 100%;
	width: 100%;
	position: relative;
	border: 1px solid #000;
}
/deep/ .vdr {
	border-color: #008dff;
}
.flexCenter {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100%;
}
</style>
