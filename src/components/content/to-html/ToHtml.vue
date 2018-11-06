<template>
    <div>
        <div id="resumeId">
            <h1 class="blue">这是一个标题</h1>
            <p class="black">这是段落1</p>
            <p class="red">这是段落2</p>
            <p class="green">这是段落3</p>
            <p class="gray">这是段落4</p>
        </div>
        <button @click="getHtmlContent">转化</button>
    </div>
</template>
<script>
// import axios from 'axios'
// import resumeHtml from './resume-html'
// import writer from 'file-writer';
import {resumecss} from './resume.js'
export default {
    data(){
        return{
            
        }
    },
    methods:{
        downloadHtml(name){ 
            let html = this.getHtmlContent();
            // let s = writer(`${name}的简历.html`, html, 'utf-8');
            console.log('s stream',s);
        },
        getHtmlContent(){
            const template = document.getElementById('resumeId'); 
            
            console.log(template.innerHTML)
            let html = `<!DOCTYPE html>
            <html>
            <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <title>X-Find迅聘选才</title>
            <link rel="stylesheet" href="https://cdn.bootcss.com/iview/2.14.0/styles/iview.css" />
            <style>
            ${resumecss}
            </style>
            </head>
            <body>
            <div class="resume_preview_page" style="margin:0 auto;width:1200px">
            ${template.innerHTML}
            </div>
            </body>
            </html>`;
            console.log(html,123)
            return html;
        }
    }
}
</script>
<style scoped>
*{
    text-align: center;
}
.blue{
    color:blue;
}
.black{
    color:black;
}
.red{
    color:red;
}
.green{
    color:green;
}
.gray{
    color:gray;
}
</style>

