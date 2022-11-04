<template>
  <view>
    <view class="listHeader"  :class="this.top?'top':'no'" >
      <view class="listHeaderL">
        <uni-icons type="headphones" class="icons" size="30" color="red"></uni-icons>
        <text>播放全部</text>
      </view>
      <view class="listHeaderR">
        <uni-icons type="list" size="30"  class="icons" color="red"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"playAll",
    data() {
      return {
        
      };
    },
    props:{
      top:{
        type:Boolean,
      }
    }
  }
</script>

<style lang="scss">
  .top{
    position: sticky;
    top:0;
    z-index: 1;
  }

</style>