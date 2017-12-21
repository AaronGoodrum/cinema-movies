<template>
  <div id="movie-list">
    <h3>{{msg}}</h3>
    <div id="overview">
      <div id="main">
        <movie-list></movie-list>
        <movie-filter></movie-filter>
      </div>
    </div>    
  </div>  
</template>

<script>
export default {
  name: 'movie-list',
  data () {
    return{ 
      msg: 'Welcome to Cinema Movies'
    }
  }
}
</script>
