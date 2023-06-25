class PetService {
    static url = "https://6495d01db08e17c91792b7ba.mockapi.io/api/v1/pets"

    //methods to send the request:
    static getAllPets() { //takes no parameters because its going to get all the pets
        return $.get(this.url);
    }

    //retrieving a specific pet from the api by the id:
    static getPet(id) {
        return $.get(this.url + `/${id}`);  //makes a .get request for the url and concatenates the id
    }

    static addPet(pet) {        //
        return $.post(this.url, pet);   //makes a post request to add a pet 
    }

    static updatePet(pet, petId) {  //this is a PUT request to update the pet on the server
        return $.ajax({
            url: this.url + `/${petId}`,
            dataType: 'json',
            data: JSON.stringify(pet),  //this is converting the pet object to a JSON string
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deletePet(id) {  //A delete request to delete the pet on the server by ID
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}

class DOMManager {
    static pets = []  

    static getAllPets() {   //gets all pets from the server and renders the table rows
        PetService.getAllPets().then(pets => this.render(pets))
    }

    static addPet(pet) {  //
        PetService.addPet(pet).then(pet => {  //after the pet is added to the server and the post request is fulfilled, the then function is called 
            this.getAllPets()   //getAllPets from the server and lists them in the table
            this.resetForm()    //resets the form
        })
    }

    static editPet(id){
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        let petToUpdate = this.pets.find(pet => pet.id === `${id}`)   //this finds the pet in the DOMManager by ID
        this.populateForm(petToUpdate)                              
        $('#btnAdd').val(`Update ${petToUpdate.petName}`)    //adds the name to be edited to the 'add new pet' button
    }

    static updatePet(pet, petId){
        PetService.updatePet(pet, petId).then(pet => {  //updates pet on the server by id and then renders all pets in the table, and resets the form
            this.getAllPets()
            this.resetForm()
        })
    }

    static populateForm(pet) {
        $('#petId').val(pet.id)  //puts the pet id into the input with the ID petId
        $('#petType').val(pet.petType)  
        $('#petName').val(pet.petName)
        $('#petSex').val(pet.petSex)
        $('#arrivalDate').val(pet.arrivalDate)
    }

    static resetForm(){
        //https://stackoverflow.com/questions/6364289/clear-form-fields-with-jquery
        $("input[type=text], input[type=hidden]").val("");   //takes the input text and input hidden and sets their values to an empty string
        $('#btnAdd').val('Add New Pet')
    }

    static deletePet(id){           //deletes pet from the server by id then renders all pets in the table
        PetService.deletePet(id).then(() => {
            this.getAllPets()
        })
    }

    static render(pets){    
        this.pets = pets    //setting DOMManager.pets equal to pets from the server
        $('#tblData tbody').empty()   //clearing the table every time we render pets 
        for(let i=0; i<pets.length; i++){  
            let pet = pets[i]   
            let row = this.createTableRow(pet)
            $('#tblData tbody').append(row)
        }
        // https://getbootstrap.com/docs/5.0/components/tooltips/
        // https://stackoverflow.com/questions/33584392/bootstraps-tooltip-doesnt-disappear-after-button-click-mouseleave
        let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))   //makes the tooltip appear to edit or delete
        let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            let toolTip = new bootstrap.Tooltip(tooltipTriggerEl, {trigger:'hover'})
            $(tooltipTriggerEl).click(function(e){
                // needed because when the row is deleted the tool tip does not disappear on its own
                $(this).tooltip('hide')
            })

            return toolTip
        })

        // https://api.jquery.com/hover/
        // https://fontawesome.com/icons/trash-can?f=classic&s=solid&an=beat
        // adds animation to edit and delete button icons
        $( ".btn-update, .btn-delete" ).hover(      //makes the pulsing animation when hovering above edit or delete buttons
            function() {
                $(this).find('i').addClass('fa-beat');  //when you move your mouse over the button, the class 'fa-beat' gets added to the 'i' tag
            }, function() {
                $(this).find('i').removeClass('fa-beat'); //when you move your mouse off the button, the class 'fa-beat' gets removed from the 'i' tag
            }
        );
    }

    static createTableRow(pet) {  //this creates the new table row using the new data that was entered and returns it as a string
        let dynamicTr = `
            <tr>
            <td class="text-center">${pet.id}</td>
            <td>${pet.petType}</td>
            <td>${pet.petName}</td>
            <td>${pet.petSex}</td>
            <td>${pet.arrivalDate}</td>
            <td class="text-center"><button class='btn btn-info btn-sm btn-update' data-bs-toggle="tooltip" data-bs-placement="top" title="Edit ${pet.petName}" onclick="DOMManager.editPet(${pet.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
            <td class="text-center"><button class='btn btn-danger btn-sm btn-delete' data-bs-toggle="tooltip" data-bs-placement="top" title="Delete ${pet.petName}" onclick="DOMManager.deletePet(${pet.id})"><i class="fa-solid fa-trash-can"></i></button></td>
            </tr>`;
        return dynamicTr
    }
}

$('#petForm').submit(function(e){   //the form has the id petForm. This is adding an event listener for the submit event to the form.
    e.preventDefault()              // to prevent the browser from submitting the form to the server
    let petId = $('#petId').val()   //defining the variable petId as the value of the input with the ID petId
    let petData = {                 //defining the variable petData as an object
        petType:$('#petType').val(), //a property of petData which adds the value of the input with the ID petType to the petData object
        petName:$('#petName').val(),  
        petSex:$('#petSex').val(),
        arrivalDate:$('#arrivalDate').val()
    }

    if(petId){          //if petId has a value, then update the pet, else add the pet
        DOMManager.updatePet(petData, petId)
    } else {
        DOMManager.addPet(petData)
        
    }
})

DOMManager.getAllPets();
