
import Vue from "vue";
import Vuex from "vuex";
import { ENDPOINT, useAxios } from "./utils/Axios.js";
import { 
  ADD_TO_FAVORITES_QUERY, 
  REMOVE_TO_FAVORITES_QUERY, 
  POKENMON_TYPES_QUERY, 
  ALL_POKENMONS_QUERY,
  ALL_FAV_POKENMONS_QUERY,
  POKENMON_BY_NAME_QUERY
} from "./utils/Queries.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    responseData:{},
    types:{},
    selectedCard:{},
    isListView: false
  },
  mutations: {
    SET_CONTENT(state, data){
      state.content = data
    },
    SET_RESPONSE_DATA(state, data){
      state.responseData = data;
    },
    SET_FILTERS(state, data){
      state.filters = data;
    },
    SET_TYPES(state, data){
      state.types = data;
    },
    SET_SELECTED_CARD(state, data){
      state.selectedCard = data;
    },
    SET_LIST_VIEW(state, data){
      state.isListView = data;
    },
  },
  actions: {
    setContent({ commit }, payload){
      commit('SET_CONTENT', payload)
    },
    setFilters({ commit }, payload){
      commit('SET_FILTERS', payload)
    },
    setListView({ commit }, payload){
      commit('SET_LIST_VIEW', payload)
    },
    async getCardCategory({commit, dispatch}){
      try{
          const responseData = await useAxios.post(ENDPOINT, {
            query: `{ pokemonTypes }`           
          });
          const resultData = await responseData.data.data;
          if(resultData){
            commit('SET_TYPES', resultData)
          }
        }catch (err){
          return err;
        }
    },
    async fetchPokemonsByName({commit, dispatch}, inputs){   
      try{
        let { name } = inputs;
        let resultData = [] 
        let responseData = {}
          responseData = await useAxios.post(ENDPOINT, {
            query: POKENMON_BY_NAME_QUERY,
            variables: {
              name: name
            }
          });        
          resultData.push(responseData.data.data.pokemonByName);
          if(resultData){
            commit('SET_SELECTED_CARD', resultData)
          }
        }catch (err){
          return err;
        }
    }, 
    async searchAllPokemons({commit, dispatch}, inputs){   
      try{
        let { limit, search, type, fav } = inputs;

        let resultData ={} 
        let responseData = {}
        if(typeof fav !== "undefined"){
          responseData = await useAxios.post(ENDPOINT, {
            query: ALL_FAV_POKENMONS_QUERY,
            variables: {
              limit: limit,
              search: search,
              type: type,
              fav: fav
            }
          });
        }else{
          responseData = await useAxios.post(ENDPOINT, {
            query: ALL_POKENMONS_QUERY,
            variables: {
              limit: limit,
              search: search,
              type: type             
            }
          });
        }
          resultData = responseData.data.data.pokemons.edges;
         
          if(resultData){
            commit('SET_RESPONSE_DATA', resultData)
          }
        }catch (err){
          return err;
        }
    },  
    async addToFavorites({commit, dispatch}, cardId){   
      try{
          return await useAxios.post(ENDPOINT, {
            query: ADD_TO_FAVORITES_QUERY,
            variables: {
              id: cardId.id
            }
          });          
        }catch (err){
          return err;
        }
    },
    async removeToFavorites({commit, dispatch}, cardId){   
      try{
          return await useAxios.post(ENDPOINT, {
            query: REMOVE_TO_FAVORITES_QUERY,
            variables: {
              id: cardId.id
            }
          });          
        }catch (err){
          return err;
        }
    }
  },
  getters:{     
    getCardTypes: state => state.types,
    getAllCards: state => state.responseData,
    getSelectedCard: state => state.selectedCard,
    getEvaluation: state => state.selectedCard.evolutions,
    getViewStatus: state => state.isListView
  }
});

export default store;