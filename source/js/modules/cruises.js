let fixCruises = () => {
  let cruises = document.querySelectorAll('[data-hover="card"]');
  cruises.forEach((cruise) => {
    let innerCard = cruise.querySelector('[data-hover="inner"]');
    let outerCard = cruise.querySelector('[data-hover="outer"]');
    let button = cruise.querySelector('[data-hover="button"]');
    let focus = false;
    cruise.addEventListener('mouseenter', () => {
      innerCard.classList.add('cruises__inner-card--visible');
    });
    cruise.addEventListener('mouseleave', () => {
      if (!focus) {
        setTimeout(() => {
          innerCard.classList.remove('cruises__inner-card--visible');
          innerCard.classList.remove('opacity-1');
          outerCard.classList.remove('opacity-0');
        }, 300);
      }
    });
    cruise.addEventListener('focusin', () => {
      focus = true;
      innerCard.classList.add('cruises__inner-card--visible');
      innerCard.classList.add('opacity-1');
      outerCard.classList.add('opacity-0');
    });
    cruise.addEventListener('focusout', (event) => {
      if (!(cruise.contains(event.relatedTarget))) {
        innerCard.classList.remove('opacity-1');
        outerCard.classList.remove('opacity-0');
        setTimeout(() => {
          innerCard.classList.remove('cruises__inner-card--visible');
        }, 300);
      }
    });
    button.addEventListener('focusout', () => {
      focus = false;
      innerCard.classList.remove('opacity-1');
      outerCard.classList.remove('opacity-0');
      setTimeout(() => {
        innerCard.classList.remove('cruises__inner-card--visible');
      }, 300);
    });
  });
};

export {fixCruises};
