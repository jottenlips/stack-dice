import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        database: ['PostgreSQL', "MongoDB", 'DynamoDB', 'MySQL', 'Neo4j', 'Redis', "SQLite", "MariaDB", "Microsoft SQL Server", "Elasticsearch", "Firebase"],
        backend: ['Ruby on Rails', 'Django', 'Serverless Cloud', 'Meteor', 'Flask', 'Sinatra', 'FastAPI', 'Supabase', 'Laravel', "Express", "Koa", "Spring", "ASP.NET", "Serverless"],
        api: ['GraphQL', 'REST'],
        frontend: ['React', 'Svelte', 'Vue', 'Vanilla.js', "Electron", "Next.js", "Preact", 'Rescript', 'ReasonReact', "Elm", "Ink"],
        mobile: ['React Native', 'Flutter', 'Kotlin Multiplatform', 'Swift/Xcode', 'Java/Android Studio', 'PWA', "Expo"],
        ideas: ['Chat App', 'Game', 'Schedule App', 'Marketplace', "Blogsphere", "Map Application", 'Recommendation Engine', 'Bulletin Board', 'Edu-tainment Platform', "Command Line Interface", "Twitter Bot", "Twilio Bot", "Reddit Bot", "Media Player", "RPG Game", "Musical Instrument", "Kanban Board", "Email Organizer", "Avatar Generator", "Content Management System", "Massively multiplayer online game", "Sidescroller Game", "Data Visualization Dashboard", "Swipe Left/Right App", "Habit Tracker", "Search Engine", "Static Site Generator", "Video Chat Site", "Scoreboard", "Reminder App", "Neopets Clone", "Picture Sharing Site", "Stock Photo Search", "Stock Music Search", "Stock Video Search", "VR App", "Reddit Clone", "Pixel Art Studio", "Synthesizer", "Sheet Music Player", "Virtual Tape Recorder", "Craigslist Clone", "Donation Portal", "PDF Generator", "Penpal Service", "Trading post", "App Idea Generator", "Note Taking App", "Ecosystem", "Progress Tracker"],
        audiences: ['Cat Owners', 'Coffee Addicts', 'Cooks', 'Book Lovers', 'Board Game Enthusiast', 'Movie Nerds', 'Gym Rats', 'Skaters', "Car Lovers", "Gamers", "Gardeners", "Metal Workers", "Animal Rights Activists", "Remote Learning", "Rock Climbers", "Dog Trainers", "Personal Trainers", "Pokemon Trainers", "Arborists", "Wookies", "Grateful Dead Heads", "Electronic Musicians", "Lego Builders", "Artists", "Painters", "Javascript Developers", "Web Developers", "Mobile Developers", "VSCode Users", "Music Festival Goers", "Hair Stylists", "Doctors", "Data Scientists", "Data Analysts", "Fast Food Junkies", "Insomniacs", "Cyclists", "Families", "Vegans", "Snowboarders", "Tennis Players", "Indie Musicians", "Weight Lifters", "Home Aqauriums", "Recipes", "Home Decorators", "Landscape Architects", "Beer Drinkers", "Wine Snobs", "Car Maintenance", "Youtube Creators", "Social Media Influencers", "Thrift Stores", "Popup Shops", "Farmers Markets", "Indoor Plant Fanatics", "Comic Book Fans", "Astronomers", "Service Industry Workers", "Comppany Founders", "Lawyers", "Politicians", "Football Players", "Soccer Players", "Mobile Developers", "Dual Citizens", "Craft Breweries", "Tea Shops", "Hackers", "Everyone", "Animals", "Philosophers"]
    }
});

export default app;
