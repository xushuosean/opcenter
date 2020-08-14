<template>
  <div class="viewPageWrap">
    <div class="viewWrap">
      <iframe ref="frame" :src="url" frameborder="0" class="viewContent" @load="onLoad" />
      <div class="viewPageBtnWrap">
        <div class="viewPageBtn" @click="handleGetConfig">获取配置</div>
        <!-- <div class="viewPageBtn" @click="handleChangeTheme">{{dark ? '白版' : '黑版'}}</div>
        <div class="viewPageBtn" @click="handleChangeEditStatus">{{edit ? '预览' : '编辑'}}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewPageWrap',
  props: {
    pushMsg: {
      type: Function,
      default: null
    },
    mode: {
      type: String,
      default: ''
    },
    pageType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dark: false,
      edit: true
    }
  },
  computed: {
    url: function() {
      return `${window.location.protocol}//${window.location.host + window.location.pathname}#/mobileView?mode=${this.mode}`
    }
  },
  methods: {
    /**
     * iframe 加载后执行
     */
    onLoad: function() {
      this.$emit('frameLoad', this.$refs.frame)
    },

    /**
     * 获取配置
     */
    handleGetConfig: function() {
      this.$emit('getConfig', { type: 'getConfig' })
    },

    /**
     * 切换主题
     */
    handleChangeTheme: function() {
      this.dark = !this.dark
      this.$emit('changeTheme', {
        type: 'changeTheme',
        data: {
          dark: this.dark
        }
      })
    },

    /**
     * 开关预览模式
     */
    handleChangeEditStatus: function() {
      this.edit = !this.edit
      this.$emit('changeEditStatus', {
        type: 'changeEditStatus',
        data: {
          edit: this.edit
        }
      })
    }
  }
}
</script>

<style lang='scss'>
.viewPageWrap {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: row;
  .viewWrap {
    position: relative;
    padding: 80px 10px;
    border-radius: 40px;
    background-color: black;

    .viewPageBtnWrap {
      position: absolute;
      left: -70px;
      top: 60px;
      width: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .viewPageBtn {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 50%;
      background-color: #ddd;
      font-size: 12px;
      cursor: pointer;
      margin-top: 20px;

      &:first-child {
        margin-top: 0;
      }
    }
    .viewContent {
      width: 375px;
      height: 667px;
      background-color: #fff;
    }

    &:after {
      content: '';
      display: block;
      width: 50px;
      height: 50px;
      background-color: rgba(255, 255, 255, 0.2);
      position: absolute;
      bottom: 15px;
      left: 172.5px;
      border-radius: 50%;
    }
  }
}
</style>
