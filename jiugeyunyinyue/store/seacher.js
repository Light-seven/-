export default {
  namespaced:true,
  state:() => ({
    seacherList :[]
  }),
  mutations:{
    addSeacherList(state,list){
      state.seacherList = list
    }
  },
  getters:{
    
  },
}