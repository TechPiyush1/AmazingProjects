const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function firstPageAnimation()
{
  var t1=gsap.timeline();

  t1.from("#navbar",{
    y:-10,
    opacity:0,
    duration:1.5,
    ease:Expo.easeInOut,

  })  
  .to(".bound-elem",{
    y:0,
    duration:1.5,
    ease:Expo.easeInOut,
    stagger:.2,

  })  
  .from("#section-footer",{
    y:-10,
    opacity:0,
    duration:.5,
    ease:Expo.easeInOut,
  });
}

function followMouse(xscale,yscale){
  window.addEventListener("mousemove",(gets)=>{
document.querySelector("#minicircle").style.transform=`translate(${gets.clientX}px,${gets.clientY}px)  scale(${xscale},${yscale})`;
  });
}


function mouseskew(){
  var scaleX=1;
  var scaleY=1;

  var xprev=0;
  var yprev=0;
  window.addEventListener("mousemove",function(details){
   
    clearTimeout(timeout);

    scaleX=gsap.utils.clamp(0.8,1.2,details.clientX-xprev);
    scaleY=gsap.utils.clamp(0.8,1.2,details.clientY-yprev);

    xprev=details.clientX;
    yprev=details.clientY;

    followMouse(scaleX,scaleY);

    timeout=setTimeout(() => {
      document.querySelector("#minicircle").style.transform= `translate(${details.clientX}px,${details.clientY}px)  scale(1,1)`;
    }, 100);
    
  })
}



firstPageAnimation();
mouseskew();


document.querySelectorAll(".element").forEach(element => {

  var rotate=0;
  var diffrot=0;
  

  element.addEventListener("mouseleave",function(details){

    gsap.to(element.querySelector("img"),{
      opacity:0,
      ease:Power3,
      duration:0.5,
    })
  })

  element.addEventListener("mousemove",function(details){
  var diff=details.clientY-element.getBoundingClientRect().top;
  diffrot=details.clientX-rotate;
  rotate=details.clientX;
  gsap.to(element.querySelector("img"),{
    opacity:1,
    ease:Power3,
    top:diff,
    left:details.clientX,
    rotate:gsap.utils.clamp(-20,20,diffrot*0.8),
  })
})

});
