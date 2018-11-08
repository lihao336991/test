<template>
    <div class="container">        
        <el-input placeholder="输入文档名" v-model="title" @change="edit" style="width: 250px;font-size:25px;font-weight:bold"></el-input>
        <div class="single" :model="task" v-for="(item,index) in task" :key="index" v-if="item">
             <el-row>
                <el-col :span="24">
                    <el-card shadow="never" style="text-align:center;border:0">
                    <el-input placeholder="输入姓名" v-model="item.name" @change="edit" style="width: 150px;font-size:20px;font-weight:bold"></el-input>
                    </el-card>
                </el-col>
            </el-row>
            <div class="hoversingle">
                <el-row>
                <el-col :span='4'>
                    <el-card shadow="never" style="border:0;font-weight:bold">
                   今天要做的事：
                    </el-card>
                    </el-col>
                <el-col :span="12">                    
                    <span v-html="item.today?item.today:''"></span>                    
                </el-col>
                </el-row>
                <br>
                <el-row>
                <el-col :span='4'>
                    <el-card shadow="never" style="border:0;font-weight:bold">
                    明天要做的事：
                    </el-card>
                    </el-col>
                <el-col :span="12">                   
                    <span v-html="item.tomorrow?item.tomorrow:''"></span>                    
                </el-col>
                </el-row>
                <br>
                <el-row>
                <el-col :span='4'>
                    <el-card shadow="never" style="border:0;font-weight:bold">
                    今天遇到的问题：
                    </el-card>
                    </el-col>
                <el-col :span="12">                    
                    <span v-html="item.question?item.question:''"></span>                    
                </el-col>
            </el-row>
            <div class="btngroup">
                <el-button style="width:200px" type="danger" @click="remove(index)">删除</el-button>
                <el-button style="width:200px" type="info" @click="open(index)">编辑</el-button>
            </div>
            <hr>
            </div>
           
                
            
        </div>
        
        <el-button style="width:100%" type="primary" @click="add">插入</el-button>
        <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        width="50%">
        <h2 style="font-weight:bold">今天要做的事：</h2>
        <UEditor :config="config" uid="today" ref="today"></UEditor>      
        <h2 style="font-weight:bold">明天要做的事：</h2>              
        <UEditor :config="config" uid="tomorrow" ref="tomorrow"></UEditor>   
        <h2 style="font-weight:bold">今天遇到的问题：</h2>                 
        <UEditor :config="config" uid="question" ref="question"></UEditor>                    
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendMsg">确 定</el-button>
        </span>
        </el-dialog>
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
    // console.log(data.msg)
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
                autoHeightEnabled: false, //高度自适应
                autoFloatEnabled: true, //是否工具栏可浮动
                initialContent: "", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                initialFrameWidth: null, //默认宽度
                initialFrameHeight: 200, //默认高度
                BaseUrl: "",
                UEDITOR_HOME_URL: "../../static/ueditor/" //静态资源相对路径
            },
            msgs:[],
            title:'',
            task:[],
            index:0,
            dialogVisible:false,
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
        fetch(scence){
            if(scence == 'list'){
                let params = {
                    id: this.$route.params.id
                }
                Interface.getData('get',Interface.task.list,params).then(res=>{
                    if(res.data.code == 200){                        
                        this.task = JSON.parse(res.data.data[0].task)||[]
                        this.title = res.data.data[0].name
                    }
                })
            }
        },
        reset(){
            this.type = '';
            this.index = 0;
            if(this.dialogVisible){
                this.$refs.today.setContent('');
                this.$refs.tomorrow.setContent('');
                this.$refs.question.setContent('');
                this.dialogVisible = false;
            }
        },
        sendMsg(){            
            // 给connection连接发送一条消息            
            this.task[this.index].today = this.$refs.today.getContent()
            this.task[this.index].tomorrow = this.$refs.tomorrow.getContent()
            this.task[this.index].question = this.$refs.question.getContent()
            console.log(this.task[this.index])
            this.edit();
        },
        open(index){
            this.index = index
            this.dialogVisible = true;
            setTimeout(()=>{
                this.$refs.today.setContent(this.task[index].today);
                this.$refs.tomorrow.setContent(this.task[index].tomorrow);
                this.$refs.question.setContent(this.task[index].question);
            },300)
        },
        remove(index){
            this.task.splice(index,1);
            this.edit();
        },
        add(index){
            // this.task.splice(index+1,0,{
            //     name:"",
            //     today:'',
            //     tomorrow:'',
            //     question:'',
            // })
            this.task.push({
                name:"",
                today:'',
                tomorrow:'',
                question:'',
            })
            this.edit();
        },
        edit(){
            let c = JSON.stringify(this.task)
            let params = {
                task:JSON.stringify(this.task),
                id: this.$route.params.id,
                _methods:"put",
                name:this.title
            }
            var that = this
            Interface.getData('post',Interface.task.list,params).then(res=>{
                if(res.data.code==200){                    
                    socket.emit('mes',{editor:'233'})
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
.single{
    position: relative;    
}
.hoversingle{
    position: relative;    
    
}
.btngroup{
    display: block;
    position:absolute;
    text-align: center;    
    width:100%;
    height: 0px;
    background-color:rgba(0,0,0,0.1);
    left:0;
    top:0px;
    transition: height 0.3s;
    -webkit-transition: height 0.3s;
}
.btngroup .el-button{
    display: none;
}
.hoversingle:hover .btngroup{
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
}
.hoversingle:hover .el-button{
    display: block;
}
</style>
