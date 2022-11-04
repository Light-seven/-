<template>
  <view >
    
 
  <view class="seacherContain">
    <view class="seacherHeader">
      <uni-icons type="arrow-left" size="30" @click="toBack"></uni-icons>
        <uni-search-bar placeholder="九歌云音乐" clearButton="auto" class="searchHeader" cancelButton="none" v-model="keywords" @focus="seacherFocus" @input="seacherInput"></uni-search-bar>
        <text @click="seacherBtn">搜索</text>
    </view>
    <theme :theme="theme" @changeActid = "changeType()"></theme>
   
    <view class="seacherList" v-if="show" >
      <view class="seacherItem" v-for="(item,index) in seacherKeyList" :key="index" @click="seacherKeyClick(index)"  >
        <uni-icons type="search" size="20"></uni-icons>
        <text class="seacherKey">{{item}}</text>
      </view>
      
    </view>
     <songList :songList="seacherList" :from="from" v-else ></songList>
     
  </view>
    <footerPlay></footerPlay>
   </view>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    
    data() {
      return {
       theme:[{id:1,name:"单曲"},{id:1000,name:"歌单"},{id:10,name:"专辑"},{id:1004,name:"MV"},{id:1006,name:"歌词"},{id:100,name:"歌手"},{id:1002,name:"用户"},{id:1009,name:"电台"},{id:1014,name:"视频"}] ,
       type:1,
       keywords:'',
       seacherList:[],
       seacherKeyList:[],
       from:'seacher',
       timer:'',
       show:true
      };
    },
    methods:{
      ...mapMutations('m_seacher',['addSeacherList']),
      //防抖函数
     /*  decouned(fn,delay){
        if(this.timer){
          clearTimeout(this.timer)
        }
        return function(...args){
          this.timer = setTimeout(()=>{
            fn.apply(this,args)
          },delay)
        }
      }, */
      //发请求获取搜索框列表
      getSeacherKeyList(){
        this.seacherKeyList = []
        if(this.keywords ==='')return
        uni.$http('/search/suggest',{keywords:this.keywords,type:'mobile'}).then(({data:{result}})=>{
          console.log(result.allMatch);
          if(result.allMatch){
            for (var i = 0; i < result.allMatch.length; i++) {
             this.seacherKeyList.push(result.allMatch[i].keyword) 
            }
          }
        },(err)=>{
          console.log(err);
        })
      },
      //搜索框被点击
      seacherKeyClick(e){
        this.show = false
        this.keywords = this.seacherKeyList[e]
        this.getSeacherList(this.seacherKeyList[e])
      },
      seacherFocus(){
        this.show = true
        this.getSeacherKeyList()
      },
      //搜索框内值发生改变
      seacherInput(){
  if(this.timer){
    clearTimeout(this.timer)
  }
  this.timer =setTimeout(()=>{
    this.getSeacherKeyList()
  },500)
      },
      //返回
      toBack(){
        uni.navigateBack()
      },
      //点击搜索
      seacherBtn(){
        // this.getKeywords()
        this.getSeacherList(this.keywords)
      },
      //发请求获取关键词搜索结果
    async  getSeacherList(key){
      this.show = false
     const {data:{result}} =  await uni.$http('/cloudsearch',{keywords:key,type:this.type})
     if(!result){
       return
     }
     if(this.type === 1 || this.type === 1006){
       console.log(result.songs);
        this.seacherList  = result.songs
       this.seacherList =  this.seacherList.map((item)=>{
          return {
            songName:item.name,
            songId:item.id,
            songPic:item.al.picUrl,
            singer:item.ar[0].name,
            singerId:item.ar[0].id,
            mvId:item.mv
          }
        })
     }
     if( this.type === 1000){
       console.log(result.playlists);
        this.seacherList  = result.playlists
       this.seacherList =  this.seacherList.map((item)=>{
          return {
            songName:item.name,
            songId:item.id,
            songPic:item.coverImgUrl,
            singer:item.creator.nickname,
            singerId:item.creator.userId,
 
          }
        })
     }
    if( this.type === 10){
      console.log(result.albums);
       this.seacherList  = result.albums
      this.seacherList =  this.seacherList.map((item)=>{
         return {
           songName:item.name,
           songId:item.id,
           songPic:item.picUrl,
           singer:item.artist.name,
           singerId:item.artist.id,
     
         }
       })
    }
    if( this.type === 1004){
      console.log(result.mvs);
       this.seacherList  = result.mvs
      this.seacherList =  this.seacherList.map((item)=>{
         return {
           songName:item.name,
           songId:item.id,
           songPic:item.cover,
           singer:item.artistName,
           singerId:item.artistId,
         }
       })
    }
        this.addSeacherList(this.seacherList)
      },
      changeType(e){
      this.type = e
      this.getSeacherList(this.keywords)
      }
    }
  }
</script>

<style lang="scss">
  .seacherContain{
    padding: 0 20rpx;
    .seacherHeader{
      display:flex;
      align-items: center;
    .searchHeader{
      flex-grow: 1;
      margin: 0 20rpx;
    }
    }
    //搜索列表
    .seacherList{
      position: relative;
      z-index: 2;
      background-color: white;
      top:-100rpx;
      .seacherItem{
        margin-top: 20rpx;
        height: 60rpx;
        border-bottom: 2rpx solid lightgray;
        .seacherKey{
          color: black;
          margin-left: 40rpx;
        }
      }
     
    }
  }

</style>
