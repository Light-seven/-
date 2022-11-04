<template>
  <!-- 	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta> -->
  <view>
    
    <view class="box">
      
    </view>
    <view class="playBar" v-if="show">
      <view class="playBarL"  @click="gotoSong">
        <image :src="songInfo.songPic" ></image>
        <view class="text">
          <text class="songName">{{songInfo.songName}}</text>
          <text class="singer">-{{songInfo.singer}}</text>
        </view>
       
      </view>
    <view class="playBarR">
           <uni-icons  :type=" isPlay?'circle-filled':'circle' "  size="40" class="btn" ></uni-icons>
           <uni-icons type="list" size="40" class="btn" @click="open" ></uni-icons>
    </view>
      
    </view>
    <view >
    		<!--  @change="change" -->
    		<uni-popup ref="popup" type="bottom">
          <view class="pop">
            <text class="title">当前播放（{{list.length}}）</text>
            <scroll-view  scroll-y="true" class="scroll-Y" show-scrollbar="false">
            			<view class="list" v-for="(item,index) in list" :key="index" @click="gotoSong(e,item.songId,index)" >
            			  <view class="listLeft"  >
                      <!-- :style="(info.index==index?'color:red':'')"-->
            			    <text class="songName" :style="(info.index==index?'color:red':'')">{{item.songName}}</text><!--  -->
            			    <text class="singer" :style="(info.index==index?'color:red':'')">-{{item.singer}}</text>
            			  </view>
            			  <view class="listRight">
            			    <uni-icons type="closeempty" size="20" color="lightgray"></uni-icons>
            			  </view>
            			</view>
            				</scroll-view>
        
          </view>
         
        </uni-popup>
    	</view>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name:"footerPlay",
    data() {
      return {
        isPlay:true,
        songInfo:{},
        info:{},
        show:false,
        list:[]
        // isshow:false
      };
    },
    computed:{
       ...mapState('m_song',['bgAudioManager']),
       ...mapState('m_seacher',['seacherList']),
       ...mapState('m_playlist',['playlistAll','playingInfo','recentlyList']),
    },
   mounted: function () {
     this.$nextTick(function () {
       // 仅在整个视图都被渲染之后才会运行的代码

    /*   this.songInfo =  this.bgAudioManager
       this.info =  this.playingInfo */
 /*  if(this.info.from === 'recently'){
     console.log("moutedd");
     console.log(this.recentlyList);
     this.list = this.recentlyList
   } */
     })
   },
   updated: function () {
     this.$nextTick(function () {
       //  仅在整个视图都被重新渲染之后才会运行的代码    
        this.songInfo =  this.bgAudioManager
        this.info =  this.playingInfo

        if(this.info.from === 'recently'){
          this.list = this.recentlyList
        }
        if(this.info.from === 'playlist'){
       
          this.list = this.playlistAll
        }
         if(this.info.from === 'seacher'){
       
          this.list = this.seacherList
        }
     })
   },
   watch:{
     songInfo:{
       handler: function(newVal, oldVal){
      if(!this.songInfo.songName)return
      this.show = true
       },
     }
   },
   /* onLoad() {
      console.log("页面加载");
      console.log(this.bgAudioManager);
      this.songInfo =  this.bgAudioManager
    }, */
    methods:{
     /* change(e) {
      				this.isshow = e.show
      			}, */
   /*         tosong(id,index){
              uni.navigateTo({
                  url:'/pages/song/song?songId='+id+'&index='+this.index+'&from='+this.info.from
                })
            }, */
      gotoSong(e={},id = this.info.id,index = this.info.index){
     console.log(this.info);
     console.log(this.songInfo);
    uni.navigateTo({
          url:'/pages/song/song?songId='+id+'&index='+index+'&from='+this.info.from
        })
      },
      open(){
              // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
              this.$refs.popup.open('bottom')
            }
    }
  }
</script>

<style lang="scss">
 @import '@/static/icon/iconfont.wxss';
 //隐藏滚动条
 ::-webkit-scrollbar {
 		display: none;
 		width: 0 !important;
 		height: 0 !important;
 		-webkit-appearance: none;
 		background: transparent;
 		color: transparent;
 	}
 .box{
   width: 100%;
   height: 110rpx;
   background-color: white;
 }
 //当前高亮
 .active{
   color: red;
 }
 //弹出层
 .pop{
    margin: 0 30rpx 0 30rpx;
  /* margin-left: 30rpx;
   margin-right: 30rpx; */
   height: 50vh;
   // width: 90%;
   background-color: white;
   border-radius: 20rpx;
   padding: 40rpx;
   // text-align: center;
   .title{
     margin-bottom: 20rpx;
     font-size: 36rpx;
     font-weight: bold;
     color: black;
   }
   .scroll-Y{
     height: 55vh;
   }
   .list{
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin: 40rpx 0;
     height: 42rpx;
     width: 610rpx;
     .listLeft{
          width: 510rpx;
          overflow: hidden;
          display: flex;
          align-items: center;
     }
     .songName{
       font-size: 32rpx;
       color: black;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
       
     }
     .singer{
       font-size: 26rpx;
       color: lightgray;
       overflow: hidden;
         white-space: nowrap;
     }
   }
 }
.playBar{
  display: flex;
  justify-content: space-between;
align-items: center;
  width: 100%;
  // top: 90vh;
  height: 100rpx;
position: fixed;
bottom: 0;
/* position: sticky;
bottom: 0; */
background-color: white;
  z-index: 99;
  .playBarL{
  width: 550rpx;
  height: 100rpx;
  display: flex;
  align-items: center;
    image{
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      margin-left: 30rpx;
      margin-right: 15rpx;
    }
    .text{
      width: 400rpx;
      display: flex;
  align-items: center;
      height: 100rpx;
      line-height: 100rpx;
    }
    .songName{
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
      text-overflow: ellipsis;
    }
    .singer{
      margin-left: 10rpx;
      padding-top: 2rpx;
      font-size: 30rpx;
      color: darkgray;
      white-space: nowrap;
      display: inline-block;
      text-overflow: ellipsis;
    }
  }
  .playBarR{
    height: 100%;
      z-index: 22;
    display: flex;
    align-items: center;
    .btn{
      margin-left: 20rpx;
    }
  }
}
</style>