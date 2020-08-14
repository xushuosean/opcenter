<template>
  <div class="wrapper">
    <v-head :collapse="collapse" />
    <v-sidebar ref="sideBar" />
    <div
      class="content-box"
      :class="{'content-collapse':collapse}"
    >
      <div class="content">
        <breadCrumb class="bread-crumb" @collapse="handleHeaderCollapse" />
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import vHead from '@com/header/header.vue'
import vSidebar from '@com/sideBar/sideBar.vue'
import breadCrumb from '@com/breadCrumb/breadCrumb.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    vHead, vSidebar, breadCrumb
  },
  data() {
    return {
      tagsList: [],
      collapse: false
    }
  },
  created() {
    // 用户权限数据
    this.getUserPermissionList()
    // 查询站点数据
    this.getSiteData()
    // 查询门店分类数据
    this.getShopClassifyData()
    // 查询机构树数据
    this.getOrgData()
    // 查询地区数据
    this.getRegionData()
  },
  methods: {
    ...mapActions('commonData', ['getSiteData', 'getShopClassifyData', 'getOrgData', 'getRegionData', 'getUserPermissionList']),
    handleHeaderCollapse(msg) {
      this.collapse = msg
      this.$refs['sideBar'].handleCollapse(msg)
    },
    handleTags(msg) {
      const arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    }
  }
}
</script>
<style lang="scss" scoped>
html,
body,
#app,
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content-box {
  position: absolute;
  left: 200px;
  right: 0;
  top: 60px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f8f8f8;
}

.content {
  width: auto;
  height: 100%;
  // padding: 10px;
  overflow-y: scroll;
  box-sizing: border-box;
  .bread-crumb{
    margin-left:20px;
    transform:translateY(20px)
  }
}

.content-collapse {
  left: 65px;
}

.container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.crumbs {
  margin: 10px 0;
}

.pagination {
  margin: 20px 0;
  text-align: right;
}

.plugins-tips {
  padding: 20px 10px;
  margin-bottom: 20px;
}

.el-button + .el-tooltip {
  margin-left: 10px;
}

.el-table tr:hover {
  background: #f6faff;
}

.mgb20 {
  margin-bottom: 20px;
}

.move-enter-active,
.move-leave-active {
  transition: opacity 0.5s;
}

.move-enter,
.move-leave {
  opacity: 0;
}
</style>
