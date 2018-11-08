<template>
<div class="container">
    <el-button type="warning" @click="dialogVisible=true">新增文档</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
        width="">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="">
      </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" @click="edit('edit',scope.row)" size="small">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-dialog
  title="请输入文档名"
  :visible.sync="dialogVisible"
  width="30%">
  <el-input v-model="name"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false;edit('add')">确 定</el-button>
  </span>
</el-dialog>
</div>
     
</template>
<script>
import Interface from '@/util/interface.js';
export default {
    data(){
        return{
            tableData:[],
            dialogVisible:false,
            name:'',

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
                    if(res.data.code == 200){
                        this.tableData = res.data.data
                    }
                })
            }
        },
        remove(row){
            let params= {
                id: row.id,
                _methods: 'delete'
            };
            Interface.getData('post',Interface.task.list,params).then(res=>{
                if(res.data.code==200){
                    this.fetch('list')
                }
            })
        },
        edit(type,row){            
            sessionStorage.setItem('type',type)
            if(type == 'edit'){
                sessionStorage.setItem('id',row.id)
                this.$router.push(`/socket/${row.id}`)
            }else{                
                let arr = []
                let params = {
                    task:JSON.stringify(arr),
                    name:this.name
                }
                Interface.getData('post',Interface.task.list,params).then(res=>{
                    console.log(res)
                    sessionStorage.setItem('id',res.data.data.insertId)
                    this.$router.push(`/socket/${res.data.data.insertId}`)
                })
            }
        }
    }
}
</script>
<style scoped>

</style>
