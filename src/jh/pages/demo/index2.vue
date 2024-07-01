<!--  -->
<template>
    <div>
        <jh-big-file-upload></jh-big-file-upload>
        <el-button @click="test">test</el-button>
        <p style="font-size:var(--text-size);background:var(--theme-color)">
            豫章故郡 洪都新府
        </p>
        <p style="font-size:var(--text-size);">星分翼轸 地接衡庐</p>
        <p style="font-size:var(--text-size);">襟三江而带五湖</p>
        <p style="font-size:var(--text-size);">控蛮荆而引瓯越</p>
        <el-upload
            action="''"
            multiple
            :limit="3"
            :auto-upload="false"
            :on-change="change"
        >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
            </div>
        </el-upload>
        <el-date-picker
            ref="aa"
            v-model="value1"
            @focus="focus"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
        ></el-date-picker>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    name: 'demo2',
    components: {},

    data() {
        return {
            a: 12,
            value1: [],
            timer: null,
        };
    },

    computed: {},

    created() {
        // console.log(crossOriginIsolated);
        // console.log(FFmpeg);
        // console.log(
        //   _.remove([1, 3, 4, 5], function(n) {
        //     return n % 2 == 0;
        //   })
        // );
        this.$api.formPost('/api/table/list', { id: 1 }).then((res) => {
            console.log(res);
        });
    },
    mounted() {
        // console.log(createElement);
        this.interval(() => {
            console.log(1);
        }, 2000);
    },
    beforeDestroy() {
        this.timer && clearTimeout(this.timer);
    },
    methods: {
        interval(func, wait) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                func();
                this.interval(func, wait);
            }, wait);
        },
        focus() {
            console.log(this.$refs.aa);
            this.$nextTick(() => {
                this.$refs.aa.pickerVisible = false;
                this.$refs.aa.blur();
            });
        },
        test() {
            console.log(document.documentElement.style);
            if (
                document.documentElement.style.getPropertyValue(
                    '--text-size',
                ) === '16px'
            ) {
                document.documentElement.style.setProperty(
                    '--text-size',
                    '14px',
                );
                this.$ELEMENT.size = 'small';
            } else {
                document.documentElement.style.setProperty(
                    `--text-size`,
                    '16px',
                );
                this.$ELEMENT.size = 'medium';
            }
            // document.querySelector("html").style = "font-size:" + this.a + "px";
        },
        change(file, fileList) {
            console.log(file);
            this.getData(file);
        },
        async getData(resdata) {
            console.log('创建实例');
            const ffmpeg = FFmpeg.createFFmpeg({
                log: true,
                progress: ({ ratio }) => {
                    console.log(`完成率: ${(ratio * 100.0).toFixed(2)}%`);
                },
            });
            console.log('创建成功');
            const transcode = async (files) => {
                console.log(files);
                console.log('-----');
                console.log(ffmpeg);
                const { name } = files;
                console.log('正在加载 ffmpeg-core.js');
                await ffmpeg.load();
                console.log('开始压缩');
                console.log(name);
                ffmpeg.FS('writeFile', name, await FFmpeg.fetchFile(files.raw));
                // '-b','2000000'  值越小  压缩率越大
                // await ffmpeg.run('-i', name, '-b', '20000000', 'put.mp4');

                await ffmpeg.run(
                    '-i',
                    name,
                    '-threads',
                    '5',
                    '-preset',
                    'ultrafast',
                    '-c:v',
                    'libx264',
                    '-x264-params',
                    'crf=27',
                    'out.mp4',
                );
                console.log('压缩完成');
                console.log(ffmpeg);
                const data = ffmpeg.FS('readFile', 'out.mp4');
                console.log(data);
                let file = new File([data.buffer], name, { type: 'video/mp4' });
                this.src = URL.createObjectURL(
                    new Blob([data.buffer], {
                        type: 'video/mp4',
                    }),
                );
                console.log(file);
            };
            transcode(resdata);
        },
    },
};
</script>
<style lang="scss" scoped></style>
