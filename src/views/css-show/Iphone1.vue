<template>
  <div class="page">
    <h2>
      Superfast wireless
      <p>Hello 5G.</p>
    </h2>

    <div id="iphone">
      <div id="hardware" />
      <div id="ui">
        <img
          src="https://assets.codepen.io/2002878/iphone12-5g_top_ui.jpg"
          class="top-ui"
          alt=""
        >
        
        <ul>
          <li>
            <img src="https://assets.codepen.io/2002878/iphone12-5g_show_01.jpg">
          </li>
          <li>
            <img src="https://assets.codepen.io/2002878/iphone12-5g_show_02.jpg">
          </li>
          <li>
            <img src="https://assets.codepen.io/2002878/iphone12-5g_show_03.jpg">
          </li>
          <li>
            <img src="https://assets.codepen.io/2002878/iphone12-5g_show_04.jpg">
          </li>
          <li>
            <img src="https://assets.codepen.io/2002878/iphone12-5g_show_05.jpg">
          </li>
          <li>
            <img src="https://assets.codepen.io/2002878/iphone12-5g_show_06.jpg">
          </li>
          <li>
            <img src="https://assets.codepen.io/2002878/iphone12-5g_show_07.jpg">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>

onMounted(() => {
  const rows = document.querySelectorAll('#ui ul li');
  const html = document.documentElement;

  document.addEventListener('scroll', (e) => {
    const scrolled = html.scrollTop / (html.scrollHeight - html.clientHeight);
    
    const total =  1 / rows.length;
    
    for (const [index, row] of rows.entries()) {
      const start = total * index;
      const end = total * (index + 1);
      
      let progress = (scrolled - start) / (end - start);
      if (progress >= 1) progress = 1;
      if (progress <= 0) progress = 0;
      
      row.style.setProperty('--progress', progress);
    }
  });
});
</script>

<style lang="sass">
.page
  display: flex
  flex-direction: column
  align-items: center
  font-size: 15px
  background-color: #000
  margin: 0
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  min-height: 100vh
  font-family: Helvetica
  padding: 4rem 0


h2
  color: #6e6e73
  text-align: center
  font-size: 4.5rem
  font-weight: 600
  margin: 6rem 0


h2 p
  margin: 0
  color: #fff


#iphone
  position: relative
  width: 770px
  height: 1336px


#hardware
  width: 100%
  height: 100%
  background-image: url(https://assets.codepen.io/2002878/iphone12-5g_on_phone.jpg)
  background-size: 770px 1336px
  
  mask-image: url(https://assets.codepen.io/2002878/iphone12-5g_on_phone_mask.png)
  -webkit-mask-image: url(https://assets.codepen.io/2002878/iphone12-5g_on_phone_mask.png)
  
  mask-size: 770px 1336px
  -webkit-mask-size: 770px 1336px
  


#ui
  position: absolute
  top: 0
  left: 50%
  transform: translateX(-50%)


#ui .top-ui
  display: block
  width: 640px
  height: auto
  margin: 70px auto 0
  padding-bottom: 30px
  border-bottom: 1px solid #222


#ui ul
  list-style: none
  margin: 0
  padding: 0
  
  --progress: 0


#ui ul li img
  display: block
  width: 640px
  height: auto
  margin: 10px auto
  padding-bottom: 10px
  border-bottom: 1px solid #222
  transform: scale(calc(1.8 - (0.8 * var(--progress)))) translateY(calc(-60px * (1 - var(--progress))))
  opacity: var(--progress)

</style>
