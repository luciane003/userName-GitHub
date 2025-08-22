const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML =`<div class="info">
                                        <img src="${user.avatarUrl}"    alt="Foto do perfil do usuário" />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada'}</p>
                                        </div>    
                                        <div class="follow-info">
                                            <div class="followers">
                                                <p class="text">👥Seguidores: <span>${user.followers}</span></h2>
                                            </div>  
                                            <div class="following">  
                                                <p class="text">➡️ Seguindo: <span>${user.following}</span></h2>  
                                            </div>  
                                        </div>
                                    </div>`  
                                    
        let repositoriesItens = '';
        
        user.repositories.forEach (repo => {
            repositoriesItens += `
            <li class="repo-card">
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <div class="repo-info">
                    <span class="repo-stat">🌟 Stars: ${repo.stargazers_count}</span>
                    <span class="repo-stat">🍴 Forks: ${repo.forks_count}</span>
                    <span class="repo-stat">👀 Watchers: ${repo.watchers_count}</span>
                    <span class="repo-stat">💻 Linguagem: ${repo.language ?? 'Não definida'}</span>
                </div>       
            </li>
            `;
        });
        
        if(user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
            <h2>Repositórios</h2>
            <ul>${repositoriesItens}</ul>
            </div>`
        }

        if(user.events.length > 0) {
            let eventsItems = '';

            user.events.forEach(event => {
                if (event.type === "createEvent") {
                eventsItems += `<li><span class="event-type">Criação: </span> - <span class="repo-name" >${event.repo.name}</span></li>`
                }

                if (event.type === "PushEvent"){
                    event.payload.commits.forEach(commit => {
                        eventsItems += `
                        <li>
                            <span class="event-type">Push:</span> 
                            <span class="repo-name">${event.repo.name}</span> - 
                            <span class="commit-msg">"${commit.message}"</span>
                        </li>`;
                    });
                }
            });

            this.userProfile.innerHTML += `
            <div class="events">
                <h2 class="title-events">Últimos Eventos</h2>
                <ul>${eventsItems}</ul>
            </div>
            `;
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export {screen}