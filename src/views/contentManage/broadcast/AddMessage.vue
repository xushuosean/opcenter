<template>
  <el-container class="mtop40">
    <el-main>
      <div>
        <h3>发布消息</h3>
        <el-form ref="form" :inline="true" :model="formData" :rules="formRule">
          <div class="oneLine">
            <div>
              <el-form-item label="消息名称" prop="messageName" class="messageName">
                <el-input v-model="formData.messageName" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="接收者范围" prop="importType">
                <el-select v-model="formData.importType">
                  <el-option label="手动输入" value="manualInput" />
                  <el-option label="批量导入" value="batchImport" />
                </el-select>
              </el-form-item>
            </div>
          </div>
          <template v-if="formData.importType==='batchImport'">
            <el-button type="primary" class="batchImportButton">
              下载Excel模板
            </el-button>
            <el-button type="primary" class="batchImportButton">
              上传门店名单
            </el-button>
          </template>
          <template v-if="formData.importType==='manualInput'">
            <div class="manualInput">
              <el-form-item prop="searchMethod">
                <el-select v-model="formData.searchMethod">
                  <el-option label="按商户名或编号搜索" value="byNameOrCode" />
                  <el-option label="按商户地区筛选" value="byArea" />
                </el-select>
              </el-form-item>
              <template v-if="formData.searchMethod==='byNameOrCode'">
                <el-form-item prop="searchNameOrCode">
                  <el-input v-model="formData.searchNameOrCode" placeholder="请输入商户名称或商户编号" />
                </el-form-item>
                <el-button type="primary">搜索</el-button>
              </template>
              <div v-if="formData.searchMethod==='byArea'" class="merchantArea">
                <span>商户地区</span>
                <el-form-item prop="province">
                  <el-cascader
                    :props="{ checkStrictly: true }"
                    :options="options"
                  />
                </el-form-item>
                <el-button type="primary">筛选</el-button>
              </div>
              <el-table ref="merchantList" max-height="300" :data="merchantList">
                <el-table-column type="selection" />
                <el-table-column prop="merchant" label="全选" />
              </el-table>
              <h5>已选择商户及其属下门店</h5>
              <el-table ref="selectedMerchantList" class="selectedMerchantList" max-height="300" :data="selectedMerchantList">
                <el-table-column width="100">
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="merchantName" />
                <el-table-column prop="merchantCode" />
              </el-table>
            </div>
          </template>
          <el-form-item label="消息内容" prop="messageContent" class="textarea">
            <el-input v-model="formData.messageContent" type="textarea" :rows="7" />
          </el-form-item>
          <div class="submit">
            <el-button type="primary">取消返回</el-button>
            <el-button type="primary">确认并提交审核</el-button>
          </div>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      formData: {
        messageName: '',
        importType: 'manualInput',
        searchMethod: 'byNameOrCode',
        searchNameOrCode: '',
        messageContent: ''
      },
      formRule: {},
      merchantList: [
        { merchant: '金拱门(中国)有限公司' },
        { merchant: '金拱门(中国)有限公司' },
        { merchant: '金拱门(中国)有限公司' },
        { merchant: '金拱门(中国)有限公司' }

      ],
      selectedMerchantList: [
        { merchantName: '金拱门(广州)有限公司', merchantCode: '1234566787898' },
        { merchantName: '金拱门(广州)有限公司', merchantCode: '1234566787898' },
        { merchantName: '金拱门(广州)有限公司', merchantCode: '1234566787898' }

      ]
    }
  },
  methods: { handleDelete(index, row) {

  } }
}
</script>

<style lang="scss" scoped>
.mtop40{margin-top:40px;}

.el-breadcrumb{
    line-height: 30px;
}

.el-main{
    padding-top:15px;
    margin-left: 15px;
    background-color: #fff;
}
h3{
    margin-bottom:20px;
}

.oneLine {
    .el-form-item {  .el-input,.el-select{
            width:350px
            }
    }
    .el-form-item{
        width:500px;

    }
/deep/ label{
            width:150px ;
            text-align: left;
        }

}
.batchImportButton{
    display:block;
    margin-left:150px;
    width:140px;
    margin-bottom:20px;
}
.manualInput{
    margin-left: 150px;
}
.merchantArea{
    span{margin-right:10px}
    .el-select{width:160px}
}
.el-table{
    width:550px;
}
h5{margin-top:30px}
.textarea{
    /deep/ label{
            width:150px ;
            text-align: left
        }
    margin-top:50px;
    .el-textarea{width:600px}
}

.selectedMerchantList /deep/ thead.has-gutter{
    height:0px;
    th{
        height:0px;
        padding:0px;
    }
}
.submit{
    margin-left:150px;
    button{
        margin:15px;
    }

}

</style>

