<template>
  <div id="app">
    <div class="logo">SubscriberAdmin</div>
    <div class="container">
      <div class="child-container">
        <div v-if="showError" class="error-message">
          {{error}}
        </div>
        <form action="">
          <div class="form-group">
            <h3 class="label">目的地</h3>
            <input name="destination" type="text" v-model="destination">
          </div>
          <div class="form-group">
            <h3 class="label">起始時間</h3>
            <input type="text" name="from" v-model="start_date">
          </div>
          <div class="form-group">
            <h3 class="label">結束時間</h3>
            <input type="text" name="end" v-model="end_date">
          </div>
          <div class="form-group">
            <h3 class="label">通知價格</h3>
            <input type="text" name="notified-price" v-model="notified_price">
          </div>
          <div class="form-group">
            <h3 class="label">航班類型</h3>
            <input type="text" name="notified-price" v-model="flight_type">
          </div>
          <div class="form-group">
            <h3 class="label">來回/單程</h3>
            <input type="text" name="notified-price" v-model="ticket_type">
          </div>
          <button type="button" @click="update">新增</button>
        </form>
      </div>
      <div class="child-container white-background" v-if="!showSetting">
        資料讀取中...
      </div>
      <div class="child-container white-background" v-if="showSetting">
          <table class="setting-list-table">
            <tr>
              <th>目的地</th>
              <th>搜尋起始日</th>
              <th>搜尋終止日</th>
              <th>通知價格</th>
              <th>航班類型</th>
              <th>機票類型</th>
            </tr>
            <tr v-for="(item, index) in this.$store.state.settings"  v-bind:key="index">
              <th>{{item.destination}}</th>
              <th>{{item.start_date}}</th>
              <th>{{item.end_date}}</th>
              <th>{{item.notify_price}}</th>
              <th>{{item.flight_type}}</th>
              <th>{{item.ticket_type}}</th>
              <th><button @click="deleteDate(item.id)">刪除</button></th>
            </tr>
          </table>
      </div>
    </div>
    <!-- <mainComponent/> -->
  </div>
</template>

<script>
import mainComponent from './components/MainComponent.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    mainComponent
  },
  created(){
    //initialize store data structure by submitting action.
    this.$store.commit("getSetting")
 },
  data: function() {
    return {
      destination: '',
      start_date: '',
      end_date: '',
      notified_price: '',
      flight_type: '',
      ticket_type: '',
      error: ''
    }
  },
  methods: {
    update: function(e) {
      e.preventDefault
      axios.post('https://subscriber-api.herokuapp.com/api/v1/subscriber',
      {
        'destination': this.destination,
        'start_date': this.start_date,
        'end_date': this.end_date,
        'notified_price': this.notified_price,
        'flight_type': this.flight_type,
        'ticket_type': this.ticket_type
      }
      ).then(()=>{
          this.error = ''
          this.$store.commit("getSetting")
        }).catch((response)=>{
          this.error = response.body
        })
    },
    show: function() {
      this.$store.commit("getSetting")
    },
    deleteDate: function(id) {
      axios.delete('https://subscriber-api.herokuapp.com/api/v1/subscriber/' + id).then(()=>{
            this.$store.commit("getSetting")
          }).catch(()=>{
            this.error = "something wrong"
          })
    }
  },
  computed: {
    showSetting: function() {
      return this.$store.state.settings.length > 0
    },
    showError: function() {
      return this.error.length > 0
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.logo {
  font-size: 50px;
  font-style: italic;
  font-family: 'Brush Script MT', 'Brush Script Std', 'cursive';
  /* text-align: left; */
}
.container {
  width: 90%;
  /* display: flex; */
  text-align: center;
  margin-left: 5%;
  margin-right: 5%;
}
.child-container {
  background-color: steelblue;
}
.label {
  display: inline-block;
  margin-right: 30px;
  color: white;
}
.form-group {
  display: inline-block;
  width: 40%;
  margin-right: 10px;
}
input{
  width: 60%;
}

.white-background {
  background-color: whitesmoke;
}

.setting-list-table {
  width: 100%;
  font-size: 15pt;
}

.error-message {
  color: red;
  font-size: 20px;
  
}
</style>
