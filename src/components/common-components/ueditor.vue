<template>
  <div>
    <script id="editor" type="text/plain" ></script>
  </div>
</template>

<script>
  import '../../../static/ueditor/ueditor.config.js'
  import '../../../static/ueditor/ueditor.all.js'
  import '../../../static/ueditor/lang/zh-cn/zh-cn.js'

  export default {
    name: "UEditor",
    props: {
      id: {
          type: String
      },
      config: {
          type: Object
      }
    },
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      //初始化UE
      this.editor = UE.delEditor("editor");
      this.editor = UE.getEditor('editor',this.config);
      //添加observer，学着点！！！
      var _this = this
      this.editor.addListener("contentChange", function () {
          //监听到内容改变，触发事件change
          _this.$emit('change',_this.editor.getContent())
      });
      this.editor.addListener("beforeSetContent",function(){
        _this.editor.removeListener("contentChange")
      })
      this.editor.addListener("afterSetContent",function(){
        _this.editor.addListener("contentChange", function () {
          //监听到内容改变，触发事件change
          _this.$emit('change',_this.editor.getContent())
      });
      })
    },
    destoryed() {
      this.editor.destory();
    },
    methods:{
      getContent: function(){
       return this.editor.getContent();
      },
      getContentTxt: function(){
        return this.editor.getContentTxt();
      },
      setContent:function(html){
        this.editor.setContent(html)
      },
    }
  }
</script>
<style>
</style>

