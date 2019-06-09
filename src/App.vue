<template>
  <div id="app" style="margin-top: 20px;">
    <div class="logo">SubscriberAdmin</div>
    <div class="container">
      <div class="child-container">
        <div v-if="showError" class="error-message">
          {{error}}
        </div>
        <form action="">
          <div class="form-group"  style="display: block; margin: 0 auto; width: 80%;">
            <!-- <h3 class="label">目的地</h3> -->
            <!-- <input name="destination" type="text" v-model="destination"> -->
            <md-field>
              <label>目的地</label>
              <md-input v-model="destination"></md-input>
              <span class="md-helper-text">Helper text</span>
            </md-field>
          </div>
          <div class="form-group rows" style="margin-top: 10px;">
            <!-- <h3 class="label">起始時間</h3> -->
            <!-- <input type="text" name="from" id="datepicker" v-model="start_date"> -->
            <!-- <datepicker v-model="start_date" name="from" style="display: inline-block; width: 70%;"></datepicker> -->
            <md-datepicker v-model="start_date">
              <label>起始時間</label>
            </md-datepicker>
          </div>
          <div class="form-group rows">
            <!-- <h3 class="label">結束時間</h3> -->
            <!-- <input type="text" name="end" v-model="end_date"> -->
            <!-- <datepicker v-model="end_date" name="end" style="display: inline-block; width: 70%;" ></datepicker> -->
            <md-datepicker v-model="end_date">
              <label>結束時間</label>
            </md-datepicker>
          </div>
          <div class="form-group rows">
            <!-- <h3 class="label">通知價格</h3> -->
            <!-- <input type="text" name="notified-price" v-model="notified_price"> -->
            <md-field>
              <label>通知價格</label>
              <md-input v-model="notified_price" type="number"></md-input>
            </md-field>
          </div>
          <div class="form-group rows">
            <!-- <h3 class="label">航班類型</h3> -->
            <!-- <input type="text" name="notified-price" v-model="flight_type"> -->
            <!-- <div class="md-layout-item" style="display: inline-block;">
              <md-field>
                <md-select v-model="flight_type" name="country" id="country" md-dense>
                  <md-option value="1">直飛</md-option>
                  <md-option value="2">轉機</md-option>
                </md-select>
              </md-field>
            </div> -->
            <md-field>
              <label>航班類型</label>
              <md-select v-model="flight_type">
                <md-option value="1">直飛</md-option>
                <md-option value="2">轉機</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="form-group rows">
            <!-- <h3 class="label">機票類型</h3> -->
            <!-- <input type="text" name="notified-price" v-model="ticket_type"> -->
            <!-- <div class="md-layout-item" style="display: inline-block;">
              <md-field>
                <md-select v-model="ticket_type" name="country" id="country" md-dense >
                  <md-option value="1">單程</md-option>
                  <md-option value="2">來回</md-option>
                </md-select>
              </md-field>
            </div> -->
            <md-field>
              <label>航班類型</label>
              <md-select v-model="ticket_type">
                <md-option value="1">單程</md-option>
                <md-option value="2">來回</md-option>
              </md-select>
            </md-field>
          </div>
          <md-button class="md-raised md-primary" style="display: block; margin: 0 auto; width: 50%;" @click="update" :disabled="btn_disable_flag">新增</md-button>
        </form>
      </div>
      <div class="child-container white-background" v-if="!showSetting">
        資料讀取中...
      </div>
      <div class="white-background" v-if="showSetting">
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
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'app',
  components: {
    mainComponent,
    Datepicker
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
      error: '',
      btn_disable_flag: false
    }
  },
  methods: {
    update: function(e) {
      e.preventDefault
      this.btn_disable_flag = true
      axios.post('https://subscriber-api.herokuapp.com/api/v1/subscribers',
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
          this.btn_disable_flag = false
        }).catch((response)=>{
          this.error = response.body
        })
    },
    show: function() {
      this.$store.commit("getSetting")
    },
    deleteDate: function(id) {
      axios.delete('https://subscriber-api.herokuapp.com/api/v1/subscribers/' + id).then(()=>{
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
  background-color: rgb(200, 225, 248);
  margin-top: 10px;
  height: 380px;
}
.label {
  display: inline-block;
  margin-right: 30px;
  width: 20%;
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
  background-color: rgb(214, 213, 213);
  margin-top: 50px;
}

.setting-list-table {
  width: 100%;
  font-size: 15pt;
}

.error-message {
  color: red;
  font-size: 20px;
  
}

.rows {
  text-align: left;
}
</style>
