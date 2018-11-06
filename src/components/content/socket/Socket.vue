<template>
    <div>
        <div>这是socket</div>
        
        <el-button @click="fetch('list')">拉数据</el-button>
        <el-button @click="edit">修改</el-button>
        <el-button @click="add">增加</el-button>
        <UEditor :config="config" ref="ueditor" class="ueditor" @change="contentChange"></UEditor>
        
        <p v-for="item in msgs" :key="item.id" v-html="item"></p>
        <el-button type="primary" class="send" style="" @click="sendMsg">发<br/><br/>送</el-button>
    </div>
</template>

<script>
import io from 'socket.io-client';
import UEditor from "@/components/common-components/ueditor.vue";
import Interface from '@/util/interface.js';
var status = 0;
var socket = io('39.107.233.105:3002',{
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
            if(data.content){
                setTimeout(()=>{
                    console.log(data.content,'接受的信息')                
                    _this.msgs.push(data.content)                    
                },150)
            }
        })
    },
    methods:{
        fetch(scence){
            if(scence == 'list'){
                let params = {
                    id: 5
                }
                Interface.getData('get',Interface.task.list,params).then(res=>{
                    if(res.data.code == 200){

                    }
                })
            }
        },
        sendMsg(){            
            //给connection连接发送一条消息
            socket.emit('mes',{editor:this.$refs.ueditor.getContent()})
            setTimeout(()=>{
                this.$refs.ueditor.setContent(``)
            },100)
        },
        getContent() {
            let content = this.$refs.ueditor.getContent();
            alert(content);
        },
        contentChange(data){
            // console.log(data)
            // socket.emit('mes',{editor:data,msg:'这是编辑器的最新内容'})
        },
        remove(){
            let params = {
                _methods:'delete',
                id:5
            }
            Interface.getData('post',Interface.task.list,params).then(res=>{

            })
        },
        add(){
            let params = {
                task:'这是一个测试信息，看能不能加进去'
            }
            Interface.getData('post',Interface.task.list,params).then(res=>{

            })
        },
        edit(id){
            id=1
            let params = {
                task:'这是一个修改信息，看能不能加进去',
                id: 5,
                _methods:"put"
            }
            Interface.getData('post',Interface.task.list,params).then(res=>{

            })
        },
    }
}
</script>

<style scoped>
.ueditor{
    margin-left: 120px;
    position: absolute;
    bottom: 10px;
}
.send{
    width:50px;
    height:250px;
    position:absolute;
    bottom: 10px;
    left: 70px;
}
</style>
