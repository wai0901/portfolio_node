const OpenBtns = document.querySelectorAll( 'div.btn');
const projectIntro = document.querySelectorAll('.project-intro');

const btnFront = document.querySelectorAll( 'button.btn-front' ),
      btnClose = document.querySelectorAll( 'button.btn-close' );

btnFront.forEach((selectedBtn, index) => 
    selectedBtn.addEventListener('click', (event) => {
        event.preventDefault;

        let selectedBtn = OpenBtns[index]

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

        let selectedBtn = OpenBtns[index]

        selectedBtn.classList.remove( 'is-open' );
        projectIntro[index].classList.remove( 'project-intro-hide');
    })
);

