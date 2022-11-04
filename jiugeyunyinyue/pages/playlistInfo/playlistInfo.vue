<template>
  
  <view class="infoContainer"  @touchmove="handlerStart"  >
 <view class="headerTitle"   >

        <uni-icons type="arrow-left" size="30" color="white" @click="toBack" ></uni-icons>
        <text class="titleText">官方动态歌单</text>
      </view>
       <view class="headBg" :style="opc">
         </view>
    <view class="infoPic"  >
      <!-- :style="bigUrl"
      :style="'background-image: url('playlist[index].coverImgUrl')';"-->
    
       
     
      <view class="tidai" :style="bigUrl">
        
      </view>
  <!--  <image :src="playlist[index].coverImgUrl" class="infoImg" ></image> -->
      <view class="infoMiddle">
        <text class="bigTitle">{{playlist[index].name}}</text>
        <text class="smallTitle">每日更新</text>
        <text class="direction">{{playlist[index].description}}</text>
      </view>
<view class="bgWhite">
    <image lazy-load="true" src="/static/image/personal/arc.png"  class="whiteBg"></image>
    <view class="infoFooter">
      <view class="footerL">
        <uni-icons type="folder-add" size="30"></uni-icons>
        <text>{{playlist[index].trackCount}}</text>
      </view>
     
       <view class="footerMid">
        <uni-icons type="chat" size="30"></uni-icons>
        <text>{{playlist[index].commentCount}}</text>
      </view> 
  
      <view class="footerR">
        <uni-icons type="redo" size="30"></uni-icons>
        <text>{{playlist[index].shareCount}}</text>
      </view>
    </view>
</view>
    </view>

  
    <view class="listHeader" id="listH" :class="top?'top':'no'" >
       <view class="listHeaderL">
         <uni-icons type="headphones" class="icons" size="30" color="red"></uni-icons>
         <text>播放全部</text>
       </view>
       <view class="listHeaderR">
         <uni-icons type="list" size="30"  class="icons" color="red"></uni-icons>
       </view>
     </view>
   <songList :songList="playlistAll" :from="from"></songList>
  <footerPlay></footerPlay>
  </view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        playlistId:'0',
        playlistAll:[],
        index:0,
        from:'playlist',
        top:false,
        bigUrl:'',
        opc:''
        
      };
    },
    onLoad:function(option){
      console.log(option);
      this.playlistId = option.playlistId
      this.index = Number(option.index)
    },
    onShow() {
      this.getPlaylistAll()
      console.log(this.playlist[this.index].coverImgUrl);
    },
    computed:{
      ...mapState('m_playlist',['playlist']),
    },
    methods:{
  ...mapMutations('m_playlist',['addPlaylistAll']),
      toBack(){
        uni.navigateBack()
      },
      handlerStart(){
         const query = uni.createSelectorQuery().in(this);
         query.select('#listH').boundingClientRect(data => {

          if(data.top<274){
            this.opc = ` ${this.bigUrl} opacity: ${(343.6-data.top)/343.6};`
          }
          if(data.top >274){
              this.opc = ` ${this.bigUrl} opacity:0;`
          }
      //    "节点离页面顶部的距离为"  data.top
           if(data.top<58){
             this.top = true
             this.opc = ` ${this.bigUrl} opacity:1;`
           }
           
         }).exec();
       },
       //获取歌单歌曲
      async getPlaylistAll(){
     const {data:{songs}} = await  uni.$http('/playlist/track/all',{id:this.playlistId})
     this.playlistAll = songs.map((item)=>{
      return{
        songId:item.id,
        songName:item.name,
        songPic:item.al.picUrl,
        singer:item.ar[0].name,
        singerId:item.ar[0].id,
      }
     })
     this.addPlaylistAll(this.playlistAll)
     console.log(this.playlist);
      console.log(this.playlist[this.index].coverImgUrl);
     this.bigUrl =`background-image: url('${this.playlist[this.index].coverImgUrl}');`
 
    }
    }
  }
</script>

<style lang="scss">
  
.infoContainer{
  position: relative;

  .top{
      position: sticky;
      top:115rpx;
      z-index: 1;
    }
    .headBg{
      background-repeat: no-repeat;
      opacity: 0;
        float: left;
      position: sticky;
      top: 0;
          background-size: cover;
        background-position:0 90% ;
        width: 100%;
        height: 115rpx;
        z-index: 5;
        
    }
    .headerTitle{
        color: white;
      /* position: absolute;
       top: 55rpx;
       left: 10rpx; */
      /* position: sticky;
       top: 100rpx;
       left: 100rpx; */
       float: left;
       position: sticky;
       padding-top: 25rpx;
       top: 0rpx;
      display: flex;
       align-items: center;
       z-index: 25;
       width: 100%;
       height: 115rpx;
         
     
       .titleText{
         margin-left: 15rpx;
        
       }
        }  
  .infoPic{
    position: relative;

    // z-index: 2;
    // top:-61rpx;
   
    .bgWhite{
      position: relative;
      
      .whiteBg{
        width: 100%;
        height: 92rpx;
        position: absolute;
        top:-45rpx ;
      }
      .infoFooter{
       
        z-index: 3;
        padding: 0 15rpx;
        display: flex;
        justify-content: space-around;
        background-color: white;
        border-radius: 40rpx;
        width: 77%;
        height: 90rpx;
        position: absolute;
        top: -60rpx;
        left: 11%;
        font-size: 26rpx;
        .footerL,.footerMid,.footerR{
          display: flex;
          align-items: center;
          text{
            margin: 0 5rpx;
          }
        }
        .footerMid{

          padding: 0 20rpx;
        }
      }
    }
  
    /* .infoImg{
      width: 100%;
      height: 50vh;
      opacity: 0;
    } */
    .tidai{
      width: 100%;
      height: 50vh;
      // height: 100%;
      background-size: cover;
    }
    .infoMiddle{
      position: absolute;
  
      top: 50%;
      z-index: 2;
      color: white;
      display: flex;
      flex-direction: column;
     
  text-align: center;
      .bigTitle{
        font-size: 46rpx;
        font-weight: bold;
        padding: 0 100rpx;
      }
      .smallTitle{
        font-size: 24rpx;
        font-weight: bold;
        margin: 20rpx 0;
      }
      .direction{
        padding: 0 20rpx;
         font-size: 24rpx;
         overflow: hidden;
         display: -webkit-box;
         -webkit-box-orient: vertical;
         -webkit-line-clamp: 2;
      }
    }
  }

  .listHeader{
    margin: 20rpx 0;
    padding-top: 20rpx;
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
  

</style>
