<template>
  <div class="favorites">
    <Board :isDetailMode="isDetailMode"></Board>
  </div>
</template>

<script>
import Board from "@/components/Board.vue";

export default {
  name: "Favorites",
  components: {  
    Board
  },
  data(){
    return{     
      isDetailMode: true
    }
  }
};
</script>
