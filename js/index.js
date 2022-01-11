import slideMenu from './menu.js';
import switchHeader from './logoHeader.js';
import renderVideo from './renderVideo.js';
import menuLink from './menuLink.js';

slideMenu({
    openBtn: '.header__burger-btn',
    menu: '.navigation',
    classActiveMenu: 'navigation_active',
    closeTrigger: '.navigation__link, .navigation__close'
});

switchHeader();
renderVideo();
menuLink();