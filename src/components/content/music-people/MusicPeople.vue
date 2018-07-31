<template>
    <div class="music-people">
        <el-row><h3>豆瓣音乐人</h3></el-row>
        <el-row class="musicpeople-list">            
            <div class="music-box">
                 <div class="music-img"> 
                    <p>试听热门歌曲</p>
                    <el-button icon="el-icon-caret-right" circle size="mini"></el-button>    
                </div>
            <a>歌神李浩</a>             
            </div>      
        </el-row>
       
    </div>
</template>
<script>
export default {
    data(){
        return{
            isshow:false,
        }
    }
}
</script>
<style scoped>
.music-people{
    
}
.musicpeople-list .music-box{
    /* border:1px; */
    height: 170px;
    width: 170px;
    position: relative;
    
    /* background-color:gray; */
}
.musicpeople-list{
    margin-bottom: 60px;
}

.musicpeople-list .music-box p{
    display: none;
    z-index: 100;
}
.musicpeople-list .music-box p:hover{
    display:block;
}
.musicpeople-list .el-button{
    position: absolute;
    top: 40%;
    left: 40%;
}
</style>

