<template>
  <el-container class="pageContainer">
    <el-header>
      <h3>门店类别管理 <el-button @click="newCatClick">+新增类别</el-button></h3>
    </el-header>
    <el-container>
      <el-aside>
        <!-- 左边栏选择树 -->
        <el-tree
          ref="tree"
          :highlight-current="true"
          :default-expanded-keys="['0']"
          :data="treeData"
          node-key="catId"
          :props="defaultProps"
          :expand-on-click-node="false"

          :current-node-key="selectedCat.catId"

          @node-click="treeClick"
        />
      </el-aside>
      <el-main>
        <div class="title">
          <div>{{ levelName }}</div>

        </div>
        <el-table :data="tableData" border>
          <el-table-column prop="sortNo" label="排序号" />
          <el-table-column prop="catName" label="类别名" />
          <el-table-column
            width="200"
            label="排序"
          >
            <template slot-scope="scope">
              <el-button
                :disabled="scope.$index<=0"
                size="mini"
                type="primary"
                icon="el-icon-top"
                @click="changeSort( scope.$index,scope.row,1)"
              />

              <el-button
                :disabled="scope.$index>=tableData.length-1"
                size="mini"
                type="primary"
                icon="el-icon-bottom"
                @click="changeSort( scope.$index,scope.row,-1)"
              />
            </template>
          </el-table-column>
          <!-- 表格的按钮栏目 -->
          <el-table-column
            fixed="right"
            width="200"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="editCat( scope.index,scope.row)"
              >编辑</el-button>

              <el-button
                size="mini"
                type="danger"
                @click="deleteCat(scope.index,scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-main>

      <!-- 新增类别弹框 -->
      <el-dialog title="新增机构" :visible.sync="newCatVisible" width="600px" @close="cancelNewCat">
        <el-form ref="newCat" :model="newCatModel" :rule="newCatRule" label-width="96px">

          <el-form-item label="所属类别" prop="parentId">
            <div>{{ selectedCat.catName }}</div>
          </el-form-item>
          <el-form-item label="类别名称" prop="catName">
            <el-input v-model="newCatModel.catName" />
          </el-form-item>
        </el-form>
        <template slot="footer">
          <el-button @click="cancelNewCat">取消</el-button>
          <el-button type="primary" @click="affirmNewCat">新增</el-button>
        </template>
      </el-dialog>

      <!-- 类别编辑弹框 -->
      <el-dialog title="类别编辑" :visible.sync="editCatVisible" width="600px" @close="cancelEdit">
        <el-form ref="editCat" :model="editCatModel" :rule="editCatRule" label-width="96px">
          <el-form-item label="类别ID" prop="catId">
            <el-input v-model="editCatModel.catId" disabled />
          </el-form-item>

          <el-form-item label="类别名称" prop="catName">
            <el-input v-model="editCatModel.catName" />
          </el-form-item>
        </el-form>
        <template slot="footer">
          <el-button @click="cancelEdit">取消返回</el-button>
          <el-button type="primary" @click="affirmEdit">确认修改</el-button>
        </template>
      </el-dialog>

      <!-- 删除类别框 -->
      <el-dialog :visible.sync="deleteCatVisible" title="删除类别" width="500px">
        <el-row>
          <el-col :span="6">类别ID</el-col>
          <el-col :span="16">{{ deleteCatModel.catId }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">类别名称</el-col>
          <el-col :span="16">{{ deleteCatModel.catName }}</el-col>
        </el-row>

        <template slot="footer">
          <el-button @click="closeDelete">取消返回</el-button>
          <el-button type="danger" @click="affirmDelete">确认删除</el-button>
        </template>
      </el-dialog>

    </el-container>
  </el-container>

</template>

<script>
import systemManageService from '@api/systemManage.service.js'
import { AjaxReturnType } from '../../enum/service-enum.js'
// import transTree2lv from '@tool/transTree2lv.js'
// import { findGrandId } from '@tool/transTree2lv.js'

export default {
  data() {
    return {

      selectedCat: '',
      // 选择树数据
      treeData: [],
      // 1，2级树
      tree2lv: [],
      defaultProps: {
        children: 'children',
        label: 'catName'
      },

      // 表格数据
      tableData: [
      ],
      levelName: '',

      // 新增类别
      newCatVisible: false,
      newCatModel: {
        'parentId': '',
        'parentCatName': '',
        'catName': '',
        'sortNo': ''
      },
      newCatRule: {},
      // 编辑类别
      editCatModel: {
        catId: '',
        catName: ''
      },
      editCatRule: {},
      editCatVisible: false,

      deleteCatVisible: false,
      deleteCatModel: {}

    }
  },

  async created() {
    await this.getTreedata()
  },
  methods: {
    // 点击选择树节点 查询机构列表
    treeClick(node) {
      this.selectedCat = node
      if (this.selectedCat.level < 2) {
        this.getTableData()
      }
    },
    // 排序
    upCat() {},
    downCat() {},
    async changeSort(index, row, scale) {
      console.log('index:', index)
      let data = {
        catId: row.catId,
        parentId: row.parentId,
        sortNo: row.sortNo,
        changeType: scale === 1 ? 'UP' : 'DOWN'
      }
      try {
        let res = await systemManageService.changeShopCatSort(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.getTableData()
          this.$message.success('变更排序成功')
        } else { throw new Error('变更排序失败') }
      } catch (err) {
        this.$message.error({ message: '变更排序失败' })
        console.error(err)
      }
    },
    // 获取列表
    getTableData() {
      const data = {
        catId: this.selectedCat.catId
      }
      systemManageService.getChildrenList(data).then(
        res => {
          if (res.resultCode === AjaxReturnType.SUCCESS) {
            this.tableData = res.data
          } else {
            this.$notify.error({ message: '查询类别列表失败' })
          }
        }
      ).catch(error => {
        this.$notify.error({ message: '查询时发生错误' })
        console.error(error)
      })
    },

    // 点击新增类别
    newCatClick() {
      if (!this.selectedCat) {
        this.$message.warning({ title: '非法操作', message: '请先选择父级类别' })
        return
      } else if (
        this.selectedCat.level >= 2) {
        this.$message.warning({ message: '该层级类别不可再新增下属类别' })
        return
      }
      this.newCatVisible = true
    },

    cancelNewCat() {
      this.newCatVisible = false
      this.$refs.newCat.resetFields()
    },
    // 确认新增类别
    affirmNewCat() {
      this.$refs.newCat.validate(res => {
        if (res) {
          const data = {
            catName: this.newCatModel.catName,
            parentId: this.selectedCat.catId,
            level: this.selectedCat.catId.level + 1
          }
          systemManageService.addShopCat(data).then(
            res => {
              if (res.resultCode === AjaxReturnType.SUCCESS) {
                this.$notify({
                  type: 'success',
                  titlte: '成功',
                  message: '新增类别成功'
                })
                this.$refs.newCat.resetFields()
                this.getTableData()
                this.getTreedata()
              } else {
                this.$notify({ title: '错误', message: '新增类别失败' })
                throw new Error('新增类别失败')
              }
              this.newCatVisible = false
            }
          ).catch(err => {
            console.log(err)
            this.$notify.error({ title: '错误', message: '新增类别时发生错误' })
          })
        }
      })
    },
    // 取消编辑
    cancelEdit() {
      this.$refs.editCat.resetFields()
      this.editCatVisible = false
    },

    // 编辑机构
    editCat(index, row) {
      // 获取表格该行的数据
      Object.assign(this.editCatModel, row)
      this.editCatVisible = true
    },
    // 确认编辑
    async affirmEdit() {
      try { await this.$refs.editCat.validate() } catch (err) { this.$message({ message: '表单验证失败' }); return }

      const data = {
        catId: this.editCatModel.catId,
        catName: this.editCatModel.catName
      }
      try {
        const res = await systemManageService.updateShopCat(data)
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$notify.success({ message: '修该类别信息成功' })
          this.$refs.editCat.resetFields
          this.getTreedata()
          this.getTableData()
        } else {
          throw new Error('修该类别信息成功')
        }
        this.editCatVisible = false
      } catch (err) {
        console.log(err)
        this.$notify.error({ message: '修该机构信息发生错误' })
      }
    },

    // 编辑机构父机构 测试用
    changeParentId() {
      console.log('pid', this.editCatModel.parentId)
    },
    // 点击删除机构按钮
    deleteCat(index, row) {
      Object.assign(this.deleteCatModel, row)
      this.deleteCatVisible = true
    },
    // 取消删除
    closeDelete() {
      this.deleteCatVisible = false
      this.deleteCatModel = {}
    },
    // 确认删除
    async affirmDelete() {
      try {
        const res = await systemManageService.delelteShopCat({ catId: this.deleteCatModel.catId, sortNo: this.deleteCatModel.sortNo })
        if (res.resultCode === AjaxReturnType.SUCCESS) {
          this.$message.success({ message: '门店类别删除成功' })
          this.getTableData()
          this.getTreedata()
        } else {
          throw new Error('门店删除失败')
        }
      } catch (err) {
        console.error(err)
        this.$message.error({ message: '门店删除失败' })
      } finally {
        this.deleteCatVisible = false
      }
    },
    // 获取类别树
    async getTreedata() {
      try {
        const res = await systemManageService.getShopCateTree()
        this.treeData = [{ children: res.data, catId: '0', catName: '门店分类', level: 0 }]
        // this.tree2lv = transTree2lv(res.data)
        // console.log('tree2lv', this.tree2lv)
      } catch (e) {
        console.log(e)
        this.$notify.error({
          titile: '错误', message: '获取机构树时发生错误'
        })
      }
    }

  }

}
</script>

<style lang="scss" scoped>

.pageContainer {
    margin:40px 20px 0 20px;
    background-color: #fff;
}

header{
    margin-top:15px;
    h3{
        button{
            margin-left: 2em;
        }
    }
}
.el-aside{
    margin-left: 15px;
    padding-top:15px;
    border:#DCDFE6 solid 1px;
        border-radius: 5px;
}
.title {
    color:#606266;
    p{
        margin: 10px 0;
    }
}

.el-dialog{

    .el-input{
        width: 400px;
    }
    /deep/ .el-input{
        width: 400px;
    }
    .el-select{
        width: 400px;
    }
    .el-cascader{
        width: 400px;
    }
    .el-textarea{
        width: 400px;
    }

    .el-col{
        margin:5px;
    }
}
/deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    color:#1494df;
    // background-color: #dfded0
    font-weight: bold
}

</style>

