var swiper = new Swiper('.swiper-container', {
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev'
	},
	slidesPerView: 0,
	spaceBetween: 0,

    

  
	breakpoints: {
	  20: {
		slidesPerView: 2,
		spaceBetween: 30,
	  
	  },
      815: {
		slidesPerView: 3,
		spaceBetween: 10,
	  },

	  1010: {
		slidesPerView: 4,
		spaceBetween: 10,
	  },
	} 
    });