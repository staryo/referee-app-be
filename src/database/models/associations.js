const Tournament = require('./tournament');
const Team = require('./teams');
const Player = require('./player');
const Match = require('./match');
const Event = require('./event');
const Assistans = require('./assistans');
const User = require('./user');

Tournament.hasMany(Team); // Adds tournamentId to Team
Tournament.hasMany(Player); // Adds tournamentId to Player
Tournament.hasMany(Match); // Adds tournamentId to Match
Team.belongsTo(Tournament); // Adds tournamentId to Team
Player.belongsTo(Tournament); // Adds tournamentId to Player
Match.belongsTo(Tournament); // Adds tournamentId to Match
Match.belongsTo(Team, { as: 'team1' }); // Adds team1Id to Match
Match.belongsTo(Team, { as: 'team2' }); // Adds team2Id to Match
Team.hasMany(Player); // Adds teamId to Player
Event.belongsTo(Player, { as: 'author' }); // Adds authorId to Event
Event.belongsToMany(Player, { through: 'player_events', as: 'assistants' }); // Creates a join table player_events with eventId and playerId
Player.belongsToMany(Event, { through: 'player_events' }); // Adds eventId to Player
Event.hasOne(Assistans)
Assistans.belongsTo(Event)
User.hasMany(Tournament)
Tournament.belongsTo(User)