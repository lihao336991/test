<template>
    <div class="set">
    <div class="btn-groups">
      <button @click="getContent">获取内容</button>
    </div>
    <UEditor :config="config" ref="ueditor"></UEditor>
  </div>
</template>
<script>
import UEditor from "@/components/common-components/ueditor.vue";
export default {
  components: { UEditor },
  data() {
    return {
      config: {
        //可以在此处定义工具栏的内容
        toolbars: [
         ['fullscreen', 'undo', 'redo','|','bold', 'italic', 'underline',
         '|','superscript','subscript','|', 'insertorderedlist', 'insertunorderedlist',
         '|','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify']
        ],
        autoHeightEnabled: true, //高度自适应
        autoFloatEnabled: true, //是否工具栏可浮动
        initialContent: "请输入内容", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
        initialFrameWidth: 800, //默认宽度
        initialFrameHeight: 800, //默认高度
        BaseUrl: "",
        UEDITOR_HOME_URL: "static/ueditor/" //静态资源相对路径
      }
    };
  },
  mounted() {
    const _this = this;
    // this.editor = UE.getEditor('editor');
  },
  methods: {
    //获取文档内容
    getContent: function() {
      let content = this.$refs.ueditor.getContent();
      alert(content);
    }
  }
};
</script>
<style scoped>
</style>
