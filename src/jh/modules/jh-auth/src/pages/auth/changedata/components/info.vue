<!--
 * @Author: Junchi Zhao
 * @LastEditors: zjc2684613 1984937455@qq.com
 * @Description: 
-->
<template>
	<div class="userInfo">
		<el-upload
			class="avatar-uploader"
			action=""
			accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.PBG,.GIF"
			:on-change="changeFile"
			:show-file-list="false"
		>
			<img v-if="imageUrl" :src="imageUrl" class="avatar" />
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
		<div class="fg1"></div>
		<div class="info">
			<div class="title">用户名称</div>
			<div class="" :title="form.username">{{ form.username }}</div>
		</div>
		<div class="info">
			<div class="title">手机号</div>
			<div class="" :title="form.mobile">{{ form.mobile }}</div>
		</div>
		<div class="info">
			<div class="title">用户邮箱</div>
			<div class="" :title="form.email">{{ form.email }}</div>
		</div>
		<div class="info" style="border-bottom: 0px;">
			<div class="title">用户机构</div>
			<div class="" :title="form.organName">
				{{ form.organName }}
			</div>
		</div>
		<el-dialog title="头像裁剪" :visible.sync="dialogVisible" width="600px">
			<div style="width:100%;height:500px">
				<vue-cropper
					fixedBox
					:autoCropWidth="200"
					:autoCropHeight="200"
					autoCrop
					:img="cropperUrl"
					ref="cropper"
					centerBox
				/>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
export default {
	name: 'userInfo',
	components: {
		VueCropper,
	},
	props: {
		form: {
			type: Object,
			default: () => null,
		},
	},

	data() {
		return {
			dialogVisible: false,
			imageUrl: '',
			cropperUrl: '',
		};
	},

	computed: {},

	created() {
		this.getImg();
	},

	methods: {
		getImg() {
			this.$api
				.formPost('/api/auth/sysuserprofile/doGetUserProfile', {})
				.then((res) => {
					this.imageUrl = res.retBody;
				});
		},
		changeFile(file, fileList) {
			this.cropperUrl = URL.createObjectURL(file.raw);
			this.dialogVisible = true;
		},
		confirm() {
			this.$refs.cropper.getCropData((data) => {
				this.$api
					.formPost('/api/auth/sysuserprofile/doSetUserProfile', {
						profileStr: data,
					})
					.then((res) => {
						this.$message.success('上传成功');
						this.dialogVisible = false;
						this.$store.commit('refreshHeadImg');
						this.getImg();
					});
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.userInfo {
	width: 240px;
	display: flex;
	flex-direction: column;
	height: 100%;
	.info {
		font-size: var(--text-size);
		display: flex;
		justify-content: space-between;
		padding: 13px 0px;
		border-bottom: 1px solid #ccc;
		.title {
			min-width: 70px;
		}
	}
}
.avatar-uploader {
	width: 100%;
	border: 1px dotted #ccc;
	text-align: center;
}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 240px;
	height: 240px;
	line-height: 240px;
	text-align: center;
}
.avatar {
	width: 240px;
	height: 240px;
	display: block;
}
</style>
