
document.getElementById('mobile-search-btn').addEventListener('click', function(e){
  e.preventDefault();
  var el = document.getElementById('mobile-search');
  el.style.display = (el.style.display === 'none' ? 'block' : 'none');
});

//-----------------Slider------------//

(function(){
  const viewport = document.getElementById('viewport');
  const track = document.getElementById('track');
  const next = document.getElementById('nextBtn');
  const prev = document.getElementById('prevBtn');

  function getStep(){
    const firstCard = track.querySelector('.card');
    if(!firstCard) return 200;
    const rect = firstCard.getBoundingClientRect();

    const gap = parseInt(getComputedStyle(track).gap) || 16;
    return Math.round(rect.width + gap);
  }

  function scrollByStep(dir=1){
    viewport.scrollBy({left: dir*getStep(), behavior:'smooth'});

    const maxScroll = track.scrollWidth - viewport.clientWidth;
    setTimeout(()=>{
      if(viewport.scrollLeft >= maxScroll - 2){
        viewport.scrollTo({left:0, behavior:'smooth'});
      }
    }, 350);
  }

  next.addEventListener('click', ()=>scrollByStep(1));
  prev.addEventListener('click', ()=>scrollByStep(-1));

  let timer = setInterval(()=>scrollByStep(1), 3000);


  viewport.addEventListener('mouseenter', ()=>clearInterval(timer));
  viewport.addEventListener('mouseleave', ()=>{ timer = setInterval(()=>scrollByStep(1), 3000); });


  function adjustForSeven(){
    const vw = viewport.clientWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 16;
    const visible = 7; 
    const cardW = Math.floor((vw - gap*(visible-1)) / visible);
    if(window.innerWidth >= 1200){
      document.documentElement.style.setProperty('--card-w', cardW+'px');
    }
  }
  window.addEventListener('resize', adjustForSeven);
  window.addEventListener('load', adjustForSeven);
})();