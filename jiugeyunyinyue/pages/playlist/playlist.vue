<template>
  <view class="playlistContainer">
    <view class="playlistHeader">
<uni-icons type="arrow-left" size="35" @click="toBack"></uni-icons>
      <text>歌单广场</text>
    </view>
    <theme :theme="playlistType" @changeActid="updateList()"></theme>
<view class="headerBottom"></view>
    <view class="playlist">
      <view class="playlistItem" v-for="(item,index) in playlist" :key="item.id" @click="toPlayInfo(item.id,index)" >
        <view class="playCount">
           <uni-icons custom-prefix="iconfont" type="icon-24gl-playCircle" size="mini" color="white" class="icons"></uni-icons>  
          {{item.playCount>=100000000?((item.playCount)/100000000).toFixed(2)+'亿':Math.floor((item.playCount)/10000)+'万'}}</view>
        <image :src="item.coverImgUrl" lazy-load="true"></image>
        <text class="name">{{item.name}}</text>
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
        playlistType:[],
        playlist:[]
      };
    },
    onLoad() {
      this.getPlaylistType()
   
    },
    onShow() {
       console.log(uni.bgAudioManager.paused);
      if(uni.bgAudioManager.title){
        console.log(uni.bgAudioManager.paused);
      }
    },
    methods:{
      ...mapMutations('m_playlist',['addPlaylist']),
      //跳转歌单详情
      toPlayInfo(id,index){
          this.addPlaylist(this.playlist)
        uni.navigateTo({
          url: '/pages/playlistInfo/playlistInfo?playlistId='+id+'&index='+index
        });
      },
      updateList(e){
     const res =  this.playlistType.find(item=>item.id===e)
       this.getPlaylist(res.name)
      },
      toBack(){
        uni.navigateBack()
      },
      //获取分类列表
    async  getPlaylistType(){
     const  {data:{tags}} = await uni.$http('/playlist/hot')
       this.playlistType = tags.map((item)=>{
            return{
              id:item.playlistTag.id,
              name:item.playlistTag.name,
              category:item.playlistTag.category
            }
          })
        this.getPlaylist()
      },
      //获取歌单列表
      getPlaylist(cat=this.playlistType[0].name){
        uni.$http('/top/playlist',{cat:cat,limit:30}).then(({data:{playlists}})=>{ 
          console.log(playlists);
          this.playlist = playlists.map((item)=>{
            return{
              name:item.name,
              id:item.id,
              playCount:item.playCount,
              coverImgUrl:item.coverImgUrl,
              description:item.description,
              commentCount:item.commentCount,
              shareCount:item.shareCount,
              trackCount:item.trackCount
            }
          })
        
        })
      }
    }
  }
</script>

<style lang="scss">
   @import '@/static/icon/iconfont.wxss';
.playlistContainer{
  // padding-bottom: 40rpx;
  .playlistHeader{
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
    text{
      font-weight: bold;
      margin-left: 20rpx;
    }
  }
.headerBottom{
  margin-bottom: 30rpx;
}
  .playlist{
    width: 100%;
    padding: 0 10rpx;
    height: 3200rpx;
    .playlistItem{
      float: left;
      width: 30.5%;
      height: 280rpx;
     margin: 20rpx 10rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
       position: relative;
      .playCount{
    display: flex;
    align-items: center;
       padding: 5rpx 10rpx;
       position: absolute;
       right: 8rpx;
       top: 10rpx;
       font-size: 24rpx;
       height: 28rpx;
       line-height: 28rpx;
       color: white;
       background-color: #272822;
       border-radius: 10rpx;
      .icons{
        height: 28rpx;
      }
      }
      image{
        width: 100%;
        height: 222rpx;
        border-radius: 20rpx;
      }
      .name{
        overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      height: 80rpx;
      font-size: 28rpx;
      margin-top: 10rpx;
      }
    }
  }
}
</style>
