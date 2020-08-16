
const printTeam = (teamName, coach, ...players) => {
    console.log(`Team: ${teamName}`)
    console.log(`Coach: ${coach}`)
    console.log(`Players: ${players.join(', ')}`)
}

printTeam('Liberty', 'Casey Penn', 'Marge', 'Aiden', 'Herbert', 'Sherry')

let person = {
    name: 'Francis',
    age: 34
}

let location = {
    city: 'Quakertown',
    country: 'U.S.'
}

const overview = {
    ...person,
    ...location
}

console.log(overview)