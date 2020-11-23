<!-- ******************************************************************
Tile component hold all different components (Grid, Details, Evaluation  
********************************************************************-->

<template>
<div>
    <div :class="(isDetailsView)? 'detail-view text-center': 'grid-view text-center'" >
        <Cards :cardData="cardData" :isEvaluation="false"></Cards>
    </div>
    <div v-show="isDetailsView && hasEvaluation" class="evaluation-view  mt-3">
        <div class="row no-gutters container">
            <div class="col text-left"> 
                <b>Evaluation</b>
            </div>
        </div>
        <div class="row no-gutters">
            <div class="col-3" v-for="(data, index) in cardData.evolutions"> 
                <Cards :cardData="data" :isEvaluation="true"></Cards>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vuex from "vuex";
import { mapGetters,  mapActions} from 'vuex'
import Cards from "@/components/Cards.vue";

export default {
  name: "Tile",
  props: {
   cardData: Object  
  },
  components: {
    Cards
  },
  data(){
      return{
        toggleIcon: false,
        isGrideView: true,
        isListView: false          
      }
  },  
  computed:{
      isDetailsView(){
          return this.$route.name == "details";
      },
      hasEvaluation(){
          return (Object.entries(this.cardData.evolutions).length > 0)
      }      
  }
}; 
</script>
<style scoped lang="scss">
.grey-bg{
    background-color:#F3F3F3;
}
.brd-top{
    border-top: 1px solid #D0D0D0;  
}
.brd-right{
    border-right: 1px solid #D0D0D0;  
}
</style>
