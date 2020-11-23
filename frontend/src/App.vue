<template>
  <div id="app" :class="(isDetailsPage)? 'details-view container rounded': 'container brd'">
    <div class="row">
      <div class="col">
          <div v-show="!isDetailsPage" class="row mt-2">
            <div class="col">
              <Tabs></Tabs>
            </div>
          </div>
           <div v-show="!isDetailsPage" class="row mt-2">
            <div class="col">
              <Filters></Filters>
            </div>
          </div>
           <div class="row mt-2">
            <div class="col">
              <transition name="fade">
                <router-view  class="default-height"/>
              </transition>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
#app {
  font-family: "connections", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size:16px;
  color: #2c3e50;
}
.default-height{
  min-height: 100vh;
}
.row, .container{
  margin-left: 0;
  margin-right: 0;
  .col{
     padding-left: 0;
     padding-right: 0;
  }
}
.brd{
  border:1px solid #D0D0D0;
}
.br-bottom{
    border-bottom:1px solid #D0D0D0;
}

/* Router view - Transition effect */
.fade-enter-active, .fade-leave-active {
  transition: opacity .20s;
  img{
    display:none;
  }
  div{
    display:none;
  }
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
  img{
    display:none;
  }
  div{
    display:none;
  }

}
</style>

<script>
import Tabs from "@/components/Tabs.vue";
import Filters from "@/components/Filters.vue";
export default {
  name: "App",
  components: {
    Tabs,
    Filters
  },
  computed:{
    isDetailsPage(){
      return (this.$route.name == "details");
    }
  }
};
</script>