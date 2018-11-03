<template>
  <div id="app">
    <div class="logo">SubscriberAdmin</div>
    <div class="container">
      <div class="child-container">
        <form action="">
          <div class="form-group">
            <h3 class="label">目的地</h3>
            <input name="destination" type="text">
          </div>
          <div class="form-group">
            <h3 class="label">起始時間</h3>
            <input type="text" name="from">
          </div>
          <div class="form-group">
            <h3 class="label">結束時間</h3>
            <input type="text" name="end">
          </div>
          <div class="form-group">
            <h3 class="label">通知價格</h3>
            <input type="text" name="notified-price">
          </div>
          <button type="button" @click="show">新增</button>
        </form>
      </div>
      {{showSetting}}
      <div class="child-container white-background" v-if="!showSetting">
        資料讀取中...
      </div>
      <div class="child-container white-background" v-if="showSetting">
        <div>
          <table v-for="(item, index) in this.$store.state.settings"  v-bind:key="index">
            <tr>
              <th>目的地</th>
              <th>搜尋起始日</th>
              <th>搜尋終止日</th>
              <th>通知價格</th>
            </tr>
            <tr>
              <th>{{item.destination}}</th>
              <th>{{item.start_date}}</th>
              <th>{{item.end_date}}</th>
              <th>{{item.notify_price}}</th>
            </tr>
          </table>
        </div>
      </div>
      {{this.$store.state.settings}}
    </div>
    <!-- <mainComponent/> -->
  </div>
</template>

<script>
import mainComponent from './components/MainComponent.vue'

export default {
  name: 'app',
  components: {
    mainComponent
  },
  created(){
    //initialize store data structure by submitting action.
    this.$store.commit("getSetting")
 },
  // data: function() {
    
  // },
  methods: {
    update: function(e) {
      e.preventDefault
      this.count = e
    },
    show: function() {
      this.$store.commit("getSetting")
    }
  },
  computed: {
    showSetting: function() {
      return this.$store.state.settings.length > 0
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
  background-color: antiquewhite
}
</style>
