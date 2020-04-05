<template>
  <view :style="{height: pageHeight, overflow: 'hidden'}">
    <search @search="disableScroll" />
    <!-- 焦点图 -->
    <swiper class="banner" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <swiper-item v-for="item in swiperArr" :key="item.goods_id">
        <navigator :url="'/pages/goods/index?id=er'+item.goods_id" >
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
      <!-- <swiper-item>
        <navigator url="/pages/goods/index">
          <image src="http://static.botue.com/ugo/uploads/banner2.png"></image>
        </navigator>
      </swiper-item>
      <swiper-item>
        <navigator url="/pages/goods/index">
          <image src="http://static.botue.com/ugo/uploads/banner3.png"></image>
        </navigator> 
      </swiper-item>-->
    </swiper>
    <!-- 导航条 -->
    <view class="navs">
      <navigator open-type="switchTab" url="/pages/category/index" v-for="item in navList" :key="item.name">
        <image :src="item.image_src"></image>
      </navigator>
      <!-- <navigator url="/pages/list/index">
        <image src="http://static.botue.com/ugo/uploads/icon_index_nav_3@2x.png"></image>
      </navigator>
      <navigator url="/pages/list/index">
        <image src="http://static.botue.com/ugo/uploads/icon_index_nav_2@2x.png"></image>
      </navigator>
      <navigator url="/pages/list/index">
        <image src="http://static.botue.com/ugo/uploads/icon_index_nav_1@2x.png"></image>
      </navigator> -->
    </view>
    <!-- 楼层 -->
    <view class="floors">
      <view class="floor" v-for="(item,index) in floorsArr" :key="index">
        <!-- 种类 -->
        <view class="title">
          <!-- 种类图片 -->
          <image :src="item.floor_title.image_src"></image>
        </view>
        <!-- 图片区 -->
        <view class="items">
          <navigator url="/pages/list/index" v-for="img in item.product_list" :key="img.name">
            <image :src="img.image_src"></image>
          </navigator>
          <!-- <navigator url="/pages/list/index">
            <image src="http://static.botue.com/ugo/uploads/pic_floor01_2@2x.png"></image>
          </navigator>
          <navigator url="/pages/list/index">
            <image src="http://static.botue.com/ugo/uploads/pic_floor01_3@2x.png"></image>
          </navigator>
          <navigator url="/pages/list/index">
            <image src="http://static.botue.com/ugo/uploads/pic_floor01_4@2x.png"></image>
          </navigator>
          <navigator url="/pages/list/index">
            <image src="http://static.botue.com/ugo/uploads/pic_floor01_5@2x.png"></image>
          </navigator> -->
        </view>
      </view>
      <!-- <view class="floor">
        <view class="title">
          <image src="http://static.botue.com/ugo/uploads/pic_floor02_title.png"/>
        </view>
        <view class="items">
          <navigator url="/pages/list/index">
            <image src="http://static.botue.com/ugo/uploads/pic_floor02_1@2x.png"></image>
          </navigator>
          <navigator url="/pages/list/index">
            <image src="http://static.botue.com/ugo/uploads/pic_floor02_2@2x.png"></image>
          </navigator>
          <navigator url="/pages/list/index">
            <image src="http://static.botue.com/ugo/uploads/pic_floor02_3@2x.png"></image>
          </navigator>
          <navigator url="/pages/list/index">
            <image src="http://static.botue.com/ugo/uploads/pic_floor02_4@2x.png"></image>
          </navigator>
          <navigator url="/pages/list/index">
            <image src="http://static.botue.com/ugo/uploads/pic_floor02_5@2x.png"></image>
          </navigator>
        </view>
      </view>
      <view class="floor">
        <view class="title">
          <image src="http://static.botue.com/ugo/uploads/pic_floor03_title.png"></image>
        </view>
        <view class="items">
          <navigator url="/pages/list/index">
            <image src="http://static.botue.com/ugo/uploads/pic_floor03_1@2x.png"></image>
          </navigator>
          <navigator url="/pages/list/index">
            <image src="http://static.botue.com/ugo/uploads/pic_floor03_2@2x.png"></image>
          </navigator>
          <navigator url="/pages/list/index">
            <image src="http://static.botue.com/ugo/uploads/pic_floor03_3@2x.png"></image>
          </navigator>
          <navigator url="/pages/list/index">
            <image src="http://static.botue.com/ugo/uploads/pic_floor03_4@2x.png"></image>
          </navigator>
          <navigator url="/pages/list/index">
            <image src="http://static.botue.com/ugo/uploads/pic_floor03_5@2x.png"></image>
          </navigator>
        </view>
      </view> -->
    </view>
    <!-- 回到顶部 -->
    <view class="goTop icon-top" v-if="height>200" @click="goTop"></view>
  </view>
</template>

<script>
  import search from '@/components/search';

  export default {

    data () {
      return {
        pageHeight: 'auto',
        // 定义一个数据，接受轮播图的数据
        swiperArr:[],
        // 导航数据
        navList:[],
        // 楼层数据
        floorsArr:[],
        // 返回顶部
        // isShow: false
        height:0
      }
    },

    components: {
      search
    },
    
    methods: {
      disableScroll (ev) {
        this.pageHeight = ev.pageHeight + 'px';
      },
      // 获取轮播图数据
      async getSwiperData(){
        // uni-app  api开头都是 uni
        // const [err,res] = await uni.request({
        //   url:'https://api-ugo-web.itheima.net/api/public/v1/home/swiperdata',
        //   method:'GET'
        // })
        // 直接this.request 调用 request函数
        const res = await this.request({
          // 传入参数 
          url: '/api/public/v1/home/swiperdata'
        });
        // console.log(res)
        // 给data定义的数据，进行赋值
        this.swiperArr = res
      },
      // 获取导航数据
      async getNavList () {
          // 请求后端接口
          const res = await this.request({
              url: '/api/public/v1/home/catitems'
          })

          // console.log(res);
          // 更新初始数据
          this.navList = res;
      },
      // 获取楼层数据
      async getFloorsList () {
          // 请求后端接口
          const res = await this.request({
              url: '/api/public/v1/home/floordata'
          })

          // console.log(res);
          // 更新初始数据
          this.floorsArr = res;
      },
      // 返回顶部
      goTop() {
        uni.pageScrollTo({scrollTop: 0})
      }
    },
    // 初始化页面，调用请求函数
    onLoad() {
      // 轮播图获取数据
      this.getSwiperData()
      // 导航获取数据
      this.getNavList()
      // 调用楼层请求
      this.getFloorsList()
    },
    // 监听用户下来事件onPullDownRefresh ,下拉动作是自动配置的。
      async onPullDownRefresh(){
        // 等到数据全部请求完成后，下拉效果关闭
        // 轮播图获取数据
        await this.getSwiperData()
        // 导航获取数据
        await this.getNavList()
        // 调用楼层请求
        await this.getFloorsList()
        // 关闭下拉效果  文档/api
        uni.stopPullDownRefresh()
      },
      // 页面滚动
      onPageScroll(e) {
        // 第一种方式：
        // if(e.scrollTop > 200) {
        //   this.isShow = true
        // } else {
        //   this.isShow = false
        // }
        // 第二种方式：
        this.height = e.scrollTop
      }

  }
</script>

<style scoped lang="less">
  .banner {
    width: 100%;
    height: 340rpx;

    image {
      width: 100%;
      height: 340rpx;
    }
  }

  .navs {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 44rpx;

    image {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor {

    .title {
      width: 750rpx;
      height: 60rpx;
      padding: 20rpx 0 0 8rpx;
      background-color: #f4f4f4;
    }

    .items {
      padding: 20rpx 16rpx;
      overflow: hidden;

      navigator {
        width: 193rpx;
        height: 188rpx;
        margin-left: 10rpx;
        margin-bottom: 10rpx;
        float: left;
      }

      navigator:first-child {
        width: 232rpx;
        height: 386rpx;
        margin-left: 0rpx;
      }

      navigator:nth-child(2),
      navigator:nth-child(5) {
        width: 273rpx;
      }
    }

    &:first-child {

      .items {

        navigator {
          width: 233rpx;
        }
      }
    }
  }

  .goTop {
    position: fixed;
    bottom: 30rpx;
    /* #ifdef H5 */
    bottom: 65px;
    /* #endif */
    right: 30rpx;
  
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100rpx;
    height: 100rpx;
    font-size: 48rpx;
    color: #666;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
  }
</style>