$(document).ready(function () {
  $(".gnb>li>a").on("click", function (e) {
    console.log(this.hash);
    // let hash = this.hash;
    e.preventDefault();
    if (this.hash !== "") {
      let hash = this.hash;
      console.log(hash)
      // $(window).scrollTop();
      // $("#about").offset().top  = let topSec = $(hash).offset().top
      // console.log(offset)
      $("html,body").animate({
        scrollTop: $(hash).offset().top

      }, 800)
    }
  })


  $(window).resize(function () {
    resizeable()
  })

  function resizeable() {
    if ($(window).width() < 768) {
      console.log("모바일에서 실행될 스크립트")
    } else if ($(window).width() < 1200) {
      console.log("태블릿에서 실행될 스크립트")
    } else {
      console.log("데스크탑에서 실행될 스크립트")
    }
  }
  resizeable()


 // 배경
  const positions = [
    { x: 20, y: 30, dx: 0.1, dy: 0.07, color: '#bbd5f1ff' },
    { x: 80, y: 70, dx: 0.07, dy: 0.1, color: '#cee6ffff' },
    { x: 30, y: 40, dx: 0.03, dy: 0.05, color: '#fff' },
    { x: 50, y: 50, dx: 0.05, dy: 0.06, color: '#fff' }
  ];

  function updateBackground() {
    positions.forEach(pos => {
      pos.x += pos.dx;
      pos.y += pos.dy;

      // 경계 반전
      if (pos.x > 80 || pos.x < 20) pos.dx = -pos.dx;
      if (pos.y > 80 || pos.y < 20) pos.dy = -pos.dy;
    });

    const bg = positions.map(pos =>
      `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${pos.color}, transparent 70%)`
    ).join(',');

    // body와 #project 둘 다 배경 적용
    // const project = document.getElementById("project");

    document.body.style.background = bg;
    document.body.style.backgroundBlendMode = "screen";

    // if (project) {
    //   project.style.background = bg;
    //   project.style.backgroundBlendMode = "screen";
    // }

    requestAnimationFrame(updateBackground);
  }

  updateBackground();


 //work
  function initInkEffect(sectionId) {
    const section = document.getElementById(sectionId);

    // 캔버스 생성 및 삽입
    const canvas = document.createElement('canvas');
    section.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = section.clientWidth * ratio;
      canvas.height = section.clientHeight * ratio;
      canvas.style.width = section.clientWidth + 'px';
      canvas.style.height = section.clientHeight + 'px';
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    window.addEventListener('resize', resize);
    resize();

    class InkCircle {
      constructor(x, y, maxRadius, color, growSpeed, fadeSpeed) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = maxRadius;
        this.color = color;
        this.growSpeed = growSpeed;
        this.fadeSpeed = fadeSpeed;
        this.opacity = 0.5;
      }

      update() {
        if (this.radius < this.maxRadius) this.radius += this.growSpeed;
        if (this.opacity > 0) this.opacity -= this.fadeSpeed;
      }

      draw(ctx) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, this.radius * 0.1,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      isDone() {
        return this.opacity <= 0;
      }
    }

    const colors = [
      { r: 100, g: 190, b: 270 },
      { r: 190, g: 220, b: 240 },
      { r: 150, g: 180, b: 230 },
      { r: 190, g: 220, b: 240 }
    ];

    let inkCircles = [];
    let overlayOpacity = 0;

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    function createInkCircles() {
      const count = Math.floor(random(1, 4));
      for (let i = 0; i < count; i++) {
        const x = random(0, canvas.width);
        const y = random(0, canvas.height);
        const maxRadius = random(2000, 4000);
        const color = colors[Math.floor(random(0, colors.length))];
        const growSpeed = random(1.0, 2.0);
        const fadeSpeed = random(0.001, 0.0025);

        inkCircles.push(new InkCircle(x, y, maxRadius, color, growSpeed, fadeSpeed));
      }
    }

    setInterval(createInkCircles, 1200);

    function animate() {
      if (overlayOpacity > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${overlayOpacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        overlayOpacity -= 0.02;
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      ctx.globalCompositeOperation = 'multiply';

      for (let i = inkCircles.length - 1; i >= 0; i--) {
        const ink = inkCircles[i];
        ink.update();
        ink.draw(ctx);
        if (ink.isDone()) inkCircles.splice(i, 1);
      }

      ctx.globalCompositeOperation = 'source-over';
      requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        inkCircles = [];
        overlayOpacity = 1;
      }
    });
  }
  initInkEffect("work");

  // work
  const text = document.querySelector(".text");
  const work = document.querySelector("#work");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        text.classList.add("active");
      } else {
        text.classList.remove("active");
      }
    });
  }, { threshold: 0.2,});

  observer.observe(work);


 






//Work 
window.onload = function() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close_btn");
  const images = document.querySelectorAll(".work_img img");

  let scale = 1;
  let isDragging = false;
  let startX, startY;
  let translateX = 0, translateY = 0;

  images.forEach(img => {
    img.onclick = function() {
      modal.style.display = "flex";
      modalImg.src = this.src;
      document.body.style.overflow = "hidden"; 
      resetImage();
    };
  });

  function resetImage() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
  }

  function updateTransform() {
    modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  
  modal.onwheel = function(e) {
    e.preventDefault();
    const delta = e.deltaY;
    if (delta > 0) {
      scale = Math.max(0.5, scale - 0.2);
    } else {
      scale = Math.min(8, scale + 0.2);
    }
    updateTransform();
  };

  
  modalImg.onmousedown = function(e) {
    if (scale <= 1) return; 
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    modalImg.style.transition = "none";
  };

  
  window.onmousemove = function(e) {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
  };

  
  window.onmouseup = function() {
    isDragging = false;
    modalImg.style.transition = "transform 0.1s ease-out";
  };

  
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    resetImage();
  }

  closeBtn.onclick = closeModal;

};




}) //jquery end