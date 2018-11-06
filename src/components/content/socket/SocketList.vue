<template>
     <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
        width="180">
      </el-table-column>
    </el-table>
</template>
<script>
import Interface from '@/util/interface.js';
export default {
    data(){
        return{
            tableData:[]
        }
    },
    created(){
        this.fetch('list')
    },
    methods:{
        fetch(scence){
            if(scence=='list'){
                let params = {

                }
                Interface.getData('get',Interface.task.list,params).then(res=>{
                    console.log(res)
                    if(res.code == 200){
                        this.tableData = res.data
                        console.log(res,123)
                    }
                })
            }
        }
    }
}
</script>
<style scoped>

</style>
