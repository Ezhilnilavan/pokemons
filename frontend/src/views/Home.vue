<template>
  <div class="home">    
    <Board :key="1"></Board> 
  </div>
</template>

<script>
// @ is an alias to /src
import Vuex from "vuex";
import { mapGetters,  mapActions} from 'vuex';
import Board from "@/components/Board.vue";

export default {
  name: "home",
  components: {    
    Board
  }  
};
</script>
