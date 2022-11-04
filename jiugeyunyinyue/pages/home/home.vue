<template>
  <view class="home" >
    <view class="container">
    <swiper class="swiperContainer"  indicator-dots="true" indicator-color="white" indicator-active-color="#d43c33" circular="true" autoplay="true" >
      <swiper-item class="swiperCitem" v-for="(item,index) in banners" :key="bannerId">
        <image :src="item.pic" class="swiperImage" lazy-load="true" ></image>
      </swiper-item>
      
    </swiper>
      <view class="nav">
        <view class="nav-item" @click="toRecommend">
         <uni-icons type="calendar" size="30" class="nav-icon"></uni-icons>
          <text>每日推荐</text>
        </view> 
        <view class="nav-item" @click="toPlaylist">
          <uni-icons type="list" class="nav-icon" size="30" ></uni-icons>
          <text>歌单</text>
        </view> 
        <view class="nav-item">
 <uni-icons type="medal" class="nav-icon" size="30"></uni-icons>
          <text>排行榜</text>
        </view> 
        <view class="nav-item">
          <uni-icons type="headphones" class="nav-icon" size="30"></uni-icons>
          <text>电台</text>
        </view>
         <view class="nav-item" @click="toSeacher">
         <uni-icons type="search" class="nav-icon" size="30"></uni-icons>
          <text>搜索</text>
        </view>
      </view>
    </view>
    <view class="recommendContainer">
      <!-- header区域-->
     <navHeader title="推荐歌曲" moreTitle="为你精心推荐" ></navHeader>
   <scroll-view scroll-x="true"  class="scrollBox" enable-flex  >
     <view class="scrollItem" v-for="(item,index) in recommendRes" :key="item.id" @click="toPlaylistInfo(e,item.id,index)">
       <image :src="item.picUrl" class="recommendIamge"></image>
    <view class="recommendName">{{item.name}}</view>
    </view>
   </scroll-view>
    </view>
    <view class="topContainer">
      <navHeader title="排行榜" moreTitle="热歌风向标" ></navHeader>
      <view class="top-box">
        <swiper :indicator-dots="false" :autoplay="flase" :interval="3000" :duration="1000" class="topBoxInfo" circular="true" next-margin="100rpx" >
          <swiper-item class="topSwiper"  v-for="(item,index) in topList" :key="index">
            <view class="topswiper-item" >
            <uni-card is-shadow="true" is-full  shadow="3px 3px 3px 3px rgba(0, 0, 0, 0.2)" class="card">
             <text class="topswiperTitle">{{item.topswiperTitle}}</text>

             <view class="topitem" v-for="(top,i) in item.itemList" :key="i">
               <image :src="top.imgUrl"class="topImg"></image>
               <text class="topNum">{{i+1}}</text>
               <view class="topName">{{top.topName}}</view>
             </view>
              </uni-card>
            </view>
          </swiper-item>  
        
        </swiper>
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
        banners:'',
        recommendRes:[],
        topList:[],
        recommendList:[]
      };
    },
    onLoad() {
      this.getSwiperInfo()
      this.getRecommendInfo()
      this.getTopInfo()
    },
    methods:{
          ...mapMutations('m_playlist',['addPlaylist']),
      //跳转至搜索页面
      toPlaylist(){
        uni.navigateTo({
          url:'/pages/playlist/playlist'
        })
      },
      //跳转至歌单详情页
      toPlaylistInfo(e,id,index){
        this.recommendList = this.recommendRes.map((item)=>{
          return{
           name:item.name,
           id:item.id,
           playCount:item.playCount,
           coverImgUrl:item.picUrl,
           description:item.name,
           commentCount:item.playCount,
           shareCount:item.playCount,
           trackCount:item.trackCount
          }
        })
        this.addPlaylist(this.recommendList)
        uni.navigateTo({
          url: '/pages/playlistInfo/playlistInfo?playlistId='+id+'&index='+index
        });
      },
      //跳转至搜索页面
      toSeacher(){
        uni.navigateTo({
          url:'/pages/seacher/seacher'
        })
      },
      //跳转至每日推荐歌曲页面
      toRecommend(){
        uni.navigateTo({
          url:'/pages/recommend/recommend'
        })
      },
      //获取排行榜歌曲数据
      getTopInfo(){
   
        const topList = [];
   
        let i =1;
   const arr = [24381616,24381615,24381625,24381637];
   for(i=1;i<arr.length+1;i++){
          const obj = {};
      /*    uni.$http('/playlist/detail',{id:arr[i-1]}).then((res)=>{
            console.log(res);
          }) */
    uni.$http('/playlist/detail',{id:arr[i-1]}).then(({data:{playlist}})=>{
       obj.topswiperTitle = playlist.name
       obj.itemList = playlist.tracks.slice(0,3)
       obj.itemList = obj.itemList.map((item)=>{
         return{
           imgUrl:item.al.picUrl,
           topName:item.al.name
         }
       }) 
       topList.push(obj)
       this.topList = topList 
       // topList.push(obj)
    // this.topList = topList
     })
   }
       
         
        // console.log(this.topList);
    
      },
      
      //获取轮播图数据
    getSwiperInfo(){
        uni.$http('/banner',{type:2}).then(({data:{banners}})=>{
          this.banners = banners
         //  console.log(banners);
         // this.banners = banners
        })
     // const res =  await  uni.$http('/banner',{type:2})
     // console.log(res);
      },
      //获取推荐列表数据
      getRecommendInfo(){
        uni.$http('/personalized',{limit:20}).then(({data})=>{
          this.recommendRes = data.result
        })
      }
    }
  }
</script>

<style lang="scss">
 
.container{
  .swiperContainer{
    height: 330rpx;
    .swiperCitem{
      .swiperImage{
        width: 100%;
        height:100% ;
      }
    }
  }
.nav{
  display: flex;
  justify-content: space-around;
  .nav-item{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   .nav-icon{
     font-size: 50rpx;
     background-color: rgb(240, 16, 16);
     width: 100rpx;
     height: 100rpx;
     border-radius: 50%;
     line-height: 100rpx;
     text-align: center;
     color: black;
     margin: 20rpx 0;
   }
   text{
     font-size: 28rpx;
   }
  }
}
}
.recommendContainer{
.scrollBox{
  display: flex;
  height: 300rpx;
  .scrollItem{
     margin: 0 10rpx;
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    .recommendIamge{
      width: 200rpx;
      height: 200rpx;
      border-radius: 20rpx;
      margin: 0 10rpx;
    }
    .recommendName{
      text-align: center;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 24rpx;
    }
  }
}
}
.topContainer{
 // padding-bottom: 100rpx;
  // height: 800rpx;
  // background-color: rgba(0, 0, 0, 0);
  // height: 800rpx;
  .top-box{
    .topBoxInfo{
      height: 460rpx;
      .topSwiper{
        .topswiper-item{
          width: 88%;
          margin: 5px 0;
         
          .topswiperTitle{
            font-size: 28rpx;
            font-weight: bold;
          }
          .topitem{
            margin: 10px 0;
            display: flex;
            align-items: center;
            .topNum{
              margin: 0 40rpx;
              flex-shrink: 0;
            }
            .topName{
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .topImg{
              width: 100rpx;
              height: 100rpx;
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }
}

</style>
