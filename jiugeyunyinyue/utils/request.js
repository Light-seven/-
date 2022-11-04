import host from '@/utils/config.js'
export default function(url,data={},method='GET'){
  return new Promise((reslove,reject)=>{
    wx.request({
      url: host.mpHost +url,
      data,
      method,
      header:{
        cookie:wx.getStorageSync('cookies')
      },
      success: (res) => {
        if(data.isLogin){
          wx.setStorageSync('cookies',res.cookies.find((item)=>{
            return item.startsWith('MUSIC_U');
          }))
        }
        reslove(res)
      },
      fail: (err) => {
        reject(err)
      }
      
    })
  })
}