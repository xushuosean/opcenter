<template>
  <div class="banner-container">
    <slot />
    <swiper
      v-if="swiperLength > 0"
      ref="mySwiper"
      class="swiper-container"
      :options="swiperOption"
    >
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
        <img class="swiper-img" :src="item.src" alt="">
      </swiper-slide>
      <!-- 轮播指示器，需要可以打开 -->
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </swiper>
  </div>
</template>
<script type="text/ecmascript-6">
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'IndexBanner',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    swiperList: {
      type: Array,
      default: () => [{
        src: require('./img/homeBanner.png'),
        href: 'http://www.baidu.com',
        name: 'banner1',
        title: 'banner1链接',
        content: {
          href: '',
          shopCode: '',
          shopType: '',
          ticketCode: '',
          linkType: ''
        }
      }]
    }
  },
  data() {
    return {
      swiperOption: {
        observer: true,
        observeParents: true,
        loop: false,
        autoplay: true,
        pagination: {
          clickable: true,
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: {
    swiperLength() {
      return this.swiperList && this.swiperList.length
    }
  },
  methods: {
    getConfig: function() {
      return {
        swiperList: this.swiperList
      }
    }
  }
}
</script>
<style scoped lang="scss">
    .banner-container{
        width:100%;
        text-align: center;
        height:175px;
        overflow: hidden;
        .swiper-img {
            width: 100vw;
            max-width:375px;
            // height: 247px;
            display: inline-block;
        }
        /deep/.swiper-pagination-bullet {
            display: inline-block;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.5);
            &.swiper-pagination-bullet-active {
                background: rgba(0, 0, 0, 0.5);
            }
        }
    }
</style>
