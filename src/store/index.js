import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
 
Vue.use(axios)
Vue.use(vuex)

// const initialSetting = axios.get('http://subscriber-api.herokuapp.com/api/v1/subscriber').then((response)=>{
//     return response.data;
//   }).catch((response)=>{
//     return response;
//   })

export default new vuex.Store({
    state:{
        settings: []
    },
    mutations: {
        getSetting: state => axios.get('http://subscriber-api.herokuapp.com/api/v1/subscriber').then((response)=>{
            state.settings = response.data;
          }).catch((response)=>{
            response;
          })
    }
})