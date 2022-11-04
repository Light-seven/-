<template>
  <view>
      <view :style="changeBg?'background-color: #1d82fe;':bg" class="mohu">
    <view class="songContainer" :class="isPlay?'isplay':''" >
      <view class="songHeader">
        <uni-icons type="bottom" size="30" color="white" style="  z-index: 30;" @click="back"></uni-icons>
        <view class="songHeaderCenter">
          <text>{{song.songName}}</text>
          <text class="singer">{{song.singer}}</text>
        </view>
         <uni-icons type="pyq" size="30" color="white" style="visibility: hidden;"></uni-icons>
      </view>
      <image src="../../static/image/song/needle.png" class="needle"></image>
      <view class="songDis" @click="changeBackground">
        <image src="../../static/image/song/disc.png" class="dis"></image>
        <image :src="song.songPic" class="bigPic" ></image>
      </view>
      <!-- 底部按钮-->
      <view class="songContainerBtn">
        <uni-icons type="heart" size="30" color="white" style="  z-index: 30;"></uni-icons>
        <uni-icons type="download" size="30" color="white" style="  z-index: 30;"></uni-icons>
        <uni-icons type="mic" size="30" color="white" style="  z-index: 30;"></uni-icons>
        <uni-icons type="chat" size="30" color="white" style="  z-index: 30;"></uni-icons>
        <uni-icons type="more-filled" size="30" color="white" style="  z-index: 30;transform: rotate(90deg);"></uni-icons>
      </view>
      <!-- 进度条-->
      <view class="barContainer">
        <text>{{currentTime}}</text>
        <view class="wrap" @click="updateStart">
          <view class="inner" :style="'width:'+currentWidth+'%'">
          <view class="point"></view>
          </view>
        </view>
        <text>{{durationTime}}</text>
      </view>
       <view class="footerBtn">
           <uni-icons custom-prefix="iconfont" type="icon-yuanxunhuanbofang" size="30" color="white" class="fbtn" v-if="order==='0'" @click="changeOrder"></uni-icons> 
             <uni-icons custom-prefix="iconfont" type="icon-ziyuan" size="30" color="white" class="fbtn" v-if="order==='1'"  @click="changeOrder"></uni-icons>  
              <uni-icons custom-prefix="iconfont" type="#icon-danquxunhuan" size="30" color="white" class="fbtn" v-if="order==='2'"  @click="changeOrder"></uni-icons>  
    <uni-icons custom-prefix="iconfont" type="icon-shangyishoushangyige" size="30" color="white" class="fbtn" @click="previousSong"></uni-icons>
           <uni-icons custom-prefix="iconfont" :type=" isPlay?'icon-bofang':'icon-24gl-playCircle' " size="50" color="white" class="fbtn" @click="songPlay"></uni-icons>
           <!-- :type=" isPlay?'icon-bofang':'isicon-24gl-playCircle' "-->
           <uni-icons custom-prefix="iconfont" type="icon-xiayigexiayishou" size="30" color="white" class="fbtn" @click="nextSong"></uni-icons>  
           <uni-icons custom-prefix="iconfont" type="icon-quanxuan" size="30" color="white" class="fbtn" ></uni-icons>
       </view>
    </view>
      </view>
  </view>
</template>

<script>
  import moment from 'moment'
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        songId:'',
        song:{},
        bg:'',
        isPlay:false,
        songUrl:'',
        index:0,
        previousId:'',
        nextId:'',
        recommendSingList:[],
        bgAudioManager:{},
        durationTime:'05:59',
        currentTime:'00:00',
        currentWidth:0,
        wrapX:0,
        order:'0',
        from:'',
        changeBg:false
      };
    },
watch:{
       song:{
         handler: function(newVal, oldVal){
         /*  console.log(oldVal);
           console.log(this.songUrl); */
           this.updateSong(this.song)
         },
         // immediate: true
       },
       songId:{
         handler: function(newVal, oldVal){
           console.log("ID发生改变");
           this.addPlayingInfo(
           {
             id:this.songId,
             index:this.index,
             from:this.from
           }
           )
        /*   if(this.bgAudioManager.paused){
             this.bgAudioManager.play()
           this.songPlay()
           } */
      /*  this.songPlay()
        this.songPlay() */
         },
       },
       isPlay:{
         handler: function(newVal, oldVal){
         //    this.bgAudioManager.pause = newVal
         /*  this.songPlay()
           this.songPlay() */
           if(newVal){
             this.bgAudioManager.play()
           }else{
             this.bgAudioManager.pause()
           }
            },
       }
     },
     /* 	watch: {
     		
     				a: function(newVal, oldVal) {
     					console.log("a--newVal: ", newVal, "a--oldVal: ",oldVal);
     				},
     				b: function(newVal, oldVal) {
     					console.log("b--newVal: ", newVal, "b--oldVal: ",oldVal);
     				}
     			}, */
    onLoad:function(options){

      console.log(options);
      this.songId = options.songId
     this.index = Number(options.index)
     this.from = options.from
     // this.bgAudioManager = wx.getBackgroundAudioManager();
  
    /* this.bgAudioManager = wx.getBackgroundAudioManager();
     this.isPlay = false
     this.bgAudioManager.onPause(()=>{
       this.isPlay = false
     })
      this.bgAudioManager.onPlay(()=>{
       this.isPlay = true
     })
     this.bgAudioManager.onTimeUpdate(()=>{
       this.currentTime = moment(this.bgAudioManager.currentTime*1000).format('mm:ss')
       this.currentWidth = this.bgAudioManager.currentTime/this.bgAudioManager.duration*100
      
     })
     //背景音频自然播放结束事件,根据选择的播放顺序播放
     this.bgAudioManager.onEnded(async()=>{
       if(this.order === '0'){
         this.nextSong()
       }
       if(this.order === '1'){
      this.ulPlay()
       }
       if(this.order === '2'){
         this.isPlay = false
         this.songPlay()

       }
     })

       this.getRecommendInfo() */
     
    },
   onShow() {
      uni.bgAudioManager = ''
      this.bgAudioManager = ''
     this.bgAudioManager = wx.getBackgroundAudioManager();
      this.isPlay = false
      this.bgAudioManager.onPause(()=>{
        this.isPlay = false
      })
       this.bgAudioManager.onPlay(()=>{
        this.isPlay = true
      })
      this.bgAudioManager.onTimeUpdate(()=>{
        this.currentTime = moment(this.bgAudioManager.currentTime*1000).format('mm:ss')
        this.currentWidth = this.bgAudioManager.currentTime/this.bgAudioManager.duration*100
       
      })
      //背景音频自然播放结束事件,根据选择的播放顺序播放
      this.bgAudioManager.onEnded(async()=>{
        if(this.order === '0'){
          this.nextSong()
        }
        if(this.order === '1'){
       this.ulPlay()
        }
        if(this.order === '2'){
          this.isPlay = false
          this.songPlay()
     
        }
      })
     
        this.getRecommendInfo()
 this.getSongInfo()
 this.getSongUrl()
    },
computed:{
      ...mapState('m_seacher',['seacherList']),
      ...mapState('m_playlist',['playlistAll','recentlyList']),
},
    
    methods:{
  ...mapMutations('m_song',['updateSong']),
   ...mapMutations('m_playlist',['addPlayingInfo']),
   //切换背景图
   changeBackground(){
     this.changeBg = !this.changeBg
   },
      //更新列表数据（toSeacher）
      toSeacherList(e){
        console.log(e);
      },
      //随机播放一首歌曲
      async ulPlay(){
        this.index = Math.floor(Math.random()*this.recommendSingList.length)
          this.songId = this.recommendSingList[this.index].songId
     await this.getSongInfo()
      await  this.getSongUrl()
       await  this.updatesong()
       this.addPlayingInfo(
       {
         id:this.songId,
         index:this.index,
         from:this.from
       }
       )
      },
      //改变播放顺序
       changeOrder(){
         if(this.order === '0'){
           this.order = '1'
         }else if(this.order === '1'){
           this.order = '2'
         }else{
           this.order = '0'
         }
       },
      //点击进度条
      updateStart(event){
        if(event.target.x<75){
          this.wrapX = 75
        }else if(event.target.x>300){
          this.wrapX = 300
        }else{       
        this.wrapX = event.target.x
        }
        const toStart = (this.wrapX-75)/225*this.bgAudioManager.duration
        this.bgAudioManager.seek(toStart)
      },
      //更新上一首，下一首
      updatesong(){
        this.index = Number(this.index)
        if(this.index == 0){
          this.previousId = this.recommendSingList[this.recommendSingList.length-1].songId
          this.nextId = this.recommendSingList[this.index+1].songId
          return
        }
        if(this.index == this.recommendSingList.length-1 ){
          this.previousId = this.recommendSingList[this.index-1].songId
          this.nextId = this.recommendSingList[0].songId
          return
        }
       if(this.index < 0){
          this.index = this.recommendSingList.length - 1
          this.updatesong()
        }
        if(this.index >= this.recommendSingList.length){
          this.index = 0
          this.updatesong()
        }
        if(1<=this.index&&this.index<=this.recommendSingList.length-2)
        {
          this.previousId = this.recommendSingList[this.index-1].songId
          this.nextId = this.recommendSingList[this.index+1].songId
        }
      },
      //获取推荐歌单列表
     async getRecommendInfo(){
       if(this.from === 'seacher'){
         this.recommendSingList = this.seacherList
         console.log("仓库取数据");
           this.updatesong()
       }else if(this.from === 'playlist'){
         this.recommendSingList = this.playlistAll
         console.log("仓库取数据");
           this.updatesong()
       }else if(this.from === 'recently'){
         this.recommendSingList = this.recentlyList
         console.log("仓库取最近列表数据");
           this.updatesong()
       }
       else{
         console.log("发请求那数据");
         const {data:{data:{dailySongs}}} = await uni.$http('/recommend/songs')
         this.recommendSingList = dailySongs
            this.recommendSingList = this.recommendSingList.map((item)=>{
                    return{
                      // songIndex = index
                      songName:item.name,
                      songId:item.id,
                      singer:item.ar[0].name,
                      singerId:item.ar[0].id,
                    }
                  })
         this.updatesong()
       }
      
       /* uni.$http('/recommend/songs').then(({data:{data:{dailySongs}}})=>{
          this.recommendSingList = dailySongs
          this.recommendSingList = this.recommendSingList.map((item)=>{
                  return{
                    // songIndex = index
                    songName:item.name,
                    songId:item.id,
                    singer:item.ar[0].name,
                    singerId:item.ar[0].id,
                  }
                })
       this.updatesong()
        }) */
        },
      //播放上一首歌曲
      previousSong(){
        if(this.order === '1'){
          this.ulPlay()
          return
        }
        if(this.order === '2'){
         setTimeout(()=>{
            this.bgAudioManager.seek(0)
           },500) 
          return
        }
        this.songId = this.previousId
        this.getSongInfo()
        this.getSongUrl()
        // this.songPlay()
        this.index = this.index - 1
        this.updatesong()
        this.addPlayingInfo(
        {
          id:this.songId,
          index:this.index,
          from:this.from
        }
        )
      },
      //播放下一首歌曲
      nextSong(){
        if(this.order === '1'){
          this.ulPlay()
          return
        }
        if(this.order === '2'){
         setTimeout(()=>{
            this.bgAudioManager.seek(0)
           },500) 
          return
        }
        this.songId = this.nextId
        this.getSongInfo()
        this.getSongUrl()
        // this.songPlay()
        this.index = this.index + 1
        this.updatesong()
        this.addPlayingInfo(
        {
          id:this.songId,
          index:this.index,
          from:this.from
        }
        )
      },
      //返回按钮
      back(){
        uni.navigateBack()
      },
      //播放歌曲
    songPlay(){
      setTimeout(()=>{
        if(this.isPlay){
          this.bgAudioManager.pause()
          this.isPlay = false
          console.log('关闭');
        }else{ 
          console.log('打开');
          this.isPlay = true
        this.bgAudioManager.src = this.songUrl;
              console.log(this.song.songName); 
        this.bgAudioManager.title = this.song.songName;
          this.bgAudioManager.singer = this.song.singer;
          this.bgAudioManager.coverImgUrl = this.song.songPic;
          //将播放歌曲数据存到仓库中
          this.updateSong(this.song)
           /* 
           if(this.song.songName===undefined){
             console.log("重新播放");
             this.isPlay = false
             this.bgAudioManager.pause()
             this.getSongInfo()
             // this.getSongUrl()
             this.songPlay()
           } */
               
          this.bgAudioManager.onError(()=>{
            console.log(errCode);
          })
        }
      },300)
      },
      //获取歌曲详情
    async  getSongInfo(){
       console.log(this.songId);
      const {data:{songs}} = await uni.$http('/song/detail',{ids:this.songId})
      console.log(songs);
      this.song = {
        songName:songs[0].name,
        songPic:songs[0].al.picUrl,
        singer:songs[0].ar[0].name,
        singerId:songs[0].ar[0].id, 
      }
      this.durationTime = moment(songs[0].dt).format('mm:ss')
      this.bg = ` background-image: url(${songs[0].al.picUrl});`
       /* uni.$http('/song/detail',{ids:this.songId}).then(({data:{songs}})=>{
         
          this.song = {
            songName:songs[0].name,
            songPic:songs[0].al.picUrl,
            singer:songs[0].ar[0].name,
            singerId:songs[0].ar[0].id, 
          }
          this.bg = ` background-image: url(${songs[0].al.picUrl});`
        }) */
      },
      //获取歌曲播放地址
  async getSongUrl(){
    /*  uni.$http('/song/url/v1',{id:this.songId,level:'standard'}).then(({data:{data}})=>{
        this.songUrl = data[0].url
       this.songPlay()
       
        }) */
        console.log(this.songId);
       const {data:{data}} = await uni.$http('/song/url/v1',{id:this.songId,level:'standard'})
         this.songUrl = await data[0].url
         // this.songPlay(data[0].url)
       /*  this.bgAudioManager.src = this.songUrl; 
         this.bgAudioManager.title = this.song.songName;
         this.bgAudioManager.singer = this.song.singer;
         this.bgAudioManager.coverImgUrl = this.song.songPic;
         if(!this.bgAudioManager.paused){
             this.bgAudioManager.play()
         }
         this.bgAudioManager.play() */
         this.isPlay = false
        this.songPlay()
    
      }
    }
  }
</script>

<style lang="scss">

  @import '@/static/icon/iconfont.wxss';

  .mohu{
    position: relative;
  z-index: 1;
  width: 100%;
  height: 100vh;
  background-size: contain;
  }
  .mohu:after{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    //继承背景
    background: inherit;
    //设置模糊度，值越大，模糊度越高
    filter: blur(16rpx);
    z-index:2;
  }

  .songContainer{
 z-index: 22;
   background-size: contain;
  // background-color: white;
    .songHeader{
    
      opacity: 1;
      padding-top: 40rpx;
      text-align: center;
      color: white;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .songHeaderCenter{
          z-index: 30;
        width: 500rpx;
        display: flex;
        flex-direction: column;
        font-size: 34rpx;
      .singer{
          z-index: 30;
        font-size: 28rpx;
        color: rgba(255,255,255,0.7);
      }
      }
    }
    .needle{
      position: relative;
        width:192rpx;
        height:274rpx;
         top:20rpx;
          left:335rpx;
          z-index:99;
       //旋转角度
         transform:rotateZ(-30deg);
         //过渡动画效果的时间
         transition:transform 1s;
         //旋转中心点，以图片区域为基础，X方向上40rpx,Y方向为0
         transform-origin:40rpx 0;
    }
    .songDis{
z-index: 24;
        position:relative;
        width:598rpx;
        height:598rpx;
        left: 76rpx;
        top: -140rpx;
        //动画效果 名称 持续时间 线性过渡（过渡效果） 次数
          animation: move 4s linear infinite;
          //动画状态 暂停
          animation-play-state: paused;
      .dis{
          position:relative;
          height:100%;
          width:100%;
          z-index:90;
      }
      .bigPic{
        position:absolute;
          top:0;
          bottom:0;
          left:0;
          right:0;
          margin:auto;
          width:370rpx;
          height:370rpx;
          z-index:89;
      }
    }
    .songContainerBtn{
      margin-top: 40rpx;
      display: flex;
      justify-content: space-around;
    }
    .barContainer{
      display: flex;
      align-items: center;
       justify-content: space-around;
       margin-top: 35rpx;
       text{
         z-index: 22;
         color:rgba(255,255,255,1);
         font-size: 22rpx;
       }
      .wrap{
     
          width:450rpx;
          height:4rpx;
          background:rgba(255,255,255,0.5);
          margin:0 20rpx;
           z-index: 22;
        .inner{
           position: relative;
          width: 0%;
          height: 100%;
           background:rgba(255,255,255,1);
            z-index: 22;
        }
        //把点绝对定位到进度条的最右边
        .point{
          position: absolute;
           width: 14rpx;
            height:14rpx;
            border-radius: 50%;
            background-color: white;
             z-index: 23;
             top:-4rpx;
       right: -6rpx;
             // left:-4rpx;
      
        }
      }
    }
    //播放控件
    .footerBtn{
      margin-top: 40rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;
     .fbtn{
       z-index: 22;
       
     }
    }
  }
  //关键帧
  @keyframes move {
  from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
  //播放开启动画样式
  .isplay{
    .needle{
      transform: rotate(0deg);
    }
    .songDis{
      //动画状态 开启
      animation-play-state: running;
    }
  }

</style>
