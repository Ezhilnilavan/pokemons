<!-- **********************************************************************
Board component hold all tiles component based on the respective page scope 
************************************************************************-->

<template>    
    <div class="container padding">
        <div class="row m-1 no-gutters justify-content-start">
            <div  :class="{'detail-view col-12' : isDetailMode, 'grid-view col-3': !isDetailMode , 'grid-view col-12': getViewStatus }" v-for="(data, index) in getCardData" :key="data.id">
                <Tile :cardData="data"></Tile> 
            </div>
        </div>
    </div> 
</template>
<script>
import Vuex from "vuex";
import { mapGetters,  mapActions} from 'vuex'
import Tile from "@/components/Tile.vue";
export default {
  name: "Board",
  components: {
    Tile
  },
  props:{      
      isDetailMode: Boolean      
  },
  data(){
      return{         
          boardLength: 12,
          filterType: "",
          filterName: "",
          isAllFavorite: false,
          isListView: false,
          isBottomReached: false
      }
  },
  computed:{   
     ...mapGetters({  
      getAllCards: 'getAllCards',
      getSelectedCard: 'getSelectedCard',
      getViewStatus: 'getViewStatus'   
    }),
    selectedCardName(){
        return this.$route.params.name;
    },   
    boardData(){
        return this.getAllCards;
    },
    selectedCardData(){
        return this.getSelectedCard;
    },
    isFavBoard(){
        if(this.$route.name == "favorites"){
            return true;
        }else{
            return false;
        }
    },
    getCardData(){
        if(this.$route.name == "details"){
            return this.getSelectedCard;
        }else{
           return this.getAllCards; 
        }
    },       
    isThreeColumn(){
        if(!this.isGridList && !this.isDetailMode){
            return true;
        }else{
            return false
        }
    }    
  },  
  mounted(){
       this.$root.$on("TYPE-CHANGE-EVENT", (inputs)=>{
           this.filterType = (inputs.types)? inputs.types : "";
           this.filterName = (inputs.name)? inputs.name : "";
       });

       this.$root.$on("REFRESH-FAVORITE", ()=>{
           this.fetchAllAgain();
       });

       this.$root.$on("TOGGLE-GRID-LIST", (flag)=>{
           this.isListView = flag; 
       });
  },
  created(){
        window.onscroll = (ev)=>{
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                this.isBottomReached = true
            }
        };
        
  },
  watch:{
      boardLength:{
        handler: 'fetchAllAgain',
        immediate:true
      },
      selectedCardName:{
          handler: 'fetchByName',
          immediate:true
      },
      filterType(){
          this.fetchAllAgain()
      },
      filterName(){
         this.fetchAllAgain()
      },
      isBottomReached(newValue){
          this.boardLength = this.boardLength + 10;
      }
  },
  methods:{
      async fetchAllAgain(){
        await this.$store.dispatch('searchAllPokemons', {
            limit: this.boardLength,
            search: this.filterName,
            type: this.filterType,
            ...(this.isFavBoard && { fav: true }),
        });
        this.isBottomReached = false;
      },
      async fetchByName(){
        if(this.isDetailMode && this.selectedCardName){
            await this.$store.dispatch('fetchPokemonsByName', {
                name: this.selectedCardName
            });
        }
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
 .progress{
    .cp{
        background-color:#9F9FFF;
    }
    .hp{
        background-color:#71C1A1;
    }
}

</style>