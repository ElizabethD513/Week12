let baseURL = "https://6495d01db08e17c91792b7ba.mockapi.io/api/v1/pets"
function populateTable(data) {
    alert(data)
}

function getData() {
    $.get(baseURL, populateTable)
        

}

function createTableRow(pet) {
    let dynamicTr = `
    <tr>
    <td>${pet.id}</td>
    <td>${pet.petType}</td>
    <td>${pet.petName}</td>
    <td>${pet.petSex}</td>
    <td>${pet.arrivalDate}</td>
    <td><button class='btn btn-danger btn-sm' data-id="${pet.id}">delete</button></td>
    <td><button class='btn btn-info btn-sm' data-id="${pet.id}">edit</button></td>
    </tr>`;

}
getData()




/*let emptyRow = "<tr><td colspan='5' class='text-center'> No Records Available</td></tr>";

$(document).ready(function() {
    $("#tblData tbody").append(emptyRow); //adds the empty row once page loads

    $("#btnAdd").click(function() { //gets value of each form input
        let petType = $("#txtType").val().trim();
        let name = $("#txtName").val().trim();
        let sex = $("#txtSex").val().trim();
        let arrivalDate = $("#txtArrival").val().trim();
        let mobile = $('#txtMobile').val.trim();

        // console.log({petType, name, sex, arrivalDate});

        //for second table: applying to adopt a pet. name/address/mobile
        const mobileValidation = new RegExp(/^[\d]*$/gi).test(mobile) && mobile.length === 10 //checks for 10 numbers for mobile #
        //console.log(mobile, isNumber: new RegExp(/^[\d]*$/gi).test(mobile), mobileLength: mobile.length === 10 )

    });
    if (petType === "" || name === "" || sex === "" || arrivalDate === "") {
        alert("Please provide values"); //alert user of missing values
        return;
    } else if (!mobileValidation) {
        alert("Please enter a valid phone number with 10 digits");
        return;
    } else {
        if ($("#tblData tbody").children().children().length == 1) {
            $("#tblData tbody").html("");

            let formattedNumber = function(num) {
                let beginning = mobile.slice(0, 3);
                let middle = mobile.slice(3, 6);
                let end = mobile.slice(6);

                return `$(beginning)-$(middle)-$(end)`;
            }
            console.log(formattedNumber(mobile))

            let srNo = $("#tblData tbody").children().length + 1; //get number of table rows to increase row id by 1

            let dynamicTr = `
        <tr>
        <th>${srNo}</th>
        <th>${petType}</th>
        <th>${Name}</th>
        <th>${Sex}</th>
        <th>${arrivalDate}</th>
        <td>${formattedNumber(mobile)}</td>
        <td><button class='btn btn-danger btn-sm'>delete</button></td>
        </tr>`;

            $("#tblData tbody").append(dynamicTr); //appending dynamic string to table tbody

            $("#txtpetType").val(""); //reset inputs to empty strings
            $("#txtName").val("");
            $("#txtSex").val("");
            $("#txtarrivalDate").val("");
            $("#txtMobile").val("");

            $(".btn-sm").click(function() { //add delete functionality to each row

                $(this).parent().parent().remove();
                if ($("#tblData tbody").children().children().length == 0) {
                    $("#tblData tbody").append(emptyRow);

                }
            })


        }

    }


    //console.log()

});

*/


/*class House {  //the structure for the house
    constructor(name) {
        this.name = name;
        this.room = [];

    }
    addRoom(name, area) {
        this.rooms.push(new Room(name, area));
    }
}

class Room {
    constructor(name, area) {
        this.name = name;
        this.area = area;
    }
}
//the service- how you're going to send how we're going to send the htp requests
class HouseService {
    static url = 'https://ancient-taiga-31359.herokuapp.com/api/houses';
//methods to send the request:
    static getAllHouses() { //takes no parameters because its going to take all the houses
        return $.get(this.url);
    }//retrieving a specific house from the api:
    static getHouse(id) {
        return $.get(this.url + '/$(id)');
    }
    static createHouse(house) { 
        return $.post(this.url, house);
    }
    static updateHouse(house) {
        return $.ajax({
        url: this.url + '/$house._id)',
        dataType: 'json',
        data: JSON.stringify(house),
        contentType: 'application/json',
        tyoe: 'PUT'
        });
    }
   
    static deleteHouse(id) {
        return $.ajax({
            url: this.url + '/${id}',
            type: 'DELETE'
        });
    }
}

 class DOMManager {
    static house;

    static getAllHouses() {
        HouseService.getAllHouses().then(houses => this.render(houses));


    }

    static createHouse() {
        HouseService.createHouse(new House(name))
    }
    static deleteHouse(id) {
        HouseService.deleteHouse(id)
        .then(() => {
            return HouseService.getAllHouses();
        })
        .then((houses) => this.render(houses));
    }

    static addRoom(id) {
        for(let house of this.houses) {
            if (house._id == id){
                house.rooms.push(new Room($('#${house._id}-room-name').val())); //jquery then template literal then id
                 HouseService.uodateHouse(house)
                .then(() => {
                  return HouseService.getAllHouses();
            })
            .then((houses) => this.render(houses));
         }
        }
    }
    static deleteRoom(houseId, roomId) {
        for (let house of this.houses) {
            if (house._id == houseId){
                for (let room of house.rooms){
                    if(room._id == roomId) {
                        house.rooms.splice(house.rooms.indexOf(room), 1);
                        HouseService.updateHouse(house)
                        .then(() => {
                            return HouseService.getAllHouses();
                        })
                        .then((houses) => this.render(houses));

                    }
                }
            }
        }

    }

    static render(houses) {
        this.houses = houses;
        $('#app').empty();
        for (let house of houses){
            $('#app').prepend(
             `<div id="$(house._id") class="card">
                <div class="card-header">
                    <h2>${house.name}</h2>
                    <button class="btn btn-danger" onclick="DOMManager.deleteHouse('${house._id}')">Delete</button>
                </div>
                <div class="card-body">
                  <div class="card">
                    <div class="row">
                        <div class="col-sm">
                         <input type="text" id="${house._id}-room-name" class="form-control" placeholder="Room Name">
                        </div>
                        <div class="col-sm">
                          <input type="text" id="${house._id}-room-area" class="form-control" placeholder="Room Area">
                        </div>
                    </div>
                    <button id="${house._id}-new-room" onclick="DOMManager.addRoom('${house._id}')" class="btn btn-primary form-control">Add</button>
                </div>
         </div>
        </div><br>`
            );
    
            for (let room of house.rooms) {
                $('#${house._id}').find('.card-body').append(
                `<p>
                    <span id="name-${room._id}"><strong>Name: </strong> ${room.name}</span>
                    <span id="name-${room._id}"><strong>Area: </strong> ${room.area}</span>
                    <button class="btn btn-danger" onclick="DOMManager.deleteRoom('${house._id}','${room._id}')">Delete Room</button>`<br>

                

            }
            }
        
    }
 }
 
$('#create-new-house').click() => {
            DOMManager.createHouse($('#new-house-name').val());
            $('#new-house-name').val('');
};
DOMManager.getAllHouses();
*/