document.addEventListener("DOMContentLoaded", () => {
  console.log("script loaded");
  if (typeof duasData === "undefined") {
    console.error("duasData missing — ensure duas.js loads before script.js");
    const dt = document.getElementById("duaText");
    if (dt) dt.textContent = "خطأ: بيانات الأدعية غير محمّلة.";
    return;
  }

  const cats = document.querySelectorAll(".category-btn");
  const duaText = document.getElementById("duaText");
  const nextBtn = document.getElementById("nextBtn");
  const titleEl = document.getElementById("duaTitle");

  let currentCategory = "دعاء للمتوفي";
  let currentIndex = 0;

  function renderDua() {
    const arr = duasData[currentCategory] || [];
    if (!arr.length) {
      duaText.innerHTML = "لا توجد أدعية لهذه الفئة الآن.";
      duaText.classList.add("show");
      nextBtn.style.display = "none";
      return;
    }

    duaText.classList.remove("show");
    setTimeout(() => {
      duaText.textContent = arr[currentIndex];
      duaText.classList.add("show");
      titleEl.textContent = currentCategory;
    }, 200);
  }


  function nextDua() {
    const arr = duasData[currentCategory] || [];
    if (!arr.length) return;

    currentIndex++;
    if (currentIndex >= arr.length) {
      // show ended state with restart button
      duaText.classList.remove("show");
      setTimeout(() => {
        duaText.innerHTML = `🌸 انتهت الأدعية لهذه الفئة<br><button id="restartBtn" class="btn-next mt-3">إعادة البداية</button>`;
        duaText.classList.add("show");
        nextBtn.style.display = "none";

     
        setTimeout(() => {
          const restart = document.getElementById("restartBtn");
          if (restart) restart.addEventListener("click", () => {
            currentIndex = 0;
            nextBtn.style.display = "inline-block";
            renderDua();
          });
        }, 80);
      }, 220);
    } else {
      renderDua();
    }
  }


  cats.forEach(btn => {
    btn.addEventListener("click", () => {
      cats.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.textContent.trim();
      currentIndex = 0;
      nextBtn.style.display = "inline-block";
      renderDua();
      
      document.querySelector(".dua-card")?.scrollIntoView({behavior:"smooth", block:"center"});
    });
  });


  nextBtn.addEventListener("click", nextDua);

  renderDua();


  console.log("categories:", Object.keys(duasData));
});

