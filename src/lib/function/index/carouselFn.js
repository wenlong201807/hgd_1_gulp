// 初始化轮播图效果
function initCarousel() {
  $('.carousel-content').carousel({
    carousel: '.carousel', // 轮播图容器
    indexContainer: '.img-index', // 下标容器
    timing: 3000, // 自动播放间隔
    animateTime: 700, // 动画时间
    autoPlay: true, // 是否自动播放 true/false
    direction: 'left' // 滚动方向 right/left
  });
}

define([], function() {
  return {
    // nava: nava
    carou: carou
  };
});
