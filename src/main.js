import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        database: ['Postgresql', "MongoDB", 'DynamoDB', 'MySQL', 'Neo4j', 'Redis'],
        backend: ['Ruby on Rails', 'Django', 'Serverless Cloud', 'Meteor.js', 'Flask', 'Sinatra', 'FastAPI', 'Supabase', ],
        api: ['GraphQL', 'REST'],
        frontend: ['React', 'Svelte', 'Vue', 'Vanilla.js'],
        mobile: ['React Native', 'Flutter', 'Kotlin Multiplatform', 'Swift/Xcode', 'Java/Android Studio', 'PWA'],
        ideas: ['Chat App', 'Game', 'Schedule App', 'Marketplace', "Blogsphere", "Map Application", 'Reccomendation Engine', 'Job Board', 'Edu-tainment Platform'],
        audiences: ['Cat Owners', 'Coffee Addicts', 'Cooks', 'Book Lovers', 'Board Game Enthusiast', 'Movie Nerds', 'Gym Rats', 'Skaters', "Car Lovers", "Gamers", "Gardeners", "Metal Workers", "Animal Rights Activists", "Remote Learning"]
    }
});

export default app;