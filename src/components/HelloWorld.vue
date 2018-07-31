<template>
  <div class="">
  	<ChangeLanguage></ChangeLanguage>
  	<el-button type="primary">{{$t('login.btn')}}</el-button>
    <h1 style="color:lightgreen">{{$t('login.title')}}</h1>
    <!-- 筛选时间 -->
    <div class="block">
    <el-button @click="setLang('zh-CN')"><span class="demonstration">{{$t('datepicker.timepicker')}}：</span></el-button>
    <el-date-picker
      v-model="timevalue"
      type="daterange"
      align="right"
      unlink-panels
      :range-separator="$t('datepicker.to')"
      :start-placeholder="$t('datepicker.start_placeholder')"
      :end-placeholder="$t('datepicker.end_placeholder')"
      :picker-options="pickerOptions2"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd">
    </el-date-picker>
    {{timevalue[0]}}
    <span>{{$t('datepicker.message')}}：{{$t('datepicker.money')}}</span>
  </div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      :label="$t('table.date')"
      sortable
      width="180"
      :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
      :filter-method="filterHandler"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      :label="$t('table.name')"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      :label="$t('table.address')"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="tag"
      :label="$t('table.label')"
      width="100"
      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
  </div>
  
</template>
<script>
	import ChangeLanguage from '@/components/common-components/ChangeLanguage'
 export default {
 		components: { ChangeLanguage },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-06-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-07-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }],
        pickerOptions2: {
          shortcuts: [{
            text: this.$t('table.oneweek'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: this.$t('table.onemonth'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: this.$t('table.threemonths'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        timevalue: ''
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      setLang(v){
//    	console.log()
//    	 if(v==='en-US'){
//     this._i18n.locale = "en-US";
//    　　locale.use(enLocale)
//    }else{
//        this._i18n.locale = "zh-CN";
//        locale.use(zhLocale)
//    }
//   $.cookie("language", this._i18n.locale === "" ?this._i18n.locale = "zh-CN" : this._i18n.locale,{ expires: 1, path: '/' });
 		 },
    }
  }
</script>

<style>

</style>
