<template>
  <view>
    <view class="recommend-container">
 <view class="recommend-header">
<image src="../../static/image/R-C.jpg" mode=""></image>   
<view class="date">
  <text class="day">{{day}}</text>
  <text class="month">/{{month}}</text>
</view>
<view class="yunshi">查看运势详情></view>
 </view>
 <view class="recommend-list" @touchmove="handlerStart" >
  <view class="listHeader" id="listH" :class="top?'top':'no'" >
     <view class="listHeaderL">
       <uni-icons type="headphones" class="icons" size="30" color="red"></uni-icons>
       <text>播放全部</text>
     </view>
     <view class="listHeaderR">
       <uni-icons type="list" size="30"  class="icons" color="red"></uni-icons>
     </view>
   </view>
   <!-- <scroll-view scroll-y class="scrollList">
     <view class="scrollItem" v-for="(item,index) in recommendSingList" :key="item.songId" @click="toSong(item.songId,index)">
       <image :src="item.songPic" lazy-load="true"></image>
     <view class="song-rec">
       <text class="songName">{{item.songName}}</text>
       <view class="songFooter">
        <text class="reason">{{item.reason}}</text>
       <text class="singer">{{item.singer}}</text>
       </view>
     </view>
     <view class="recommendRadio">
       <uni-icons type="more-filled" size="20" color="darkgrey"></uni-icons>
     </view>
     </view> 
   </scroll-view> -->
   <songList :songList="recommendSingList"></songList>
 </view>
    </view>
      <footerPlay></footerPlay>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        day:'',
        month:'',
        recommendSingList:[],
        top:false
      };
    },
    onLoad() {
      //获取存储的cookie信息
      const cookie = uni.getStorageSync('cookies')
      //没有cookie则弹出对话框
      if(!cookie){
        uni.showModal({
          title:"请先登录！",
          content:'该功能需要登录账号！',
          success: function (res) {
            //点击确认按钮
          		if (res.confirm) {
          			uni.navigateTo({
          			  url:'/pages/login/login'
          			})
          		} else if (res.cancel) {
          		//点击取消按钮
               uni.switchTab({
                 url:'/pages/home/home'
               })
          		}
          	}
        })
        return
      }
      this.getDate()
      this.getRecommendInfo()
    },
    methods:{
      
      //手指触摸屏幕
      handlerStart(){
        const query = uni.createSelectorQuery().in(this);
        query.select('#listH').boundingClientRect(data => {
         
     //    "节点离页面顶部的距离为"  data.top
          if(data.top<120){
            this.top = true
          }
          
        }).exec();
      },
      //获取日期
      getDate(){
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth() + 1
        console.log(month);
        this.day = day>=9?String(day):'0'+String(day)
        this.month = month <= 9 ? '0'+ String(month):String(month)
      },
      //获取每日推荐歌曲列表信息
      getRecommendInfo(){
        uni.$http('/recommend/songs').then(({data:{data:{dailySongs}}})=>{
       this.recommendSingList = dailySongs
    this.recommendSingList = this.recommendSingList.map((item)=>{
            return{
              // songIndex = index
              songName:item.name,
              songId:item.id,
              songPic:item.al.picUrl,
              singer:item.ar[0].name,
              singerId:item.ar[0].id,
              reason:item.reason
            }
          })
        })
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
  .recommend-container{
    width: 100%;
    .recommend-header{
      position: relative;
        width: 100%;
        height: 300rpx;
      image{
        width: 100%;
        height: 100%;
      }
      .date{
        position: absolute;
        top: 210rpx;
        left: 30rpx;
        color: #fff;
        font-weight: bold;
        .day{
            font-size: 56rpx;
        }
      }
      .yunshi{
        position: absolute;
           color: #fff;
        top: 232rpx;
        right: 20rpx;
      }
    }
    .recommend-list{
      margin: 0 20rpx;
     .listHeader{
       margin: 20rpx 0;
         height: 80rpx;
         display: flex;
         justify-content: space-between;
         align-items: center;
         line-height: 80rpx;
         background-color: white;
      .listHeaderL{
        display: flex;
        align-items: center;
        text{
          font-weight: bold;
          margin-left: 15rpx;
        
        }
      }
     }

   
    }
  }

</style>
