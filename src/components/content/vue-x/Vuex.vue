<template>
     <footer class="footer">
    <ul>
      <li v-for="(lis,index) in ul" :key="index">{{lis.li}}</li>
    </ul>
    <br/>
    <p>
      Copyright&nbsp;&copy;&nbsp;{{author}} - 2016 All rights reserved
    </p>
    css三角形<div id="demo"></div>
  </footer>
</template>
<script>
 export default {
    name: 'footerDiv',
    data () {
      return {
        ul: [
          { li: '琉璃之金' },
          { li: '朦胧之森' },
          { li: '缥缈之滔' },
          { li: '逍遥之火' },
          { li: '璀璨之沙' }
        ]
      }
    },
    computed: {
      author () {
        return this.$store.state.author
      }
    }
  }
</script>
<style scoped>
ul{
    list-style: none;
}
li{
    float: left;
    margin-right: 20px;
}
p{
    margin-left: 40px;
    clear: both;
}
#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
</style>
