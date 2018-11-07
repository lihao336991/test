<template>
    <div class="container">
        <div>这是socket</div>
        <div class="single" :model="task" v-for="(item,index) in task" :key="index" v-if="item">
            <el-row>
                <el-col :span="16">
                    <el-card shadow="never" style="text-align:center;border:0">
                    姓名：<el-button @click="fetch('text','name',index)"><span v-html="item.name?item.name:''"></span></el-button>
                    </el-card>
                </el-col>
            </el-row>
                <el-row>
                <el-col :span='4'>
                    <el-card shadow="never" style="border:0">
                    <el-button @click="fetch('text','today',index)">今天要做的事：</el-button>
                    </el-card>
                    </el-col>
                <el-col :span="12">                    
                    <span v-html="item.today?item.today:''"></span>                    
                </el-col>
                </el-row>
                <br>
                <el-row>
                <el-col :span='4'>
                    <el-card shadow="never" style="border:0">
                    <el-button @click="fetch('text','tomorrow',index)">明天要做的事：</el-button>
                    </el-card>
                    </el-col>
                <el-col :span="12">
                   
                    <span v-html="item.tomorrow?item.tomorrow:''"></span>
                    
                </el-col>
                </el-row>
                <br>
                <el-row>
                <el-col :span='4'>
                    <el-card shadow="never" style="border:0">
                    <el-button @click="fetch('text','question',index)">遇到的问题：</el-button>
                    </el-card>
                    </el-col>
                <el-col :span="12">                    
                    <span v-html="item.question?item.question:''"></span>                    
                </el-col>
            </el-row>
            <hr>
        </div>
        <el-button @click="remove">删除</el-button>
        <el-button @click="add">增加</el-button>
        <UEditor :config="config" ref="ueditor" class="ueditor" @change="contentChange"></UEditor>        
        <el-button type="primary" class="send" style="" @click="sendMsg">发送</el-button>
    </div>
</template>

<script>
import io from 'socket.io-client';
import UEditor from "@/components/common-components/ueditor.vue";
import Interface from '@/util/interface.js';
var status = 0;
var socket = io('http://localhost:3002',{
    path:'/socket',
    autoConnect:false,
});
//监听登录
socket.on('login',function(data){
    console.log(data.msg)
})
//断线重连
socket.on('disconnect', () => {
  socket.open();
});
export default {
    components: { UEditor },
    data(){
        return{
            config: {
                //可以在此处定义工具栏的内容
                toolbars: [
                ['fullscreen', 'undo', 'redo','|','bold', 'italic', 'underline',
                '|','superscript','subscript','|', 'insertorderedlist', 'insertunorderedlist',
                '|','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify']
                ],
                autoHeightEnabled: true, //高度自适应
                autoFloatEnabled: true, //是否工具栏可浮动
                initialContent: "", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                initialFrameWidth: null, //默认宽度
                initialFrameHeight: 200, //默认高度
                BaseUrl: "",
                UEDITOR_HOME_URL: "static/ueditor/" //静态资源相对路径
            },
            msgs:[],
            task:[],
            type:'',
            index:0,
        }
    },
    created(){
        this.fetch('list')
    },
    mounted(){        
        socket.open();
        var _this =this   
        //监听广播消息
        socket.on('update',function(data){            
            _this.fetch('list')
        })
    },
    methods:{
        fetch(scence,type,index){
            if(scence == 'list'){
                let params = {
                    id: sessionStorage.getItem('id')
                }
                Interface.getData('get',Interface.task.list,params).then(res=>{
                    if(res.data.code == 200){
                        this.task = JSON.parse(res.data.data[0].task)
                        console.log(this.task)
                    }
                })
            }else if(scence == 'text'){
                this.index = index;
                this.type= type;
                this.$refs.ueditor.setContent(this.task[index][type])
                console.log(this.task[index][type])
            }
        },
        reset(){
            this.type = '';
            this.index = 0;
            this.$refs.ueditor.setContent('')
        },
        sendMsg(){            
            // 给connection连接发送一条消息
            
            this.task[this.index][this.type] = this.$refs.ueditor.getContent()
            this.edit();

        },
        getContent() {
            let content = this.$refs.ueditor.getContent();
            alert(content);
        },
        contentChange(data){
            // console.log(data)
            // socket.emit('mes',{editor:data,msg:'这是编辑器的最新内容'})
        },
        remove(index){
            this.task.splice(index,1);
            this.edit();
        },
        add(){
            this.task.push({
                name:"",
                today:'',
                tomorrow:'',
                question:''
            })
            this.edit()
        },
        edit(){
            let c = JSON.stringify(this.task)
            console.log(c,typeof c)
            let params = {
                task:JSON.stringify(this.task),
                id: sessionStorage.getItem('id'),
                _methods:"put"
            }
            var that = this
            Interface.getData('post',Interface.task.list,params).then(res=>{
                if(res.data.code==200){                    
                    socket.emit('mes',{editor:that.$refs.ueditor.getContent()})
                    that.reset();
                }
            })
        },
    }
}
</script>

<style scoped>
.container{
    position: relative;
    min-height: 100vh;
}
.ueditor{
    width: 100%;
    position: sticky;
    bottom: 50px;
    left: 120px;
}
.send{
    width:100%;
    height:50px;
    position:sticky;
    bottom: 0px;
    left: 120px;
}
.el-row{
    margin-bottom: 10px;
}
.focus{
    outline:-webkit-focus-ring-color auto 5px;
}
</style>
