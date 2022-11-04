<template>
  <view >
    <view class="loginContaniner">
    <view class="loginTitle">欢迎回来！</view>
    <view class="loginInput">
      <view class="inputItem">
        <text>手机号码</text>
      <input type="text" :value="username" placeholder="请输入手机号码" @blur="handlerUsername"/>
      </view>
       <view class="inputItem">
        <text>密码</text>
      <input type="password" :value="password" placeholder="请输入密码"@blur="handlerPassword" />
      </view>
    </view>
    <view class="loginMiddle">     
    <view class="loginBtn" @click="userLogin">登录</view>
    <text>忘记密码？</text>
    </view>
    <view class="loginFooter">
      还没有账号？
      <text>马上注册</text>
    </view>
    </view>
    
  </view>
 
</template>

<script>
  export default {
    data() {
      return {
        username:'',
        password:''
      };
    },
    methods:{
      //获取输入框电话号码
      handlerUsername(event){
        this.username = event.detail.value
      },
      //获取输入框密码
      handlerPassword(event){
        this.password = event.detail.value
      },
      //发起登录请求
      userLogin(){
        if(!this.username.trim()){
          uni.$showMsg('电话号码不能为空！')
          return
        }if(!this.password.trim()){
          uni.$showMsg('密码不能为空！')
          return
        }
        uni.$http('/login/cellphone',{phone:this.username,password:this.password,isLogin:true}).then(({data})=>{
          console.log(data.code);
          if(data.code === 400){
            uni.showToast({title:'手机号错误！'})
          } 
           if(data.code === 502){
            uni.showToast({title:'密码错误！'})
          }
          if(data.code === 200){
            uni.$showMsg('登录成功！即将跳转！')
            wx.setStorage({
              key:"userinfo",
              data:JSON.stringify(data.profile)
            })
            uni.switchTab({
              url:'/pages/my/my'
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
.loginContaniner{
  position: relative;
  padding: 0 80rpx;
  .loginTitle{
      position: absolute;
       left: 50rpx;
       top: -90rpx;
       font-size: 46rpx;
       color: #555;
  }
  .loginInput{
margin-top: 200rpx;
    .inputItem{
       background:#f8f6fc;
        height: 120rpx;
        border-radius: 4px;
        margin-bottom: 50rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 30rpx;
    }
  }
  .loginMiddle{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  .loginBtn{
 border-radius: 50rpx;
 width: 630rpx !important;
    color: white;
    background-color: #C00000;
    font-size: 32rpx;
     height: 76rpx;
      line-height: 76rpx;
      text-align: center;
      margin-bottom: 40rpx;
  }
  text{
  font-size: 28rpx;
   color: #4399fc;
  }
  }
  .loginFooter{
    position: absolute;
     left: 0;
      bottom: -450rpx;
      width: 100%;
text-align: center;
  font-size: 28rpx;
 text{
   color: #4399fc;
   margin-left: 5rpx;
  }
  }
}
</style>
