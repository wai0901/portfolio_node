const btns = document.querySelectorAll( 'div.btn');
const projectIntro = document.querySelectorAll('.project-intro');

const btnFront = document.querySelectorAll( 'button.btn-front' ),
      btnClose = document.querySelectorAll( 'button.btn-close' );


// btnFront.addEventListener( 'click', function() {

    // var w = btn.offsetWidth,
    //     h = btn.offsetHeight;
    
    // var directions = [
    //     { id: 'bottom', x: w/2, y: h },
    // ];

    // projectIntro.classList.add( 'project-intro-hide');

    // btn.setAttribute( 'data-direction', directions.shift().id );
    // btn.classList.add( 'is-open' );

// });

// btnClose.addEventListener( 'click', function() {	
//     btn.classList.remove( 'is-open' );
//     projectIntro.classList.remove( 'project-intro-hide');
// });


btnFront.forEach((selectedBtn, index) => 
    selectedBtn.addEventListener('click', (event) => {
        event.preventDefault;

        let selectedBtn = btns[index]

        let w = selectedBtn.offsetWidth;
        let h = selectedBtn.offsetHeight;
    
        var directions = [
            { id: 'bottom', x: w/2, y: h },
        ];

        projectIntro[index].classList.add( 'project-intro-hide');

        selectedBtn.setAttribute( 'data-direction', directions.shift().id );
        selectedBtn.classList.add( 'is-open' );
    })
)

btnClose.forEach((selectedBtn, index) => 
    selectedBtn.addEventListener( 'click', (event) => {	
        event.preventDefault;

        let selectedBtn = btns[index]

        selectedBtn.classList.remove( 'is-open' );
        projectIntro[index].classList.remove( 'project-intro-hide');
    })
);