<template>
  <div class="page">
    <div id="sticky">
      <canvas
        id="iphone-se"
        width="432"
        height="976"
      />
      
      <div id="loading">
        <p>iPhone SE packs our most powerful chip into our most popular size at our most affordable price. It’s just what you’ve been waiting for.</p>
      </div>
      
      <p class="left">
        Durable glass and<br>aluminum design
      </p>
      
      <p class="right">
        Brilliant 4.7”<br>Retina HD<br>display
      </p>
    </div>
  </div>
</template>

<script setup>
// $(function () {
//   $('#iphone-se').height($(window).height());
// });

// $(window).on('scroll', function () {
//   const scrolled = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
  
//   const frame = Math.ceil(scrolled * 84);
//   changeFrame(frame);
  
//   moveDevice($('#iphone-se'), scrolled, 0.3, 0.6, 0.6, 1);
  
//   showHideText($('.left'), scrolled, 0.45, 0.52, 0.58, 0.65);
//   showHideText($('.right'), scrolled, 0.9, 1);
// });

// const loader = new PxLoader();
// const images = [];

// for (let i = 0; i < 85; i++) {
//   images[i] = loader.addImage(`https://s3-us-west-2.amazonaws.com/s.cdpn.io/2002878/iphone-se.${('0' + (i + 1)).slice(-2)}.png`);
// }

// loader.addCompletionListener(function () {
//   const context = $('#iphone-se')[0].getContext('2d');
  
//   $('body').addClass('loaded');
  
//   context.drawImage(images[0], 0, 0, 432, 976);
  
//   setTimeout(() => {
//     $("html, body").animate({ scrollTop: 2500 }, 2500);
      
//     setTimeout(() => {
//       $("html, body").animate({ scrollTop: 5000 }, 2500);
//     }, 3000);
//   }, 3000);
// });

// loader.start();

// function changeFrame(frame) {
//   let index = frame - 1;
//   if (index < 0) index = 0;
//   if (index > 84) index = 84;
  
//   const context = $('#iphone-se')[0].getContext('2d');
//   context.drawImage(images[index], 0, 0, 432, 976);
// }

// function moveDevice(el, current, toLeftFrom, toLeftTo, toRightFrom, toRightTo) {
//   if (current <= toLeftTo) {
//     if (current >= toLeftFrom) {
//       const offsetRatio = (current - toLeftFrom) / (toLeftTo - toLeftFrom);
//       $(el).css('left', $(el).width() / 2 * -1 * offsetRatio);
//     }
//   } else {
//     const offsetRatio = (current - toRightFrom) / (toRightTo - toRightFrom);
//     $(el).css('left', $(el).width() / 2 * -1 + $('#iphone-se').width() * offsetRatio);
//   }
// }

// function showHideText(el, current, showFrom, showTo, hideFrom, hideTo) {
//   if (current < showFrom) {
//     $(el).css('opacity', 0);
//   }
  
//   if (current >= showFrom && current <= showTo) {
//     $(el).css('opacity', (current - showFrom) / (showTo - showFrom));
//   }
  
//   if (typeof hideFrom !== 'undefined' && typeof hideTo !== 'undefined') {
//     if (current > hideFrom && current <= hideTo) {
//       $(el).css('opacity', (hideTo - current) / (hideTo - hideFrom));
//     }

//     if (current > hideTo) {
//       $(el).css('opacity', 0);
//     }
//   }
// }
</script>

<style lang="sass">
body
  margin: 0
  background-color: #131313


body.loaded
  height: 5000px


#sticky
  position: sticky
  top: 0
  height: 100vh
  display: flex
  justify-content: center
  align-items: center


canvas
  position: relative
  margin-top: -100px


p.left, p.right
  font-size: 28px
  color: #fff
  font-family: Helvetica
  font-weight: bold
  position: absolute
  top: 45%
  opacity: 0


p.left
  left: 50%


p.right
  right: 50%


#loading
  font-size: 28px
  font-family: Helvetica
  color: #fff
  position: absolute
  width: 45vw
  text-align: center
  z-index: 10
  font-weight: bold
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2002878/iphone-se.01.png') no-repeat center center
  background-size: contain
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  margin-top: -50px
  transition: .5s opacity ease-in-out
  transition-delay: 2s


#loading p
  margin-top: 40%


body.loaded #loading
  opacity: 0

</style>

