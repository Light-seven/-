<template>
 <view class="header">
        <view class="header-title">{{title}}</view>
        <view class="headerUnder">
          <view class="under-left">{{moreTitle}}</view>
          <view class="under-right">
            查看更多
          </view>
        </view>
      </view>
</template>

<script>
  export default {
    name:"navHeader",
    data() {
      return {
        
      };
    },
    props:{
      title:{
        type:String,
      },
      moreTitle:{
        type:String
      }
    }
  }
</script>

<style lang="scss">
 .header{
    .header-title{
      font-size: 28rpx;
      margin-top: 10rpx ;
    }
  }
  .headerUnder{
    display: flex;
    margin-bottom: 10rpx;
    justify-content: space-between;
    align-items: center;
    .under-left{
      font-size: 30rpx;
    }
    .under-right{
      font-size: 22rpx;
      border: 2rpx solid black;
      border-radius: 10rpx;
      padding:  10rpx 20rpx;
    }
  }
</style>