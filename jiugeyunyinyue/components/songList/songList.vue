<template>
  <view>
    <scroll-view scroll-y class="scrollList">
      <view class="scrollItem" v-for="(item,index) in songList" :key="item.songId" @click="toSong(item.songId,index)">
        <image :src="item.songPic" lazy-load="true"></image>
      <view class="song-rec">
        <text class="songName">{{item.songName}}</text>
        <view class="songFooter">
         <text class="reason" v-if="item.reason">{{item.reason}}</text>
        <text class="singer">{{item.singer}}</text>
        </view>
      </view>
      <view class="recommendRadio">
        <uni-icons type="more-filled" size="20" color="darkgrey"></uni-icons>
      </view>
      </view> 
    </scroll-view>
  </view>
</template>

<script>
  export default {
    name:"songList",
    data() {
      return {
      list:[],
      };
    },
    props:{
        songList:{},
        from:'',
        isFrom:''
    },
    onLoad() {
    },
    methods:{
      //跳转到播放页面
      toSong(id,index){
        console.log(this.from);
        if(this.isFrom === "myPlaylist"){
              console.log(id);
              console.log(index);
              uni.navigateTo({
              url: '/pages/playlistInfo/playlistInfo?playlistId='+id+'&index='+index
              });
        }else{
          uni.navigateTo({
            url:'/pages/song/song?songId='+id+'&index='+index+'&from='+this.from,
          })
        }
      
      }
    }
  }
</script>

<style lang="scss">
      .scrollList{
     
        .scrollItem{
          display: flex;
            margin-top: 30rpx;
          image{
            width: 80rpx;
            height:80rpx;
            border-radius: 6rpx;
               position: relative;
          }
          .recommendRadio{
            position: absolute;
            right: 0;
            transform: rotate(90deg);
            line-height: 80rpx;
          }
          .song-rec{
            display: flex;
            flex-direction: column;
              margin-left: 30rpx;
              .songName{
                font-size: 32rpx;
                line-height: 40rpx;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                width: 560rpx;
              }
              .songFooter{
                width: 560rpx;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color:darkgray ;
              }
              .reason{
                font-size: 20rpx;
               color: #eca97f;
               margin-right: 10rpx;
               background:rgba(222, 159, 128, 0.2);
               padding: 0 5rpx;
               line-height: 26rpx;
              }
              .singer{
                font-size: 26rpx;
                color: darkgray;
             
              
              }
          }
        }
      }
</style>