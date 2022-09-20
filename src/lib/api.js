// Stuff that pulls from the api.7cav.us
const { default: axios } = require("axios")
require('dotenv').config()

// Pull a specific roster
async function pullRoster(rosterName) {
  const request = await axios.get(`https://api.7cav.us/api/v1/roster/${rosterName}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  })

  let profiles = []
  for (const profile in request.data.profiles) {
    profiles.push({
      id: profile,
      ...request.data.profiles[profile]
    })
  }

  return profiles
}

// Pull entierety of milpacs via API
async function pullMilpacs() {
  const rosters = [
    'ROSTER_TYPE_COMBAT',
    'ROSTER_TYPE_RESERVE',
    'ROSTER_TYPE_ELOA',
    'ROSTER_TYPE_WALL_OF_HONOR',
    'ROSTER_TYPE_ARLINGTON',
    'ROSTER_TYPE_PAST_MEMBERS'
  ]

  let allMilpacs = []

  for (const roster of rosters) {
    console.log(`Pulling ${roster}`)
    const downloadedRoster = await pullRoster(roster)
    allMilpacs = allMilpacs.concat(downloadedRoster)
  }

  return allMilpacs
}

module.exports = { pullRoster, pullMilpacs }