const menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close'),
      hamburger = document.querySelector('.hamburger');
      menuOverlay = document.querySelector('.menu__overlay');

hamburger.addEventListener('click', () => {
    menu.classList.add('menu_active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('menu_active');
});

menuOverlay.onclick = ()=> menu.classList.remove('menu_active');

console.log(typeof(closeElem));



const percent = document.querySelectorAll('.level__item-percent'),
      yellow = document.querySelectorAll('.level__item-scale_yellow');

percent.forEach( (item, i) => {
    yellow[i].style.width = item.innerHTML;
});

//anim-scroll

const animItems = document.querySelectorAll('._anim-items');

if(animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() { 
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = animItem.offsetTop;
            const animStart = 4; // Коэффициант момента старта анимации

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((scrollY > animItemOffset - animItemPoint) /* && scrollY < (animItemOffset + animItemHeight) */ ) {
                animItem.classList.add('_active');


            } else {
                animItem.classList.remove('_active');

            }
        }
    }
    
    function offset(el) {
        const  rect = el.getBoundingClientRect(),
            scrollTop = window.pageYOffset /* scrollY */ || document.documentElement.scrollTop,
            scrollLeft = window.pageXOffset /* scrollX  */ || document.documentElement.scrollLeft;
        return { top: rect.Top + scrollTop, left: rect.Left + scrollLeft };
    }
  setTimeout(animOnScroll, 1000);

}
// window.addEventListener('scroll', chekbox);
// function chekbox() {
    

//     animItems.forEach(box => {
//         const boxTop = box.getBoundingClientRect().top;
//         const boxHeight = box.getBoundingClientRect().height;
//         let animStart = 4; // Коэффициант момента старта анимации
//         if (boxHeight > (window.innerHeight * 40 / 100)) {
//             animStart = 4.6;
//         }
//         if (boxHeight > (window.innerHeight * 50 / 100)) {
//             animStart = 5.7;
//         }
//         if (boxHeight > window.innerHeight) {
//             animStart = 15;
//         }
//         let triggerBottom = window.innerHeight / 5 * animStart;

//         if (boxTop < triggerBottom) {
//             box.classList.add('_active');
//         } else {
//             box.classList.remove('_active');
//         }
//     });
// }
//  setTimeout(chekbox, 1000);



//validate form
$(document).ready(function() {
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
          },
        // phone: "required",
        email: {
          required: true,
          email: true,
        },
        checkbox: {
          required: true
        }

      },
      messages: {
        name: {
          required: "Пожалуйсто введите своё имя",
          minlength: jQuery.validator.format("Веедите {0} символ!")
        },
        // phone: "Пожалуйста введите свой номер телефона",
        email: {
          required: "Пожалуйсто введите свою почту",
          email: "Неправильно введён адрес почты"
        },
        checkbox: {
          required: "Примите политику конфиденциальности"
        }
      }
    });
  }
  validateForms('#consultation-form');
  
  
  $('input[name=phone]').mask("+7 (999) 999-99-99");
  
  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
  
  
      $('form').trigger('reset');
    });
    return false;
  });
});




