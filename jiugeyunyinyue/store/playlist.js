export default {
  namespaced:true,
  state:() => ({
    playlist :[],
    playlistAll:[],
    recentlyList:[],
    playingInfo:{}
  }),
  mutations:{
    addPlaylist(state,list){
 
      state.playlist = list
    },
    addRecentlyList(state,list){
      state.recentlyList = list
    },
    addPlaylistAll(state,list){
      state.playlistAll = list
    },
    addPlayingInfo(state,list){
      state.playingInfo = list
    }
  },
  getters:{
    
  },
}