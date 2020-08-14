<template>
  <div class="filter">
    <div class="filter-item"><span>全部</span><svg t="1571047184676" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="630" width="16" height="16"><path d="M512 704c8.288 0 15.776-3.232 21.456-8.4l0.064 0.08 352-320-0.08-0.08c6.448-5.856 10.56-14.208 10.56-23.6a32 32 0 0 0-32-32c-8.288 0-15.76 3.232-21.456 8.4l-0.08-0.08L512 628.752 181.536 328.32l-0.08 0.08A31.776 31.776 0 0 0 160 320a32 32 0 0 0-32 32c0 9.376 4.112 17.744 10.544 23.6l-0.08 0.08 352 320 0.08-0.08c5.68 5.168 13.168 8.4 21.456 8.4z" p-id="631" /></svg></div>
    <div class="filter-item"><span>地区</span> <svg t="1571047184676" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="630" width="16" height="16"><path d="M512 704c8.288 0 15.776-3.232 21.456-8.4l0.064 0.08 352-320-0.08-0.08c6.448-5.856 10.56-14.208 10.56-23.6a32 32 0 0 0-32-32c-8.288 0-15.76 3.232-21.456 8.4l-0.08-0.08L512 628.752 181.536 328.32l-0.08 0.08A31.776 31.776 0 0 0 160 320a32 32 0 0 0-32 32c0 9.376 4.112 17.744 10.544 23.6l-0.08 0.08 352 320 0.08-0.08c5.68 5.168 13.168 8.4 21.456 8.4z" p-id="631" /></svg></div>
    <div class="filter-item"><span>综合排序</span> <svg t="1571047184676" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="630" width="16" height="16"><path d="M512 704c8.288 0 15.776-3.232 21.456-8.4l0.064 0.08 352-320-0.08-0.08c6.448-5.856 10.56-14.208 10.56-23.6a32 32 0 0 0-32-32c-8.288 0-15.76 3.232-21.456 8.4l-0.08-0.08L512 628.752 181.536 328.32l-0.08 0.08A31.776 31.776 0 0 0 160 320a32 32 0 0 0-32 32c0 9.376 4.112 17.744 10.544 23.6l-0.08 0.08 352 320 0.08-0.08c5.68 5.168 13.168 8.4 21.456 8.4z" p-id="631" /></svg></div>
  </div>
</template>
<script>
export default {
  name: 'DropDownMenu',
  props: {
  },
  data() {
    return {}
  },
  methods: {
    getConfig: function() {
      return {
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.filter{
    width: 100%;
    height: 58px;
    background-color: #fff;
    display: flex;
    align-items: cneter;
    .filter-item{
        justify-content: center;
        display: flex;
        align-items: center;
        flex:1;
        font-family: PingFang-SC-Medium;
        font-size: 13px;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        line-height: 58px;
        .van-icon{
            line-height: 58px;
            margin-left:5px;
             font-size: 13px;
            color: #333333;
        }

    }
}
</style>
