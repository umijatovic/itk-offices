const URL = 'https://itk-exam-api.herokuapp.com/api/offices';

// SELECTING DOM ELEMENTS

let root = document.querySelector('#root');
let spinner = document.querySelector('.spinner');
let listButton = document.querySelector('#listButton');
let gridButton = document.querySelector('#gridButton');


// LOADING SPINNER

$(document).ready(() => {
    spinner.style.display = 'none';
})


// INITIAL FUNCTION - FETCHING DATA AND RENDERING DEFAULT LIST VIEW

function init(){

        $.get(URL)
            .done(response => {
                response.map(office =>{

                    // ASSIGNING DATA TO VARIABLES

                    let name = office.name;
                    let description = (office.description.length < 76 ) ? office.description : office.description.slice(0,76) + '...';
                    let longDescription = (office.description.length < 76) ? office.description : office.description.slice(0,145) + '...';
                    let picture = office.photo;

                    // MAKING HTML ELEMENTS

                    let officeDiv = document.createElement('div');
                    let officeName = document.createElement('h4');
                    let nameAndDescriptionDiv = document.createElement('div');
                    let officeDescription = document.createElement('p');
                    let officeLongDescription = document.createElement('p');

                    // ADDING CLASSES TO ELEMENTS

                    officeDescription.classList.add('description');
                    officeLongDescription.classList.add('longDescription');
                    officeDiv.classList.add('officeDiv');

                    // ADDING TEXTCONTENT TO ELEMENTS

                    officeName.textContent = name;
                    officeDescription.textContent = description;
                    officeLongDescription.textContent = longDescription;

                    // CHECKING IS PICTURE NULL

                    if(picture){

                        // IF ISN'T SETTING SRC ATTRIBUTE
                        var officePicture = document.createElement('img');
                        officePicture.setAttribute('src', picture);

                    }else{

                        // IF IT IS SETTING FIRST LETTER OF THE NAME AS PICTURE
                        var officePicture = document.createElement('p');
                        officePicture.classList.add('letterPicture')
                        officePicture.textContent = office.name[0].toUpperCase();
                    }

                    
                    // APPENDING CHILD ELEMENTS TO PARENTS

                    nameAndDescriptionDiv.appendChild(officeName);
                    nameAndDescriptionDiv.appendChild(officeDescription);
                    nameAndDescriptionDiv.appendChild(officeLongDescription);

                    officeDiv.appendChild(officePicture);
                    officeDiv.appendChild(nameAndDescriptionDiv);

                    root.appendChild(officeDiv);
                })
                
            })
    
}

// INVOKING INITIAL FUNCTION

init()

// LIST VIEW BUTTON

listButton.addEventListener('click', () =>{

    root.classList.remove('root1');
    listButton.classList.add('selected');
    gridButton.classList.remove('selected');

});

// GRID VIEW BUTTON

gridButton.addEventListener('click', () => {

    root.classList.add('root1');
    listButton.classList.remove('selected');
    gridButton.classList.add('selected');
    
})







