/* ============================================================
 *  NGÀY PHỤ NỮ VIỆT NAM 20/10 — Thiệp chúc mừng
 *  Chạy trực tiếp, không cần server
 * ============================================================ */
(function () {
  "use strict";

  var envelope = document.getElementById("envelope");
  var letter = document.getElementById("letter");
  var sealBtn = document.getElementById("sealBtn");
  var openBtn = document.getElementById("openBtn");
  var openCardBtn = document.getElementById("openCardBtn");
  var confettiBtn = document.getElementById("confettiBtn");
  var replayBtn = document.getElementById("replayBtn");
  var toast = document.getElementById("toast");
  var petalsBox = document.getElementById("petals");

  var opened = false;

  /* ---------- Cánh hoa rơi ---------- */
  function createPetals() {
    var colors = ["#fff", "#f7c9d3", "#e4637a", "#f2a5b8", "#d9a441"];
    var count = window.innerWidth < 600 ? 14 : 26;

    for (var i = 0; i < count; i++) {
      var petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.animationDuration = 7 + Math.random() * 8 + "s";
      petal.style.animationDelay = -Math.random() * 15 + "s";
      petal.style.background =
        "linear-gradient(135deg, #fff 0%, " + colors[i % colors.length] + " 100%)";
      var size = 9 + Math.random() * 11;
      petal.style.width = size + "px";
      petal.style.height = size + "px";
      petalsBox.appendChild(petal);
    }
  }

  /* ---------- Mở phong bì ---------- */
  function openCard() {
    if (opened) return;
    opened = true;

    envelope.classList.add("is-open");

    // ẩn phong bì sau khi tờ thư trồi ra
    setTimeout(function () {
      envelope.classList.add("is-hidden");
    }, 900);

    setTimeout(function () {
      letter.classList.add("is-visible");
      letter.setAttribute("aria-hidden", "false");
    }, 1500);
  }

  sealBtn.addEventListener("click", openCard);
  openBtn.addEventListener("click", openCard);
  openCardBtn.addEventListener("click", openCard);
  envelope.addEventListener("click", openCard);

  /* ---------- Pháo giấy ---------- */
  function fireConfetti(amount) {
    var colors = ["#e4637a", "#f7c9d3", "#d9a441", "#fff1f4", "#a32c44", "#ffb3c6"];
    var frag = document.createDocumentFragment();

    for (var i = 0; i < amount; i++) {
      var p = document.createElement("div");
      p.className = "confetti";
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = 2 + Math.random() * 2.2 + "s";
      p.style.setProperty("--drift", (Math.random() * 200 - 100) + "px");
      p.style.animationDelay = Math.random() * 0.6 + "s";
      p.style.transform = "rotate(" + Math.random() * 360 + "deg)";
      frag.appendChild(p);

      (function (el) {
        setTimeout(function () {
          el.remove();
        }, 5200);
      })(p);
    }

    document.body.appendChild(frag);
  }

  function showToast() {
    toast.classList.add("is-show");
    setTimeout(function () {
      toast.classList.remove("is-show");
    }, 2600);
  }

  confettiBtn.addEventListener("click", function () {
    fireConfetti(70);
    showToast();
  });

  /* ---------- Mở lại từ đầu ---------- */
  replayBtn.addEventListener("click", function () {
    opened = false;
    fireConfetti(30);

    letter.classList.remove("is-visible");
    letter.setAttribute("aria-hidden", "true");

    setTimeout(function () {
      envelope.classList.remove("is-hidden", "is-open");
      setTimeout(openCard, 420);
    }, 600);
  });

  /* ---------- Bàn phím ---------- */
  document.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && !opened) {
      e.preventDefault();
      openCard();
    }
  });

  /* ---------- Khởi tạo ---------- */
  createPetals();
})();