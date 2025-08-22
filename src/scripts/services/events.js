async function getEvents(userName) {
    const response = await fetch (`https://api.github.com/users/${userName}/events/public`);
    const data = await response.json();
    return data;
}

export {getEvents}