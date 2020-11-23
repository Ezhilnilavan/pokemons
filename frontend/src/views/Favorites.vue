<template>
  <div class="favorites default-height">
    <Board :key="2"></Board>
  </div>
</template>

<script>
import Board from "@/components/Board.vue";

export default {
  name: "Favorites",
  components: {  
    Board
  }
};
</script>
<style scoped lang="scss">
.default-height { 
    min-height: 100vh;   
}
</style>