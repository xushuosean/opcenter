<template>
  <el-container class="auditPage">
    <el-main>
      <div>
        <h3>热门搜索词管理 </h3>
        <el-form ref="form" size="medium" :inline="true" :model="formModel" :rules="formRule" label-width="86px">
          <el-form-item label="搜索场景" prop="searchSceneType">
            <el-input v-model="formModel.searchSceneType" placeholder="请输入搜索场景" />
          </el-form-item>
          <el-form-item label="城市代码" prop="cityCode">
            <el-input v-model="formModel.cityCode" placeholder="请输入城市代码" />
          </el-form-item>
          <el-button type="primary" @click="submitForm">查询热搜</el-button>
          <el-button type="primary" @click="newTerm">新增热搜</el-button>
          <!-- <el-button  type="primary" >保存本页排序</el-button> -->

        </el-form>
      </div>

      <div class="drag">
        <div class="title">
          <div v-for="(item, index) in propList " :key="index" class="prop">
            {{ ENUM[item] }}
          </div>
          <div class="op">操作</div>
        </div>
        <draggable v-model="tableData" v-loading="loading" @start="start" @end="end">
          <transition-group>
            <div v-for="(item,index) in tableData" :key="index" class="row">
              <div v-for="(prop,j) in propList" :key="j" class="row-prop">
                {{ item[prop] }}
              </div>
              <div class="row-op">
                <el-button type="primary" size="mini" @click="sort(item)">排序</el-button>
                <el-button type="primary" size="mini" @click="updateTerm(item)">修改</el-button>
                <el-button type="danger" size="mini" @click="deleteTerm(item)">删除</el-button>
              </div>

            </div>
          </transition-group>
        </draggable>
      </div>

      <el-pagination
        :current-page="pageNum"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="totalNumber"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

    </el-main>
    <el-dialog :visible.sync="opVisible" width="800px" :title="opration==='create'?'新增热搜':'修改热搜'" @close="closeOp">
      <el-form ref="op" :model="opModel" :rule="opRule" :inline="true" label-width="96px">
        <el-form-item label="搜索场景" prop="searchSceneType">
          <el-select v-model="opModel.searchSceneType">
            <el-option value="o2o" label="o2o" />
          </el-select>
        </el-form-item>
        <el-form-item label="场景事件" prop="sceneEvent">
          <el-select v-model="opModel.sceneEvent">
            <el-option value="x" label="XXX" />
          </el-select>
        </el-form-item>
        <el-form-item label="城市代码" prop="cityCode">
          <el-input v-model="opModel.cityCode" placeholder="请输入城市代码" />
        </el-form-item>
        <el-form-item label="热搜词" prop="hotTerm">
          <el-input v-model="opModel.hotTerm" placeholder="请输入热搜词" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="cancelOp">取消</el-button>
        <el-button type="primary" @click="affirmOp">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="deleteVisible" width="500px" title="删除热搜" @close="closeOp">

      <div class="textCenter">确认要删除热门搜索词 " <b>{{ opModel.hotTerm }}</b> " 吗？</div>
      <div slot="footer">
        <el-button type="primary" @click="cancelDelete">取消</el-button>
        <el-button type="primary" @click="affirmDelete">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="sortVisible" width="500px" title="重新排序">
      <el-form ref="sort" :model="sortModel" :rules="sortRule" :inline="true" label-width="96px">
        <el-form-item label="id">
          <el-input v-model="sortModel.id" disabled />
        </el-form-item>
        <el-form-item label="搜索词">
          <el-input v-model="sortModel.hotTerm" disabled />
        </el-form-item>
        <el-form-item label="序号">
          <el-input-number v-model="sortModel.seq" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="cancelSort">取消</el-button>
        <el-button type="primary" @click="affirmSort">确认</el-button>
      </div>
    </el-dialog>
  </el-container>

</template>

<script>
import searchService from '@api/searchManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import objectTool from '../../tool/objectTool.js'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data() {
    return {

      formModel: {
        searchSceneType: '',
        cityCode: ''
      },
      formRule: {},
      ENUM: { id: 'ID', searchSceneType: '搜索场景', cityCode: '城市代码', hotTerm: '搜索词', seq: '排序' },
      propList: ['id', 'searchSceneType', 'cityCode', 'hotTerm', 'seq'],

      tableData: [
      ],
      copyTableData: [],
      // 操作：新增 ，修改 opration: create update
      // titile:'',
      opration: '',
      opVisible: false,
      opModel: {
        id: '',
        searchSceneType: '',
        cityCode: '',
        hotTerm: ''
      },
      // 表单验证规则
      opRule: {
        hotTerm: [{ required: true, message: '搜索词不能为空', trigger: 'blur' }]
      },
      // 删除弹框
      deleteVisible: false,
      // 排序弹框
      sortVisible: false,
      sortModel: { id: '', hotTerm: '', seq: '' },
      sortRule: {},

      // 页码，条目数
      pageNum: 1,
      pageSize: 10,
      totalNumber: 0,
      loading: false
    }
  },
  methods: {

    submitForm() {
      this.pageNum = 1
      this.getTableData()
    },

    // 获取表格数据
    async getTableData(msg = '获取搜索热词列表失败') {
      // 校验表格输入
      try { await this.$refs.form.validate() } catch (e) { console.log(e); return }
      this.loading = true
      let formData = this.formModel
      let data = objectTool.addValidPropertyToTarget({
        ...formData,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })

      try {
        let res = await searchService.getHotSearchList(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.tableData = res.data.listRows
          this.totalNumber = res.data.rowTotal
          this.copyTableData = this.tableData.slice()
        } else {
          this.$notify.error({ message: msg })
          console.log('resultCode', res.resultCode)
        }
      } catch (err) {
        console.log(err)
        this.$notify.error({ message: msg })
      }
      this.loading = false
    },
    // 修改页面条目
    handleSizeChange(size) {
      this.pageSize = size
      if (this.tableData.length === 0) { return }
      this.getTableData()
    },
    // 改变页码
    handleCurrentChange(num) {
      this.pageNum = num
      if (this.tableData.length === 0) { return }
      this.getTableData()
    },
    // 新增
    newTerm() {
      this.opVisible = true
      this.opration = 'create'
    },
    // 操作
    cancelOp() {
      this.opVisible = false
    },

    async affirmOp() {
      // 新增的情况
      if (this.opration === 'create') {
        try { await this.$refs.op.validate() } catch (err) { console.log(err); return }
        let formData = {
          searchSceneType: this.opModel.searchSceneType,
          cityCode: this.opModel.cityCode,
          hotTerm: this.opModel.hotTerm
        }
        let data = objectTool.addValidPropertyToTarget(formData)
        try {
          let res = await searchService.createHotSearch(data)
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            this.$notify.success({ message: '新增热搜创建申请成功' })
          } else {
            this.$notify.error({ message: '新增热搜创建申请失败' })
          }
        } catch (err) { console.log(err); this.$notify.error({ message: '新增热搜创建申请失败' }) }
        this.opVisible = false
      }
      // 修改热搜的情况
      if (this.opration === 'update') {
        try { await this.$refs.op.validate() } catch (err) { console.log(err); return }
        let formData = {
          id: this.opModel.id,
          searchSceneType: this.opModel.searchSceneType,
          cityCode: this.opModel.cityCode,
          hotTerm: this.opModel.hotTerm
        }
        let data = objectTool.addValidPropertyToTarget(formData)
        try {
          let res = await searchService.updateHotSearch(data)
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            this.$notify.success({ message: '新增热搜修改申请成功' })
          } else {
            this.$notify.error({ message: '新增热搜修改申请失败' })
          }
        } catch (err) { console.log(err); this.$notify.error({ message: '新增热搜修改申请失败' }) }
        this.opVisible = false
      }
    },
    closeOp() {
      this.opModel = {
        id: '',
        searchSceneType: '',
        cityCode: '',
        hotTerm: ''
      }
      this.$refs.op.clearValidate()
    },
    // 修改热搜
    updateTerm(term) {
      this.opration = 'update'
      this.opVisible = true
      this.opModel = {
        id: term.id,
        searchSceneType: term.searchSceneType,
        cityCode: term.cityCode,
        hotTerm: term.hotTerm
      }
    },
    // 删除热搜
    deleteTerm(term) {
      this.deleteVisible = true
      this.opModel = term
    },
    cancelDelete() {
      this.deleteVisible = false
    },
    async affirmDelete() {
      try {
        let res = await searchService.delHotSearch({ id: this.opModel.id })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$notify.success({ message: '删除成功' })
          this.getTableData()
        } else {
          this.$notify.error({ message: '删除失败' })
        }
      } catch (err) {
        console.log(err)
        this.$notify.error({ message: '删除失败' })
      }
      this.deleteVisible = false
    },
    // 拖拽
    start(evt) {

    },
    async end(evt) {
      let id = this.copyTableData[evt.oldIndex].id
      let seq = this.copyTableData[evt.newIndex].seq
      let data = { id: id, seq: seq }
      try {
        let res = await searchService.adjustSeq(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$notify.success({ message: '修改排序成功' })
        } else {
          this.$notify.error({ message: '修改排序失败' })
        }
      } catch (err) {
        this.$notify.error({ message: '修改排序失败' })
        console.log(err)
      }
      this.getTableData()
    },

    sort(term) {
      this.sortVisible = true
      this.sortModel = {
        id: term.id,
        hotTerm: term.hotTerm,
        seq: term.seq
      }
    },
    cancelSort() {
      this.sortVisible = false
    },
    async affirmSort() {
      try { await this.$refs.sort.validate() } catch (err) { console.log(err); return }
      let data = {
        id: this.sortModel.id,
        seq: this.sortModel.seq
      }
      try {
        let res = await searchService.adjustSeq(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$notify.success({ message: '修改排序成功' })
        } else {
          this.$notify.error({ message: '修改排序失败' })
        }
      } catch (err) {
        this.$notify.error({ message: '修改排序失败' })
        console.log(err)
      }
      this.sortVisible = false
      this.getTableData()
    }
  }

}
</script>

<style lang="scss" scoped>
form.el-form{
    margin-bottom: 25px;
}

h3{
    margin-bottom: 15px;
    button{
        margin-left:2em;
    }
}
.el-breadcrumb{
    line-height: 30px;
}
.el-dialog{
    .el-input{
        width: 260px;
    }
    /deep/ .el-input{
        width: 260px;
    }
    .el-select{
        width: 260px;
    }
    .el-cascader{
        width: 260px;
    }
}
.auditPage .el-main .el-form-item{
    width: 340px;
}
li{
    list-style: none;
}
table,th, td{
  border: 1px solid #EBEEF5;
  }
.drag{
    .title{
        color:#909399;
        font-size:14px;
        font-weight: bold;
        display:flex;
        border: #EBEEF5 solid 1px;
        .prop{
            flex:2;
            border-right:#EBEEF5 solid 1px;
            padding:12px 10px;
        }
        .op{
            flex:3;

            padding:12px 10px;
        }
    }
    .row{

       height:52px;
       line-height:28px;
        margin-top:-1px;
        display:flex;
        font-size:14px;
        color:#606266;
         border:#EBEEF5 solid 1px;

         &:hover{
             background-color: #acf;

         }

        .row-prop{

             flex:2;
            border-right:#EBEEF5 solid 1px;
            padding:12px 10px;
        }
        .row-op{
            flex:3;

            padding:12px 10px;
        }
    }

}

.textCenter{
    text-align: center
}

</style>

