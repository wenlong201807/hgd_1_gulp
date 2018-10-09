$(function () {
	var arr = ["img/1.jpg", "img/2.jpg", "img/3.jpg"];
	var arr2 = ["img/111.jpg", "img/222.jpg", "img/333.jpg"];

	// 遍历所有小图导航的点击事件
	$(".small img").each(function (i) {
		$(this).click(function () {
			$(".middle img").attr("src", arr[i])
			$(".big img").attr("src", arr2[i])
			$(".small img").removeClass("active")
			$(this).addClass("active")
		})

		// 鼠标移入事件
		$(".middle").mousemove(function (e) {
			var ev = e || window.event
			$(".big").css('display', 'block')
			var ot = ev.clientY - ($(".middle").offset().top - $(document).scrollTop()) -$('.loupe').innerWidth()/2;
			var ol = ev.clientX - ($(".middle").offset().left - $(document).scrollLeft()) -$('.loupe').innerHeight()/2;

			// 放大镜有效区域判断
			if (ol <= 0) {
				ol = 0;
			}
			if (ot <= 0) {
				ot = 0;
			}
			if (ol >=$('.loupe').innerWidth()) {
				ol = $('.loupe').innerWidth()
			}
			if (ot >= $('.loupe').innerHeight()) {
				ot =$('.loupe').innerHeight()
			}
			$(".loupe").css({
				'left': ol,
				'top': ot
			})
			var ott = ot / $('.middle img').innerWidth() * $('.big img').innerWidth()
			var oll = ol / $('.middle img').innerHeight() * $('.big img').innerHeight()
			$(".big img").css({
				'left': -oll,
				'top': -ott
			})
		})
		$(".middle").mouseout(function () {
			$(".big").css('display', 'none')
		})

	})
})