/// <reference path="../typings/globals/jquery/index.d.ts" />


let trigger;
$('.header').animate({ width: '100%' }, 2000).animate({ margin: '0', height: '70vh' }, 2000, function () {
    $('.header-content').slideDown(2000);
    $('.nav').slideDown(2000, () => {
        $('.details').fadeIn(2000, () => {
            $('.duration').fadeIn(2000, () => {
                $('.contact').fadeIn(2000);
            });
        });
    });
});



$(".nav-link").click(function () {
    let sectionSelector = $(this).attr("href");

    console.log(sectionSelector);

    let secOffset = $(sectionSelector).offset().top;
    console.log(secOffset);

    $(window).animate({ scrollTop: secOffset }, 5000);

});


$('.nav').click(() => {
    if (trigger == 1) { closeNav() }
    else { openNav(); }
});

$('.close').click(() => {
    closeNav();
})

$('.instructor').click(function () {
    let target = $(this).attr("target")
    slideDown(target);
    slideUp(target);
    Circle(target)
})

function slideDown(target) {
    $(`#${target}`).slideToggle(500);
}

function slideUp(target) {
    let data = $(`.instructor-data`);
    let x;
    for (x of data) {
        if (x.getAttribute('id') != target) {
            $(`#${x.getAttribute('id')}`).slideUp(500);
        }
    }
}



function openNav() {
    let bodyHeight = $("body").height();
    console.log(bodyHeight);
    $('.nav .fas').addClass("fa-spin");
    $('.nav-layer').animate({ width: '250px' , height :bodyHeight  }, 1000, function () {
      
        $('.nav-list').fadeIn(1000);
        $('.nav-top').fadeIn(1000);

    });

    trigger = 1;
}

// $(window).scroll(function () {
//     console.log($('body').scrollTop())
//     $('.nav-layer').animate({ height: "100vh" });
// });

function closeNav() {
    $('.nav .fas').removeClass("fa-spin");

    $('.nav-layer').animate({ width: '0' }, 1000, function () {

    })
    $('.nav-list').fadeOut();
    $('.nav-top').fadeOut();


    trigger = 0
}


function Circle(target) {

    let circleIndex = $('.circle');
    let i;
    for (i of circleIndex) {
        if (i.getAttribute('tabindex') != target) {
            minusCircle(i);

        }
        else if (i.getAttribute('tabindex') == target && i.getAttribute('class').includes('minus-circle')) {
            minusCircle(i);

        }

        else {
            plusCircle(i);
        }
    }

}

function minusCircle(i) {
    $(`#${i.getAttribute("id")}`).removeClass('minus-circle');
    $(`#${i.getAttribute("id")}`).addClass('plus-circle');
    $(`#${i.getAttribute("id")}`).html('<i class="fas fa-plus-circle"></i>')

}
function plusCircle(i) {
    $(`#${i.getAttribute("id")}`).removeClass('plus-circle ');
    $(`#${i.getAttribute("id")}`).addClass('minus-circle');
    $(`#${i.getAttribute("id")}`).html('<i class="fas fa-minus-circle"></i>')

}



let today = new Date()
let eventDay = new Date();
eventDay.setMonth(9);
eventDay.setHours(18);
eventDay.setDate(30);
eventDay.setMinutes(0);
eventDay.setSeconds(0);

let diffTime = eventDay - today;
console.log(diffTime);

if (diffTime > 0) {

    let diffDays = diffTime / (1000 * 60 * 60 * 24);
    let diffDaysFrac = (diffDays - Math.floor(diffDays))
    diffDays = diffDays - diffDaysFrac;

    let diffHours = diffDaysFrac * 24;
    let diffHoursFrac = (diffHours - Math.floor(diffHours));
    diffHours = diffHours - diffHoursFrac;

    let diffMinutes = diffHoursFrac * 60;
    let diffMinutesFrac = (diffMinutes - Math.floor(diffMinutes))
    diffMinutes = diffMinutes - diffMinutesFrac;

    let diffSeconds = diffMinutesFrac * 60;
    let diffSecondsFrac = (diffSeconds - Math.floor(diffSeconds))
    diffSeconds = diffSeconds - diffSecondsFrac;

    $('.days').html(diffDays);
    $('.hours').html(diffHours);
    $('.minutes').html(diffMinutes);
    $('.seconds').html(diffSeconds);


    let secondSound = new Audio();
    secondSound.src = "audio/zapsplat_household_alarm_clock_button_plastic_switch_003_46350.mp3";

    let i;
    $('.soundOn').click(() => {
        $('.soundOff').css({ "display": "flex " });
        $('.soundOn').css({ "display": "none" });

        let soundOn = setInterval(function () {
            secondSound.play();


        }, 1000);
        i = soundOn;
    })







    $('.soundOff').click(() => {
        $('.soundOn').css({ "display": "flex" });
        $('.soundOff').css({ "display": "none" });
        // secondSoud.pause();
        clearTimeout(i);
        // secondSound.pause();


    });



    let counter = setInterval(function () {

        diffSeconds--;

        if (diffSeconds < 0 && diffMinutes == 0 && diffHours == 0 & diffDays == 0) {
            diffSeconds = 0;
            clearTimeout(counter);
            clearTimeout(i);
            $('.soundOn').css({ "display": "flex" });
            $('.soundOff').css({ "display": "none" });
            // console.log(counter)

        }
        else if (diffSeconds < 0) {
            diffSeconds = 59;
            diffMinutes--;
            if (diffMinutes < 0 && diffHours == 0 && diffDays == 0) {
                diffMinutes == 0;
            }
            else if (diffMinutes < 0) {
                diffMinutes = 59;
                diffHours--;
                if (diffHours < 0 && diffDays == 0) {
                    diffHours == 0;
                }
                else if (diffHours < 0) {
                    diffHours = 23;
                    diffDays--;
                }
            }

        }




        $('.seconds').html(diffSeconds);
        $('.minutes').html(diffMinutes);
        $('.hours').html(diffHours);
        $('.days').html(diffDays);
        // console.log(counter)


    }, 1000);


}
else {
    $('.days').html('-');
    $('.hours').html("-");
    $('.minutes').html('-');
    $('.seconds').html('-');
}



$('.message').keyup(() => {
    let message = $('.message').val();

    if (message.length >= 100) {
        $('.numberOfLetters').text("your available character finished");
        $('.msRemain').css({ 'display': "none" });

    }
    else {
        $('.numberOfLetters').text(100 - message.length);
        $('.msRemain').css({ 'display': "inline" });
    }

});






