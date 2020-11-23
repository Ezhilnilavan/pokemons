<!-- **********************************
Tab component hold all page route links 
***************************************-->

<template>
  <div class="container" id="nav">
      <div class="row">
          <div class="col-md-12 mx-auto"> 
              <div class="row padding m-1"> 
                  <router-link class="col-sm-6 align-middle" to="/">All</router-link>
                  <router-link class="col-sm-6 align-middle" to="/favorites">Favorites</router-link>
              </div>            
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    display: Boolean
  }
};
</script>

<style scoped lang="scss">
#nav {
  vertical-align:top;
  a {
    font-weight: bold;
    text-decoration: none;
    color: #42b983;
    background-color: white;
    border:1px solid #71C1A1;
    padding:5px 0px;
    &.router-link-exact-active {
       color:white;
       background-color: #71C1A1;
    }
  }
}
</style>
