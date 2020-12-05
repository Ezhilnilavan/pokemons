<!-- *********************************************
Filter component contains all search inputs fields  
**************************************************-->

<template>
<div class="container br-bottom">
    <div class="row no-gutters m-1 mb-2">
        <div class="col-md-12 mx-auto">
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 ">
                    <input autocomplete="off" type="text" class="form-control" v-model="searchNameValue" id="inputFirstname" placeholder="Search">
                </div>
                <div class="col-sm-8 col-md-4 col-lg-4">
                    <select class="form-control" v-model="searchTypeValue">
                        <option value="">All</option>   
                        <option v-for="(types, index) in pokemonTypes" :key="index" :value="types">{{types}}</option>
                    </select>
                </div>
                <div class="col-sm-2 col-md-1 col-lg-1 br-right">
                    <img class="toggle-view" title="List View" @click="listView()" src="../assets/list.png"/>
                </div>
                <div class="col-sm-2 col-md-1 col-lg-1">
                    <img class="toggle-view"  title="Grid View" @click="gridView()" src="../assets/grid.png"/>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Filters",  
  props: {
    
  },
  data(){
      return{
         searchNameValue: "",
         searchTypeValue: ""
      }
  },
  async created(){
    await this.$store.dispatch('getCardCategory');
  },
  computed:{   
     ...mapGetters({
      getCardTypes: 'getCardTypes'
    }),
    pokemonTypes(){
        return this.getCardTypes.pokemonTypes;
    }     
  },
  watch:{
      searchNameValue:{
          handler:'triggerFilterChange',
          immediate:true
      },
      searchTypeValue(){
          this.triggerFilterChange()
      }      
  },
  methods:{
      triggerFilterChange(){
          this.$root.$emit("TYPE-CHANGE-EVENT", {
              name: this.searchNameValue,
              types: this.searchTypeValue
          })
      },
      gridView(){
          location.reload();
      },
      listView(){               
        this.$store.dispatch('setListView', true);
      }
  }
};
</script>

<style scoped lang="scss">
    input, select{
        width:100%;       
        border:0px;
        background-color:#EEEEEE;
    }
    .br-right{
        border-right:0.5px dotted #D0D0D0;
    }
    img.toggle-view{
        cursor:pointer;
        width:40px;
        height:40px;
        &:hover{
            border:1px dotted #D0D0D0;
        }
    }
</style>
