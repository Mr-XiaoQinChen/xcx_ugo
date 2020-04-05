<template>
  <view>
    <!-- 筛选 -->
    <view class="filter">
      <text class="active">综合</text>
      <text>销量</text>
      <text>价格</text>
    </view>
    <!-- 商品列表 -->
    <!-- 区域滚动，绑定事件，这里不是页面滚动（不是配置） -->
    <!-- 页面触底的时候，再次发送请求 -->
    <scroll-view class="goods" scroll-y @scrolltolower="pageAgain">

      <view class="item" @click="goDetail" v-for="item in list" :key="item.goods_id">
        <!-- 商品图片 -->
        <image class="pic" :src="item.goods_small_logo"></image>
        <!-- 商品信息 -->
        <view class="meta">
          <view class="name">{{item.goods_name}}</view>
          <view class="price">
            <text>￥</text>{{item.goods_price}}<text>.00</text>
          </view>
        </view>
      </view>
      
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        // 传递过来的字段
        query:"",
        // 请求来的数据
        list: [],
        // 初始化请求页面
        pagenum:1
      }
    },
    methods: {
      goDetail () {
        uni.navigateTo({
          url: '/pages/goods/index'
        })
      },
      // 加载的时候，请求数据
      async getList(query) {
        const res = await this.request({
          url:'/api/public/v1/goods/search',
          data: {
            // 传过来的参数
            query,
            // 显示哪一页
            pagenum:this.pagenum,
            // 一页显示多少条数据
            pagesize:5
          }
        })
        // console.log(res)
        // this.list = res.goods;
        // 这里要优化，对下面新请求的数据进行拼接一起
        this.list = this.list.concat(res.goods)
      },
      // 区域滚动，触发事件
      pageAgain() {
        // 问题：需要调用this.getList() 需要传递参数
        // 在本函数中是拿不到，传递过来的 query 参数的
        // 解决：onLoad里面，传入的参数，保存在data中

        // 请求下一页加1
        this.pagenum++;
        this.getList(this.query)
      }
    },
    // 初始化 
    onLoad(opt) {
      this.query = opt.query;
      // 1.拿数据
      // console.log(opt.query)
      // 2.请求
      this.getList(opt.query)
    }
  }
</script>

<style scoped lang="less">
  .filter {
    display: flex;
    height: 96rpx;
    line-height: 96rpx;
    border-bottom: 1rpx solid #ddd;

    /* #ifdef H5 */
    position: relative;
    z-index: 99;
    /* #endif */

    text {
      flex: 1;
      text-align: center;
      font-size: 30rpx;
      color: #333;

      &.active {
        color: #ea4451;
      }
    }
  }
  
  .goods {
    position: absolute;
    width: 100%;
    top: 97rpx;
    bottom: 0;
  }

  .item {
    display: flex;
    padding: 30rpx 20rpx 30rpx 0;
    margin-left: 20rpx;
    border-bottom: 1rpx solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .pic {
      width: 200rpx;
      height: 200rpx;
      margin-right: 30rpx;
    }

    .meta {
      flex: 1;
      font-size: 27rpx;
      color: #333;
      position: relative;
    }

    .name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      position: absolute;
      bottom: 0;

      color: #ea4451;
      font-size: 33rpx;

      text {
        font-size: 22rpx;
      }
    }
  }
</style>
