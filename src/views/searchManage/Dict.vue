<template>
  <el-container class="auditPage">
    <el-main>
      <div>
        <h3>索引分词管理  </h3>
        <el-form ref="form" size="medium" :inline="true" :model="formModel" :rules="formRule" label-width="114px">
          <el-button type="primary" @click="createDict">新增索引分词</el-button>
          <el-button type="primary" @click="submitForm">查询索引分词</el-button>
        </el-form>
      </div>

      <el-table :data="tableData" border>
        <el-table-column
          prop="id"
          label="ID"
        />
        <el-table-column
          prop="word"
          label="分词"
        />

        <el-table-column
          fixed="right"

          label="操作"
        >
          <template slot-scope="scope">

            <el-button
              size="mini"
              type="info"
              @click="updateDict(scope.$index, scope.row)"
            >修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteDict(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageNum"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 30]"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="totalNumber"
      />
    </el-main>

    <!-- 新增索引分词弹框 -->
    <el-dialog :visible.sync="createDictVisible" width="500px" title="新增分词" @close="close('createDict')">
      <el-form ref="createDict" :model="createDictModel" :rules="createDictRule" :inline="true" label-width="96px">
        <el-form-item label="索引分词" prop="word">
          <el-input v-model="createDictModel.word" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="cancelCreate">取消</el-button>
        <el-button type="primary" @click="affirmCreate">确认</el-button>
      </div>
    </el-dialog>

    <!-- 删除分词 -->
    <el-dialog :visible.sync="deleteVisible" width="500px" title="提示">

      <div class="diaBody">确认要删除该索引分词 “{{ currentRow.word }}” 吗？</div>
      <div slot="footer">
        <el-button type="primary" @click="cancelDelete">取消</el-button>
        <el-button type="primary" @click="affirmDelete">确认删除</el-button>
      </div>
    </el-dialog>

    <!-- 修改分词 -->
    <el-dialog :visible.sync="updateVisible" width="500px" title="修改分词" @close="close('update')">
      <el-form ref="update" :model="updateModel" :rules="updateRule" :inline="true" label-width="96px">
        <el-form-item label="ID" prop="id">
          <el-input v-model="updateModel.id" disabled />
        </el-form-item>
        <el-form-item label="分词" prop="word">
          <el-input v-model="updateModel.word" disabled />
        </el-form-item>
        <el-form-item label="新分词" prop="newWord">
          <el-input v-model="updateModel.newWord" />
        </el-form-item>

      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="cancelUpdate">取消</el-button>
        <el-button type="primary" @click="affirmUpdate">确认修改</el-button>
      </div>
    </el-dialog>
  </el-container>

</template>

<script>
import searchService from '@api/searchManage.service.js'
import { AjaxReturnType } from '@enum/service-enum.js'
import objectTool from '../../tool/objectTool.js'
export default {
  data() {
    return {
      formModel: {
        word: ''
      },
      formRule: {

      },
      tableData: [
      ],
      // 新增索引分词
      // 新增索引分词显示切换
      createDictVisible: false,
      // 新增索引分词数据
      createDictModel: { word: '' },
      createDictRule: {
        word: [{
          required: true, trigger: 'blur', message: '请输入分词'
        }]
      },

      // 删除索引分词
      deleteVisible: false,
      //      页码
      pageNum: 1,
      pageSize: 10,
      totalNumber: 0,

      // 当前行
      currentRow: '',
      // 修改弹框
      updateVisible: false,
      updateModel: {
        id: '',
        word: '',
        newWord: ''
      },
      updateRule: {
        newWord: [{
          required: true, trigger: blur, message: '请输入新的分词'
        }]
      }

    }
  },
  methods: {

    async getTableData(msg = '查询分词列表失败') {
      let data = {
        'pageNum': this.pageNum,
        'pageSize': this.pageSize
      }

      data = objectTool.addValidPropertyToTarget({
        ...data
      })
      try {
        let res = await searchService.getDictList(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.tableData = res.data.listRows
          this.totalNumber = res.data.rowTotal
        } else {
          this.$notify.error({ message: msg })
        }
      } catch (err) {
        console.log(err)
        this.$notify.error({ message: msg })
      }
    },
    // 查询按钮
    submitForm() {
      this.pageNum = 1
      this.getTableData()
    },
    // 改变一页条目数
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
    // 新增索引分词弹框
    createDict() {
      this.createDictVisible = true
    },
    cancelCreate() {
      this.createDictVisible = false
    },
    // 确认新增分词
    async affirmCreate() {
      // 校验表单数据是否合法且充足
      try { await this.$refs.createDict.validate() } catch (e) { console.log(e); return }
      try {
        let res = await searchService.createDict({ word: this.createDictModel.word })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$notify.success({ message: '新增分词成功' })
          this.getTableData('更新列表失败')
        } else {
          this.$notify.error({ message: '新增分词失败' })
        }
      } catch (err) {
        this.$notify.error({ message: '新增分词发生错误' })
        console.log(err)
      }
      this.createDictVisible = false
    },
    // 修改分词
    updateDict(i, row) {
      this.currentRow = row
      this.updateVisible = true
      Object.assign(this.updateModel, row)
    },
    cancelUpdate() {
      this.updateVisible = false
    },
    affirmUpdate() {
      this.$refs.update.validate(res => {
        if (res) {
          let data = { id: this.updateModel.id,
            word: this.updateModel.newWord }
          searchService.updateDict(data).then(
            res => {
              if (res.resultCode === AjaxReturnType.SUCCESS) {
                this.$notify.success({ message: '修改分词成功' })
                this.getTableData('更新列表失败')
              } else {
                this.$notify.error({ message: '修改分词失败' })
                console.log('resultCode:', res.resultCode)
              }
            }
          ).catch(err => {
            console.log(err)
            this.$notify.error({ message: '修改分词失败' })
          })

          this.updateVisible = false
        }
      })
    },
    // 删除分词弹框
    deleteDict(i, row) {
      this.deleteVisible = true
      this.currentRow = row
    },
    // 确认删除
    cancelDelete() {
      this.deleteVisible = false
    },
    async affirmDelete() {
      try {
        let res = await searchService.deleteDict({ id: this.currentRow.id })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$notify.success({ message: '删除成功' })
          this.getTableData('更新列表失败')
        } else {
          this.$notify.error({ message: '删除失败' })
        }
      } catch (err) {
        console.log(err)
        this.$notify.error({ message: '删除分词失败' })
      }
      this.deleteVisible = false
    },
    close(ref) {
      this.$refs[ref].resetFields()
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
.diaBody{
    text-align: center;
    font-size:16px;
}

</style>

