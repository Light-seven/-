export default {
  namespaced:true,
  state:() => ({
   bgAudioManager:{}
  }),
  mutations:{
    updateSong(state,list){
      console.log(list);
      state.bgAudioManager = list
    },
  /*  addPlaylistAll(state,list){
      state.playlistAll = list
    } */
  },
  getters:{
    
  },
}