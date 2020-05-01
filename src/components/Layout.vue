<template>
    <div>
        <app-header></app-header>
        <app-navbar></app-navbar>
        <app-main></app-main>     
    </div>
</template>
<script>
import AppHeader from './AppHeader'
import AppNavbar from './AppNavbar'
import AppMain from './AppMain'
export default {
    components: {
        AppHeader,
        AppNavbar,
        AppMain
    }
}
</script>
<style scoped>
    .header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        line-height: 50px;
        background-color: rgba(46, 33, 88, 0.904);
    }
    .navbar {
        position: absolute;
        width: 230px;
        top: 50px;
        bottom: 0;
        background-color: rgb(84, 92, 100);
        overflow-y: auto;

    }
    .main {
        position: absolute;
        top: 50px;
        left: 230px;
        right: 0;
        bottom: 0;
        /* background-color: skyblue; */
        padding: 10px;
    }
</style>