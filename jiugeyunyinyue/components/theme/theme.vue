<template>
  <view>
    <scroll-view  class="scrollNav" scroll-x="true" enable-flex>
      <view class="nav-item " v-for="(navItem,index) in theme" :key="navItem.id" @click="changeActive(navItem.id)" >
      <text :class="actid===navItem.id||active&&index===0?'active':'no'" >{{navItem.name}}</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    name:"theme",
    data() {
      return {
        actid:0,
        active:true,
      };
    },
    props:{
      theme:{}
    },
    methods:{
      //点击改变列表名称和获取列表内容
      changeActive(e){
        this.active = false
        this.actid = e
       /* uni.showLoading({
        title:'正在加载中，请稍后！'
        }) */
     this.$emit('changeActid',this.actid)
      },
    }
  }
</script>

<style lang="scss">
.scrollNav{
  height: 100rpx;
  position: sticky;
  top:122rpx;
  background-color: white;
  z-index: 2;
display: flex;
.nav-item{
  white-space: nowrap;
    padding:0 20rpx;
    height: 100rpx;
  text{
     display:block;
     line-height: 96rpx;
     box-sizing: border-box;
  }
 .active{
    border-bottom: 4rpx solid red;
  } 
}
}
</style>