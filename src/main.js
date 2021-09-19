import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        backend: ['Ruby on Rails', 'Django', 'Serverless Cloud', 'Meteor', 'Flask', 'Sinatra', 'FastAPI'],
        api: ['GraphQL', 'REST'],
        frontend: ['React', 'Svelte', 'Vue', 'Vanilla'],
        mobile: ['React Native', 'Flutter', 'Kotlin Multiplatform', 'Swift/Xcode', 'Java/Android Studio', 'PWA'],
        ideas: ['Chat App', 'Game', ''],
        topics: ['Cats', 'Coffee', 'Cooking']
    }
});

export default app;