$(document).ready(function () {
  $(window).bind('scroll', function () {
      var navHeight = $(window).height() - 70;
      if ($(window).scrollTop() > navHeight) {
          $('nav').addClass('fixed');
      } else {
          $('nav').removeClass('fixed');
      }
  });

  // Ajout de la classe 'active' à l'élément avec l'ID 'autoParagraph'
  const autoParagraph = document.getElementById('autoParagraph');
  if (autoParagraph) {
      autoParagraph.classList.add('active');
  }

  // Ouvrir le modal
  document.querySelectorAll('.open-modal').forEach(button => {
      button.addEventListener('click', function () {
          const modalId = this.getAttribute('data-modal');
          const modal = document.getElementById(modalId);
          if (modal) {
              modal.style.display = 'block';
          }
      });
  });

  // Fermer le modal
  document.querySelectorAll('.close').forEach(closeButton => {
      closeButton.addEventListener('click', function () {
          const modalId = this.getAttribute('data-modal');
          const modal = document.getElementById(modalId);
          if (modal) {
              modal.style.display = 'none';
          }
      });
  });

  // Fermer le modal en cliquant à l'extérieur
  window.addEventListener('click', function (event) {
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => {
          if (event.target === modal) {
              modal.style.display = 'none';
          }
      });
  });

  // ——————————————————————————————————————————————————
  // TextScramble
  // ——————————————————————————————————————————————————

  class TextScramble {
      constructor(el) {
          this.el = el;
          this.chars = "!<>-_\\/[]{}—=+*^?#________";
          this.update = this.update.bind(this);
      }
      setText(newText) {
          const oldText = this.el.innerText;
          const length = Math.max(oldText.length, newText.length);
          const promise = new Promise((resolve) => (this.resolve = resolve));
          this.queue = [];
          for (let i = 0; i < length; i++) {
              const from = oldText[i] || "";
              const to = newText[i] || "";
              const start = Math.floor(Math.random() * 40);
              const end = start + Math.floor(Math.random() * 40);
              this.queue.push({ from, to, start, end });
          }
          cancelAnimationFrame(this.frameRequest);
          this.frame = 0;
          this.update();
          return promise;
      }
      update() {
          let output = "";
          let complete = 0;
          for (let i = 0, n = this.queue.length; i < n; i++) {
              let { from, to, start, end, char } = this.queue[i];
              if (this.frame >= end) {
                  complete++;
                  output += to;
              } else if (this.frame >= start) {
                  if (!char || Math.random() < 0.28) {
                      char = this.randomChar();
                      this.queue[i].char = char;
                  }
                  output += `<span class="dud">${char}</span>`;
              } else {
                  output += from;
              }
          }
          this.el.innerHTML = output;
          if (complete === this.queue.length) {
              this.resolve();
          } else {
              this.frameRequest = requestAnimationFrame(this.update);
              this.frame++;
          }
      }
      randomChar() {
          return this.chars[Math.floor(Math.random() * this.chars.length)];
      }
  }

  // ——————————————————————————————————————————————————
  // Example
  // ——————————————————————————————————————————————————

  const phrases = [
      "Hello World,",
      "Je m'appelle Manel",
      "J'ai 20 ans",
      "et je suis apprentie développeuse",
      "J'aimerais acquérir de l'expérience",
      "Voici mon portfolio",
      "Bonne visite :)"
  ];

  const el = document.querySelector(".text");
  if (el) {
      const fx = new TextScramble(el);
      let counter = 0;
      const next = () => {
          fx.setText(phrases[counter]).then(() => {
              setTimeout(next, 800);
          });
          counter = (counter + 1) % phrases.length;
      };
      next();
  }

  // Gestion des messages
  var messageBox = document.querySelector('.js-message');
  var btn = document.querySelector('.js-message-btn');
  var card = document.querySelector('.js-profile-card');
  var closeBtn = document.querySelectorAll('.js-message-close');

  // Ouvrir le message
  if (btn && card) {
      btn.addEventListener('click', function (e) {
          e.preventDefault();
          card.classList.add('active');
      });

      closeBtn.forEach(function (element) {
          element.addEventListener('click', function (e) {
              e.preventDefault();
              card.classList.remove('active');
          });
      });
  }
});