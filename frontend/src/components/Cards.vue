<!-- ***********************************************************************************************************
Card component hold all Pokemons details (image, name, types, etc) component based on the respective board scope 
*************************************************************************************************************-->

<template>
    <div class="padding card-view brd m-2 rounded">
        <div class="row" v-show="!getViewStatus">
            <div class="col">
               <router-link :to="`/details/${cardData.name}`">
                    <img class="card-img" :src="cardData.image" :alt="cardData.name">
               </router-link>
            </div>
        </div> 
        <div class="row no-gutters container m-3" v-show="isDetailsView && !isEvaluation">
            <div class="col text-left">
                <img @click="playSound()" class="audio-img" src="../assets/audio.png" alt="Play" title="Play">
            </div>
        </div>
        <div :class="(getViewStatus)? 'row no-gutters grey-bg': 'row container no-gutters grey-bg'">
           <div class="col-1 text-left list-view" v-show="getViewStatus">
               <router-link :to="`/details/${cardData.id}`">
                    <img class="card-img" :src="cardData.image" :alt="cardData.name">
               </router-link>
            </div>
            <div class="col-10 name-text text-left">
                <h6 class="m-alternate">{{cardData.name}}</h6>
                <label class="card-types">{{getCardTypes}}</label>
            </div>
            <div :class="(getViewStatus) ? 'col-1 icon text-center': 'col-2 icon text-right'">
                <img  v-if="!isFavorites" :key="`off${cardData.id}`" ref="favImage" class="fav-icon m-alternate" @click="addToFavorite()" src="../assets/offHeart.png" title="Favorite">
                <img  v-if="isFavorites"  :key="`on${cardData.id}`" ref="favImage" class="fav-icon m-alternate" @click="removeToFavorite()" src="../assets/onHeart.png" title="Favorite">
            </div>
        </div> 
        <div v-show="isDetailsView && !isEvaluation" class="container padding grey-bg">
            <div class="row no-gutters">
                <div class="col-11 progress">
                    <div class="progress-bar cp" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="col-1">
                    <label><b>CP: {{this.cardData.maxCP}}</b></label>
                </div>
            </div>
            <div class="row no-gutters">
                <div class="col-11 progress">
                    <div class="progress-bar hp" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="col-1">
                    <label><b>HP: {{this.cardData.maxHP}}</b></label>
                </div>
            </div>
        </div> 
        <div v-show="isDetailsView && !isEvaluation" class="container padding grey-bg brd-top">
            <div class="row no-gutters ">
                <div class="col-6 p-3 brd-right">
                    <div><b>Weight</b></div>
                    <div>{{getWeight}}</div>
                </div>
                <div class="col-6 p-3">
                     <div><b>Height</b></div>
                    <div>{{getWeight}}</div>
                </div>
            </div>           
        </div> 
    </div>
</template>

<script>
import Vuex from "vuex";
import { mapGetters,  mapActions} from 'vuex'
export default {
  name: "Cards",  
  props:{     
     cardData: Object,
     isEvaluation: Boolean        
  },
  computed:{    
    ...mapGetters({ 
      getViewStatus: 'getViewStatus'   
    }),    
      isDetailsView(){
          return this.$route.name == "details";
      },     
      getCardTypes(){
          if(this.cardData.types){
            return this.cardData.types.join(",")
          }
      },
      getWeight(){
          if(this.cardData.weight){
              return this.cardData.weight.minimum + "-" + this.cardData.weight.maximum
          }
      },
      getHeight(){
          if(this.cardData.height){
              return this.cardData.height.minimum + "-" + this.cardData.height.maximum
          }
      },
       getSoundSource(){
           if(this.cardData.sound){
               return this.cardData.sound;
           }
      }  
  },
  data(){
      return {
          isFavorites: false
      }
  },
  watch:{
     isFavorites(newValue){
         if(this.$route.name == "favorites" && !newValue){
            this.$root.$emit("REFRESH-FAVORITE");
         }
     } 
  },
  mounted(){
     
  },
  created(){
    if(this.$route.name == "favorites"){
        this.isFavorites = true;
    }else{
        this.isFavorites = this.cardData.isFavorite;
    }
  },
  methods:{
      async addToFavorite(){
        let response = await this.$store.dispatch('addToFavorites', {
            id: this.cardData.id        
        });
        this.updateFevorite(response, true);
      },
      async removeToFavorite(){
        let response = await this.$store.dispatch('removeToFavorites', {
            id: this.cardData.id       
        });
        this.updateFevorite(response, false)
      },
      updateFevorite(response, isAdd){
        let responseData = response.data.data;
        this.isFavorites = (isAdd)? responseData.favoritePokemon.isFavorite: responseData.unFavoritePokemon.isFavorite;
      },
      playSound(){
          if(this.isDetailsView && this.cardData.sound){
            var audio = new Audio(this.getSoundSource);
            audio.play();
          }
      }
  },  
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
.brd{
    border: 1px solid #D0D0D0;   
}
img.fav-icon{
    width:20px;
    height:20px;
    cursor: pointer;            
}
.m-alternate{
    margin:0.5rem 0 0 0 !important;
}
.details-view{  
    img{
        &.card-img{
            width:300px;
            height:300px;  
            margin-top:16px;         
        }
         &.audio-img{
            width:50px;
            height:50px;
            cursor:pointer;
        }
    }
    .name-text{
        h6{
            font-size:18px;
            font-weight: bold;
        }
        label.card-types{
            font-size:16px;
        }
    }
}
.grid-view, .evaluation-view{    
    margin:5px;     
    img{
        &.card-img{
            width:150px;
            height:150px;
            margin:16px;
        }
    }
    .name-text{
        h6{
            font-size:16px;
            font-weight: bold;
        }
        label.card-types{
            font-size:14px;
        }
    }
}
.list-view{
    img{
        &.card-img{
            width: 70%;
            height: 50px;
            margin: 0px;         
        }
        &.fav-icon{
            width:20px;
            height:20px;
            padding-right:20px;
            cursor: pointer;            
        }
    }
    .name-text{
        h6{
            font-size:14px;
            font-weight: bold;
        }
        .card-types{
            font-size:12px;
            margin:0 !important;
            padding:0;
        }
    }
}
</style>