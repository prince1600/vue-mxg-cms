<template>
  <div>
    <h1>欢迎使用综合管理系统</h1>
    <div class="bear"></div>
    <div class="bgp1"></div>
    <div class="bgp2"></div>
    <div class="bgp3"></div>
    <div class="bgp4"></div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin: 50px auto;
  color: rgba(50, 55, 59, 0.952);
}
body {
  width: 1366px;
  height: 762px;
  background-color: rgb(54, 51, 51) !important;
}
@keyframes run {
  100% {
    background-position: 0 0;
  }
}
@keyframes forward {
  0% {
    left: 0;
  }
  100% {
    left: 50%;
    transform: translate(-50%, 0);
  }
}
@keyframes mountain_move {
  100% {
    background-position: 0 0;
  }
}
.bear {
  position: fixed;
  top: 500px;
  z-index: 3;
  width: 200px;
  height: 100px;
  background: url(../../assets/media/bear.png) 1600px 0;
  animation: forward 3s linear forwards, run 0.5s steps(8) infinite;
}
div[class^="bgp"] {
  position: fixed;
  top: 300px;
  width: 1366px;
  height: 336px;
  margin: 0 auto;
}
.bgp1 {
  z-index: 2;
  background: url(../../assets/media/bg1.png) 3840px 0;
  animation: mountain_move 15s linear infinite;
}
body .bgp2 {
  top: 280px;
  z-index: 1;
  background: url(../../assets/media/bg2.png) 3840px 0;
  opacity: 0.7;
  animation: mountain_move 20s linear infinite;
}
body .bgp3 {
  top: 220px;
  z-index: 0;
  background: url(../../assets/media/bg3.png) 3840px 0;
  opacity: 0.3;
  animation: mountain_move 40s linear infinite;
}
body .bgp4 {
  top: 200px;
  z-index: -1;
  background: url(../../assets/media/bg4.png) 3840px 0;
  opacity: 0.2;
  animation: mountain_move 60s linear infinite;
}
</style>