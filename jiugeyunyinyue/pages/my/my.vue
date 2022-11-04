<template>
  <view >
    
  
  <view class="myContainer">
    <view class="user">
      <image src="/static/image/personal/bgImg2.jpg" class="mybg" ></image>
      <view class="userBox" @tap="toLogin">
        <image :src="userAvatar" ></image>
        <view class="username">{{userinfo.nickname?userinfo.nickname:'游客'}}</view>
      </view>
      <view class="vip-top">
        <view class="vipBoxF">
          <view class="vipBox">
            <image src="/static/image/personal/vip-card-bg.png"></image>
            <view class="vipHeader">
                <!-- 会员图标-->
<!--                       <text class="iconfont icon-huiyuan-"></text> -->
                       <text>尊贵会员</text>
               <view class="vip-btn">
                 立即开通
             </view>
            </view>
            <view class="vipContaniner">
              <view class="row1">奏九歌而舞韶兮</view>
              <view class="row2">开启会员听音乐</view>
            </view>
          </view>
        </view>
      </view>
      <image lazy-load="true" src="/static/image/personal/arc.png" class="whiteBg"></image>
    </view>
    <view class="usercontainer-box" @touchstart="handleTouchStart" @touchmove="handleTouchMove" :style="distance" @touchend="handleTouchEnd">
      <view class="userBar">
        <view class="userBarItem">
          <uni-icons type="email" class="usericon" size="30"></uni-icons>
          <text>我的消息</text>
        </view>
         <view class="userBarItem">
          <uni-icons type="staff" class="usericon" size="30"></uni-icons>
          <text>我的好友</text>
        </view> 
        <view class="userBarItem">
          <uni-icons type="person" class="usericon" size="30"></uni-icons>
          <text>个人主页</text>
        </view>
         <view class="userBarItem">
          <uni-icons type="gift" class="usericon" size="30"></uni-icons>
          <text>个性装扮</text>
        </view>
      </view>
      <view class="user-footer">
        <view class="userFtitle">个人数据</view>
        <view class="userFbar">
          <view class="userFbarTop">
          <text>最近播放</text>
          <uni-icons type="right" size="mini"></uni-icons>         
          </view>
          <scroll-view class="recentlyPlayed" enable-flex scroll-x="true">
            <view class="played" v-for="(item,index) in recordData" :key="index" @click="toSong(item.song.id,index)">
              <image :src="item.song.al.picUrl" lazy-load="true"></image>
              <text>{{item.song.name}}</text>
            </view> 
          </scroll-view>
        </view>
         <view class="userFbar">
          <text>我的收藏</text>
          <uni-icons type="right" size="mini"></uni-icons>
        </view> 
        <view class="userFbar" @click="toMyList">
          <text>我的歌单</text>
          <uni-icons type="right" size="mini"></uni-icons>
        </view>
      </view>
    </view>

 
   
  </view>
     <footerPlay></footerPlay>
  </view>
</template>

<script>
 import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        distance:'transform:translateY(0rpx)',
        userinfo:{},
        recordData:[]
      };
    },
    computed:{
      userAvatar(){
     return this.userinfo.avatarUrl ?this.userinfo.avatarUrl :'/static/image/personal/missing-face.png'   
      }
    },
    onShow() {
      const userinfoStr = uni.getStorageSync('userinfo')
      if(userinfoStr){
        const userinfo = JSON.parse(userinfoStr)
        this.userinfo  = userinfo
        this.getUserRecord()
      }
    },
methods:{
  //将最近播放列表存进仓库
  ...mapMutations('m_playlist',['addRecentlyList']),
  //跳转至我的歌单
  toMyList(){
    uni.navigateTo({
      url: '/pages/myPlaylist/myPlaylist?userId='+this.userinfo.userId
    });
  },
  //获取最近播放歌曲
  getUserRecord(){
    uni.$http('/user/record',{uid:this.userinfo.userId,type:0}).then(({data:{allData}})=>{
     this.recordData = allData
     let recentlyList = []
     for(let i = 0 ;i<this.recordData.length;i++){
       recentlyList.push(
       {
         songId:this.recordData[i].song.id,
         songName:this.recordData[i].song.name,
         singer:this.recordData[i].song.ar[0].name,
         }
       )
     }
     this.addRecentlyList(recentlyList)
    })
  },
  
  //跳转至登录页
  toLogin(){
    if(!this.userinfo.nickname){
    wx.navigateTo({url:'/pages/login/login'})
    }
  },
  //跳转至播放页
  toSong(id,index){
    uni.navigateTo({
      url:'/pages/song/song?songId='+id+'&index='+index+'&from=recently',
    })
  },
 handleTouchStart(e){
    this.startY =e.touches[0].clientY
    // console.log(event.touches[0].clientY);
  },
  handleTouchMove(e){
    const moveY = e.touches[0].clientY
    const distance = moveY - this.startY
    if(distance<120&&distance>0){
    this.distance = `transform:translateY(${distance}rpx)`
    }
  },
  handleTouchEnd(){
    this.distance = `transform:translateY(0rpx);transition:transform 1s`
  }
}
  }
</script>

<style lang="scss">
.myContainer{
  width: 100%;
  // height: 100%;
   background: #f5f5f5;
  .user{
      height: 480rpx;
      position: relative;
      // padding: 100rpx 30rpx 0;
      .whiteBg{
        width: 100%;
        position: absolute;
        top: 446rpx;
        height: 36rpx;
      }
    .mybg{
      width: 100%;
      opacity: 0.8;
    }
    .userBox{
      display: flex;
      align-items: center;
      position: absolute;
      top: 80rpx;
      left: 40rpx;
      image{
        width: 130rpx;
        height: 130rpx;
        border: 5rpx solid #fff ;
        border-radius: 50%;
      }
      .username{
        font-size: 24;
          color: #303133;
          margin-left: 20rpx;
      }
    }
    // .vip-top{
    //   position: absolute;
    //   top: 400rpx;
    // }
    .vipBoxF{
      display: flex;
      justify-content: center;
      
    }
  .vipBox{
    overflow: hidden;
    top: 300rpx;
    height: 180rpx;
position: absolute;
display: flex;
flex-direction: column;
width: 86%;
  padding: 20rpx 24rpx;
  background: rgba(0, 0, 0, .6);
   height: 140rpx;
   color: #f7d680;
   border-radius: 16rpx 16rpx 0 0;
 // padding: 20rpx 24rpx; 
    image{
      position: absolute;
        top: 20rpx;
        right: 0;
        width: 380rpx;
        height: 260rpx;
        opacity: 0.7;
    }
    .vipHeader{
      display: flex;
      justify-content: space-between;
      
        .vip-btn{
          border: 2rpx solid #f7d680;
          border-radius: 20px;
          color: #303133;
          font-size: 22rpx;
          font-weight: bold;
          background-color: #f7d680;
          padding: 10rpx 10rpx;
          z-index: 1;
        }
      
    }
  }
  }
  .usercontainer-box{
      padding: 0 40rpx;
      height: 550rpx;
  }
  .userBar{
    margin: 5rpx 0;
    display: flex;
    justify-content: space-around;
    background-color: white;
  
    height: 100rpx;
    .userBarItem{
      display: flex;
      flex-direction: column;
      align-items: center;
      text{
        margin-top: 5rpx;
        font-size: 24rpx;
      }
    }
  }
  
  //user-footer
  .user-footer{
    background-color: #fff;
    margin: 20rpx 0;
    padding: 0 10rpx;
    height: 600rpx;
    .userFtitle{
      font-size: 28rpx;
      margin: 4rpx;
    }
    .userFbar{
      .userFbarTop{
        
      display: flex;
      justify-content: space-between;
      align-items: center;
      }
      font-size: 24rpx;
      padding-top: 20rpx;
      border-bottom: 2rpx solid #f5f5f5;
      .recentlyPlayed{
        display: flex;
        height: 200rpx;
        .played{
          
        margin-top: 30rpx;
          margin-right: 20rpx; 
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          image{
            width: 140rpx;
            height: 140rpx;
          }
          text{
            width: 140rpx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 24rpx;
          }
        }
      }
    }
  }
  
}
</style>
