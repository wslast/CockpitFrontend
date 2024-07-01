<template>
	<el-dialog
		title="配置CRON表达式"
		:visible.sync="dialogCrontVisible"
		append-to-body
	>
		<div class="cron" :val="value_">
			<el-tabs type="border-card" :value="activeName">
				<el-tab-pane label="秒" name="s">
					<second v-on:child-say="s" ref="refsecond" lable="秒"></second>
				</el-tab-pane>
				<el-tab-pane label="分" name="m">
					<minute v-on:child-say="m" ref="refminute" lable="分"></minute>
				</el-tab-pane>
				<el-tab-pane label="时" name="h">
					<hour v-on:child-say="h" ref="refhour" lable="时"></hour>
				</el-tab-pane>
				<el-tab-pane label="日" name="d">
					<day v-on:child-say="d" ref="refday" lable="日"></day>
				</el-tab-pane>
				<el-tab-pane label="月" name="month">
					<month v-on:child-say="month" ref="refmonth" lable="月"></month>
				</el-tab-pane>
				<el-tab-pane label="周" name="week">
					<week v-on:child-say="week" ref="refweek" lable="周"></week>
				</el-tab-pane>
				<el-tab-pane label="年" name="year">
					<year v-on:child-say="year" ref="refyear" lable="年"></year>
				</el-tab-pane>
			</el-tabs>

			<div class="card">
				<el-table :data="tableData">
					<el-table-column
						v-for="(item, key) in columns1"
						:key="key"
						:prop="item.key"
						:label="item.title"
					>
					</el-table-column>
				</el-table>
				<p>cron表达式</p>
				<el-input v-model="val" placeholder="请输入内容">
					<i
						slot="suffix"
						class="el-input__icon el-icon-success"
						@click="setCron"
					></i>
				</el-input>
			</div>
		</div>
	</el-dialog>
</template>

<script>
import second from './second';
import minute from './minute';
import hour from './hour';
import day from './day';
import month from './month';
import week from './week';
import year from './year';
export default {
	data() {
		return {
			thatcron: this,
			dialogCrontVisible: false,

			crondata: '',
			val: '',
			//
			activeName: 'h',
			sVal: '*',
			mVal: '*',
			hVal: '*',
			dVal: '*',
			monthVal: '*',
			weekVal: '?',
			yearVal: ' ',
			columns1: [
				{
					title: '秒',
					key: 'sVal',
				},
				{
					title: '分',
					key: 'mVal',
				},
				{
					title: '时',
					key: 'hVal',
				},
				{
					title: '日',
					key: 'dVal',
				},
				{
					title: '月',
					key: 'monthVal',
				},
				{
					title: '周',
					key: 'weekVal',
				},
				{
					title: '年',
					key: 'yearVal',
				},
			],
			data1: [],
		};
	},
	mounted() {},
	computed: {
		tableData() {
			return [
				{
					sVal: this.sVal,
					mVal: this.mVal,
					hVal: this.hVal,
					dVal: this.dVal,
					monthVal: this.monthVal,
					weekVal: this.weekVal,
					yearVal: this.yearVal,
				},
			];
		},
		value_() {
			let v = `${this.sVal} ${this.mVal} ${this.hVal} ${this.dVal} ${this.monthVal} ${this.weekVal} ${this.yearVal}`;
			this.$emit('input', v);
			this.val = v;
			return v;
		},
	},
	watch: {
		sVal(cur, old) {
			if (cur === ' ') {
				this.sVal = '?';
			}
		},
		mVal(cur, old) {
			if (old == '*') {
				this.init(1);
			}
			if (cur === ' ') {
				this.mVal = '?';
			}
		},
		hVal(cur, old) {
			if (old == '*') {
				this.init(2);
			}
			if (cur === ' ') {
				this.hVal = '?';
			}
		},
		dVal(cur, old) {
			if (old == '*') {
				this.init(3);
			}
			if (cur === ' ') {
				this.dVal = '?';
			}
			if (!this.dVal && !this.weekVal) {
				return '';
			}
			if (this.dVal === '?' && this.weekVal === '?') {
				this.$message.error('日期与星期不可以同时为“不指定”');
			}
			if (this.dVal !== '?' && this.weekVal !== '?') {
				this.$message.error('日期与星期必须有一个为“不指定”');
			}
		},
		weekVal(cur, old) {
			if (cur === ' ') {
				this.weekVal = '?';
			}
			if (!this.dVal && !this.weekVal) {
				return '';
			}
			if (this.dVal === '?' && this.weekVal === '?') {
				this.$message.error('日期与星期不可以同时为“不指定”');
			}
			if (this.dVal !== '?' && this.weekVal !== '?') {
				this.$message.error('日期与星期必须有一个为“不指定”');
			}
		},
		monthVal(cur, old) {
			if (cur === ' ') {
				this.monthVal = '?';
			}
		},
		yearVal(cur, old) {
			if (cur === ' ') {
				this.yearVal = '?';
			}
		},
	},
	methods: {
		setCron() {
			if (this.dVal === '?' && this.weekVal === '?') {
				this.$message.error('日期与星期不可以同时为“不指定”');
				return;
			}
			if (this.dVal !== '?' && this.weekVal !== '?') {
				this.$message.error('日期与星期必须有一个为“不指定”');
				return;
			}

			let val = this.val;
			this.$emit('backCall', val);
			this.dialogCrontVisible = false;
		},
		s: function(somedata) {
			this.sVal = somedata;
		},
		m: function(somedata) {
			this.mVal = somedata;
		},
		h: function(somedata) {
			this.hVal = somedata;
		},
		d: function(somedata) {
			this.dVal = somedata;
		},
		month: function(somedata) {
			this.monthVal = somedata;
		},
		week: function(somedata) {
			this.weekVal = somedata;
		},
		year: function(somedata) {
			this.yearVal = somedata;
		},
		init(key) {
			switch (key) {
				case 1:
					this.sVal == '*' ? (this.sVal = 0) : this.sVal;
					break;
				case 2:
					this.sVal == '*' ? (this.sVal = 0) : this.sVal;
					this.mVal == '*' ? (this.mVal = 0) : this.mVal;
					break;
				case 3:
					this.sVal == '*' ? (this.sVal = 0) : this.sVal;
					this.mVal == '*' ? (this.mVal = 0) : this.mVal;
					this.hVal == '*' ? (this.hVal = 0) : this.hVal;
					break;
			}
		},
		onInit(cron) {
			if (cron == null || cron == '') {
				cron = '* * * * * ? ';
			}
			this.dialogCrontVisible = true;
			this.$nextTick(() => {
				let valus = cron.split(' ');
				this.sVal = valus[0];
				this.mVal = valus[1];
				this.hVal = valus[2];
				this.dVal = valus[3];
				if (valus.length >= 5) this.monthVal = valus[4];
				if (valus.length >= 6) this.weekVal = valus[5];
				else this.weekVal = '?';
				if (valus.length >= 7) this.yearVal = valus[6];
				else this.yearVal = '';
				this.$refs.refsecond.init(this.sVal);
				this.$refs.refminute.init(this.mVal);
				this.$refs.refhour.init(this.hVal);
				this.$refs.refday.init(this.dVal);
				this.$refs.refmonth.init(this.monthVal);
				this.$refs.refweek.init(this.weekVal);
				this.$refs.refyear.init(this.yearVal);
			});
		},
	},
	created() {
		//this.updateVal()
	},
	components: {
		second,
		minute,
		hour,
		day,
		month,
		week,
		year,
	},
};
</script>

<style lang="scss" scoped>
.cron {
	text-align: left;
	padding: 10px;
	background: #fff;
	border: 1px solid #dcdfe6;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
/deep/ .el-radio {
	margin-bottom: 10px;
}

.el-icon-success {
	cursor: pointer;
	font-size: 25px;
	color: green;
}
</style>
