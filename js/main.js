window.addEventListener('scroll', function () {
   const header = document.querySelector('nav');
   header.classList.toggle('sticky', this.window.scrollY > 100);
});

//counter

document.addEventListener('DOMContentLoaded', () => {
   const counters = document.querySelectorAll('.count');

   const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.textContent.replace(/\D/g, ''), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 4000;
            const startTime = performance.now();

            const animate = (currentTime) => {
               const elapsed = currentTime - startTime;
               const progress = Math.min(elapsed / duration, 1);
               const current = Math.ceil(progress * target);
               el.textContent = current + suffix;

               if (progress < 1) {
                  requestAnimationFrame(animate);
               } else {
                  el.textContent = target + suffix;
               }
            };

            requestAnimationFrame(animate);
            observer.unobserve(el);
         }
      });
   });

   counters.forEach((counter) => observer.observe(counter));
});
