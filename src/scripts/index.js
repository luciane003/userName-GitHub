import {getUser} from './services/user.js';
import {getRepositories} from './services/repositories.js';

import {user} from './objects/user.js';
import {screen} from './objects/screen.js';

import { getEvents } from './services/events.js';

document.getElementById('btn-search').addEventListener('click',() => {
    const userName = document.getElementById("input-search").value;
    if (validateInput(userName)) return;
    getUserData(userName);  
});

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;

    if (isEnterKeyPressed) {
       validateInput(userName) 
       getUserData(userName);
    }   
});

function validateInput(userName) {
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do Github')
        return true
    }    

}

async function getUserData(userName) {

    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
       screen.renderNotFound() 
       return;
    }

    const repositoriesResponse = await getRepositories(userName)
    const eventsResponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse.slice(0,10));
    
    screen.renderUser(user)
}