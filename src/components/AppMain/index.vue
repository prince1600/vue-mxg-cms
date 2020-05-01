<template>
  <div class="main">
    <main-title  v-show="$route.path!=='/home'"></main-title>
    <router-view></router-view>
  </div>
</template>
<script>
import MainTitle from './title.vue'
export default {
    components: {MainTitle}
}
</script>

