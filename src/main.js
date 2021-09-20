import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        database: ['Postgresql', "MongoDB", 'DynamoDB', 'MySQL', 'Neo4j', 'Redis'],
        backend: ['Ruby on Rails', 'Django', 'Serverless Cloud', 'Meteor.js', 'Flask', 'Sinatra', 'FastAPI', 'Supabase', ],
        api: ['GraphQL', 'REST'],
        frontend: ['React', 'Svelte', 'Vue', 'Vanilla.js'],
        mobile: ['React Native', 'Flutter', 'Kotlin Multiplatform', 'Swift/Xcode', 'Java/Android Studio', 'PWA', "Expo"],
        ideas: ['Chat App', 'Game', 'Schedule App', 'Marketplace', "Blogsphere", "Map Application", 'Reccomendation Engine', 'Bulletin Board', 'Edu-tainment Platform', "Command Line Interface", "Twitter Bot", "Twilio Bot", "Reddit Bot", "Media Player", "RPG Game", "Musical Instrument", "Kanban Board", "Email Organizer", "Avatar Generator", "Content Management System", "Massively multiplayer online game", "Sidescroller Game", "Data Visualization Dashboard", "Swipe Left/Right App", "Habit Tracker"],
        audiences: ['Cat Owners', 'Coffee Addicts', 'Cooks', 'Book Lovers', 'Board Game Enthusiast', 'Movie Nerds', 'Gym Rats', 'Skaters', "Car Lovers", "Gamers", "Gardeners", "Metal Workers", "Animal Rights Activists", "Remote Learning", "Rock Climbers", "Dog Trainers", "Personal Trainers", "Pokemon Trainers", "Arborists", "Wookies", "Grateful Dead Heads", "Electronic Musicians", "Lego Builders", "Artists", "Painters", "Javascript Developers", "Web Developers", "Mobile Developers", "VSCode Users", "Music Festival Goers", "Hair Stylists", "Doctors", "Data Scientists", "Data Analysts", "Fast Food Junkies", "Insomniacs", "Cyclists", "Families", "Vegans", "Snowboarders", "Tennis Players", "Indie Musicians", "Weight Lifters", "Home Aqauriums", "Recipes", "Home Decorators", "Landscape Architects", "Beer Drinkers", "Wine Snobs", "Car Maintenance"]
    }
});

export default app;