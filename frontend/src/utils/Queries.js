

/*************************************************
 * Get all matching pokemon by qeury inputs values
**************************************************/

export const POKENMON_BY_NAME_QUERY = `query pokemonByName($name: String!){    
    pokemonByName(name: $name){
        id
        name
        image
        types
        isFavorite
        weight {
          minimum
          maximum
        }
        weight {
          minimum
          maximum
        }
        height {
            minimum
            maximum
        }
        maxCP
        maxHP
        sound
        evolutions {
          id
          name
          image
          isFavorite
        }   
    }
}`;

/*************************************************
 * Get all matching pokemon by qeury inputs values
**************************************************/

export const ALL_POKENMONS_QUERY = `query pokemons($limit: Int!, $search: String!, $type: String!){    
        pokemons(
          query: {     
           limit: $limit, 
           search: $search,
           filter:{
             type: $type             
           }
         }){
        edges{
            id
            name
            image
            types
            isFavorite
            weight {
              minimum
              maximum
            }
            weight {
              minimum
              maximum
            }
            height {
                minimum
                maximum
            }
            maxCP
            maxHP
            sound
            evolutions {
              id
              name
              image
              isFavorite
            }  
        }
       }
}`;

/*************************************************
 * Get all favorite pokemon by qeury inputs values
**************************************************/

export const ALL_FAV_POKENMONS_QUERY = `query pokemons($limit: Int!, $search: String!, $type: String!, $fav: Boolean!){    
    pokemons(
      query: {     
       limit: $limit, 
       search: $search,
       filter:{
         type: $type,
         isFavorite: $fav
       }
     }){
    edges{
       id
       name
       image
       types
       isFavorite
    }
   }
}`;

/*************************************************
 * Get all Pokemon types
**************************************************/

export const POKENMON_TYPES_QUERY = `query pokemonTypes(){
    pokemonTypes
}`;

/*************************************************
 * Add to Favorites
**************************************************/

export const ADD_TO_FAVORITES_QUERY = `mutation favoritePokemon($id: ID!){
    favoritePokemon(id: $id){
       id
       name
       image
       types
       isFavorite
    }
}`;

/*************************************************
 * Remove to Favorites
**************************************************/

export const REMOVE_TO_FAVORITES_QUERY = `mutation unFavoritePokemon($id: ID!){
    unFavoritePokemon(id: $id){
       id
       name
       image
       types
       isFavorite
    }
}`;