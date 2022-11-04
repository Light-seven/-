<template>
  <view >
   <view class="vidioHeader">
     <image src="/static/image/video/video.jpg" ></image>
     <uni-search-bar placeholder="九歌云音乐" clearButton="auto" class="searchHeader"></uni-search-bar>
     <image src="/static/image/logo.png" ></image>
   </view>
 <!--  <scroll-view  class="scrollNav" scroll-x="true" enable-flex>
     <view class="nav-item " v-for="(navItem,index) in theme" :key="navItem.id" @click="changeActive(navItem.id)" >
     <text :class="actid===navItem.id||active&&index===0?'active':'no'" >{{navItem.name}}</text>
     </view>
   </scroll-view> -->
   <theme @changeActid="updateChangeInfo()" :theme="theme"></theme>
  <scroll-view scroll-y="true"  refresher-enabled="true" class="videoList" @refresherrefresh="handlerRefresh" :refresher-triggered="isTriggered" @refresherpulling="handlerPull" @scrolltolower="tolowerRefesh">
    <view class="video-item" v-for="(item,index) in videoList" :key="item.data.vid">
      <view >
      <video :src="videoUrlList[index].videoUrl" class="videoinfo" controls show-center-play-btn show-mute-btn show-fullscreen-btn show-loading v-if="isPlayId===item.data.vid" @play="handlerPlay" :id="item.data.vid"></video>
      <image :id="item.data.vid" :src="item.data.coverUrl" v-else class="videoinfo" @click="playVideo"></image>
   <view class="videoContent">{{item.data.description||'无简介'}}</view>
    <view class="video-footer">
      <view class="videoFleft">
      <img :src="item.data.creator.avatarUrl" >
      <text>{{item.data.creator.nickname}}</text>
      </view>
      <view class="videoFright">
        <view class="frighrItem">
          <view class="item">
            <view class="item-box">
            <uni-icons  type="heart" size="20"></uni-icons>
            <text>{{item.data.praisedCount}}</text>
            </view>
        </view>
          <view class="item">
            <view class="item-box" >
            <uni-icons type="chat" size="20"></uni-icons>
            <text>{{item.data.commentCount}}</text>  
            </view>
          </view> 
          <button class="footerBtn item" open-type="share" :data-title="item.data.description" :data-imageurl="item.data.coverUrl">
            <uni-icons type="more-filled" size="20" ></uni-icons>
          </button>
        </view>
      </view>
    </view>
     </view>
    </view>
  </scroll-view>
   <footerPlay></footerPlay>
  </view>
</template>

<script>
  import theme from '@/components/theme/theme.vue'
  export default {
    data() {
      return {
        theme:[],
        actid:0,
        showid:0,
        videoList:[],
        videoUrlList:[],
        isTriggered:true,
        isPlayId:''
      };
    },
    components:{
      theme
    },
    //转发分享的函数
    onShareAppMessage(res) {
       if(res.from === 'menu'){
        return{
          title:'九歌云音乐',
          path:'/pages/home/home',
          imageUrl:'/static/image/logo.png'
        }
      }else if(res.from === 'button'){
        return{
          title:res.target.dataset.title||'九歌云音乐',
          imageUrl:res.target.dataset.imageurl,
          path:'/pages/vudio/vudio'
        }
      }
    },
    onLoad() {
    
      this.getTheme()
    },
    onShow() {
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
      if(this.theme[0]){
      this.getVideoInfo()
      }
    // this.getChangeInfo()
    },
    methods:{
      //获取新主题数据
      updateChangeInfo(e){
        console.log(e);
        this.getVideoInfo(e)
      // this.$on('changeActid',(e)=>{
      //   console.log(e);
      // })
/* uni.$on('update',function(data){
		console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
	}) */
        // this.getVideoInfo()
      },
      //点击图片播放视频
      playVideo(e){
       //给当前isPlayId赋值，展示id对应的video组件。
        this.isPlayId = e.currentTarget.id
        //创建video实例对象
       const videoText = uni.createVideoContext(e.currentTarget.id)
       //调用实例对象身上的play()方法
       videoText.play()
      },
      
    //取消同时播放两个视频
    handlerPlay(e){
      //获取当前视频播放组件的id
       const id = e.currentTarget.id
 //判断上一个视频的id是否存在以及与当前播放的视频id 是否一致，符合条件即暂停视频播放
      if(this.oldId&&this.oldId !== id){
        //创建并返回 video 上下文 videoContext 对象，传入上个视频的id，创建其对象
        const videoText =  uni.createVideoContext(this.oldId)
       //调用对象上的pause方法暂停视频播放
        videoText.pause()
      }
   //保存当前播放视频id 作为下个视频播放时的旧id
    this.oldId = id
    },
      //上拉触底加载更多
      tolowerRefesh(){
        uni.$http('/video/group',{id:this.actid}).then(({data:{datas}})=>{
              if(datas.length===0){
                uni.$showMsg("暂无推荐视频，请稍后再试！")
                return
              }
              console.log(datas[0].data.vid);
        
                if(this.videoList.find((vitem)=>vitem.data.vid === datas[0].data.vid)){
                  uni.$showMsg("我是有底线的，请稍后再试！")
              
                  return 
                }
             
                 this.videoList = [...this.videoList,...datas]
                       console.log(this.videoList);
                     const videoUrlList =  datas.map((item)=>{
                          return {
                            vid:item.data.vid,
                            videoUrl:''
                          }
                         })
                         
                   videoUrlList.map(async(item)=>{
                 const {data:{urls}} =  await  uni.$http('/video/url',{id:item.vid})
                       item.videoUrl = urls[0].url
                       })
                       this.videoUrlList = [...this.videoUrlList,...videoUrlList]
            
             /* if(!result){
              
              } */
             /* if(datas[0].data.vid===this.videoList[0].data.vid){
              uni.$showMsg("我是有底线的，请稍后再试！")
              return
              } */
             /*  */
              })
      },
      
      //组件被下拉
      handlerPull(){
        this.isTriggered = true
      },
      //下拉刷新
    async  handlerRefresh(){
       await this.getVideoInfo(this.actid)
        console.log("下拉刷新完成");
        this.isTriggered = false
      },
      getTheme(){
        uni.$http('/video/group/list').then(({data:{data:theme}})=>{
          this.theme = theme.slice(0,19)
          this.getVideoInfo()
        })
      },
    
      //获取视频数据
      getVideoInfo(e = this.theme[0].id){
       if(!wx.getStorageSync('cookies')){
         /* uni.$showMsg('请先登录，即可观看视频区内容！') */
          return
        }
       
        this.actid = e
       uni.$http('/video/group',{id:e}).then(({data:{datas}})=>{
              // console.log(datas);
        if(datas.length===0){
          uni.$showMsg("暂无推荐视频，请稍后再试！")
        }
       uni.hideLoading()
          this.videoList = datas
      const videoUrlList =  datas.map((item)=>{
           return {
             vid:item.data.vid,
             videoUrl:''
           }
          })
          
    videoUrlList.map(async(item)=>{
  const {data:{urls}} =  await  uni.$http('/video/url',{id:item.vid})
        item.videoUrl = urls[0].url
        })
        this.videoUrlList = videoUrlList
        })
      }
    },
    
  }
</script>

<style lang="scss">
.vidioHeader{
  display: flex;
  align-items: center;
    padding:10rpx 10rpx 0;
    position: sticky;
    top: 0;
   z-index: 1;
    background-color: white;
  .searchHeader{
    flex-grow: 1;
    margin:  0 10rpx;
    border-radius: 10rpx;
  }
  image{
    width: 60rpx;
    height: 60rpx;
  }
}

.videoList{
    padding-top:40rpx;
    z-index: -1;
    height: calc(100vh - 122rpx - 100rpx - 40rpx);
  .video-item{
    padding:3%;
    padding-bottom: 0;
    .videoinfo{
      width: 100%;
       border-radius: 10rpx;
    }
    .videoContent{
        max-width: 500rpx;
      font-size: 26rpx;
      height:80rpx;
      line-height: 80rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .video-footer{
    display: flex;
    justify-content: space-between;
      border-top: 1rpx solid #eee;
      padding: 20rpx 0;
   
    .videoFleft{
      image{
        width: 60rpx;
        height: 60rpx ;
            border-radius: 50%;
            vertical-align: middle;
           }
           text{
               font-size: 26rpx;
               vertical-align: middle;
               margin-left: 20rpx;
           }
    }
    .videoFright{
      .frighrItem{
  display: flex;
  justify-content: space-around;
        .item{
          margin-left: 30rpx;
          .item-box{
          }
          text{
            font-size: 20rpx;
          }
        }
        .footerBtn{
          display: inline;
         background-color: transparent;
         border-color: transparent;
         padding: 0;
         margin-top: -20rpx;
         transform: rotate(90deg);
        }
        .footerBtn:after{
           border: none;
        }
      }
    }
  }
}
</style>
