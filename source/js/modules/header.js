import {ScrollLock} from '../utils/scroll-lock';
import {FocusLock} from '../utils/focus-lock';

let initNav = () => {
  let lockScroll = new ScrollLock();
  let lockFocus = new FocusLock();
  const openButton = document.querySelector('[data-header="open"]');
  const navigation = document.querySelector('[data-header="container"]');
  const closeButton = navigation.querySelector('[data-header="close"]');
  const oldLogo = document.querySelector('[data-header="logo"]');
  const body = document.querySelector('body');
  const breakpoint = window.matchMedia('(min-width:768px)');
  const linkBreakpoint = window.matchMedia('(max-width:767px)');
  const links = document.querySelectorAll('[data-header="link"]');
  let navigationController;
  let navigationOpen = false;

  let openNavigation = () => {
    openButton.disabled = true;
    oldLogo.classList.add('hide');
    openButton.classList.add('hide');
    lockScroll.disableScrolling();
    lockFocus.lock('[data-header="container"]');
    let backdrop = document.createElement('div');
    backdrop.classList.add('background-drop--fading');
    backdrop.classList.add('background-drop');
    body.appendChild(backdrop);
    navigation.classList.add('header__links-container--opening');
    window.requestAnimationFrame(() => {
      navigation.classList.add('header__links-container--open');
      backdrop.classList.remove('background-drop--fading');
      navigation.classList.remove('header__links-container--opening');
      openButton.disabled = false;
      navigationOpen = true;
    });
  };

  let closeNavigation = () => {
    let backdrop = body.querySelector('.background-drop');
    if (backdrop) {
      backdrop.classList.add('background-drop--fading');
    }
    closeButton.disabled = true;
    navigation.classList.add('header__links-container--opening');
    window.requestAnimationFrame(() => {
      navigation.classList.remove('header__links-container--open');
      oldLogo.classList.remove('hide');
      openButton.classList.remove('hide');
      setTimeout(() => {
        navigation.classList.remove('header__links-container--opening');
        lockScroll.enableScrolling();
        lockFocus.unlock();
        if (backdrop) {
          backdrop.remove();
        }
        closeButton.disabled = false;
        navigationOpen = false;
      }, 300);
    });
  };

  let closeNavigationHandler = () => {
    closeNavigation();
    navigationController.abort();
  };

  openButton.addEventListener('click', () => {
    openNavigation();
    navigationController = new AbortController();
    let backdrop = body.querySelector('.background-drop');
    closeButton.addEventListener('click', () => {
      closeNavigationHandler();
    }, {signal: navigationController.signal});
    backdrop.addEventListener('click', () => {
      closeNavigationHandler();
    }, {signal: navigationController.signal});
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeNavigationHandler();
      }
    }, {signal: navigationController.signal});
  });

  const breakpointChecker = () => {
    if (breakpoint.matches && navigationOpen === true) {
      closeNavigationHandler();
    }
  };

  links.forEach((link) => {
    link.addEventListener('click', (evt) => {
      if (linkBreakpoint.matches && navigationOpen === true) {
        evt.preventDefault();
        closeNavigationHandler();
        setTimeout(() => {
          window.location.href = link.href;
        }, 320);
      }
    });
  });
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};

export {initNav};
