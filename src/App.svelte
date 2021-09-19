<script>
  export let database;
  export let backend;
  export let api;
  export let frontend;
  export let mobile;
  export let ideas;
  export let audiences;

  let hasDatabase = false;
  let hasBackend = true;
  let hasFrontend = true;
  let hasMobile = false;

  const toggleHasDatabase = () => {
    hasDatabase = !hasDatabase;
  };

  const toggleHasBackend = () => {
    hasBackend = !hasBackend;
  };

  const toggleHasFrontend = () => {
    hasFrontend = !hasFrontend;
  };

  const toggleHasMobile = () => {
    hasMobile = !hasMobile;
  };

  let lockAudience = false;
  let lockIdea = false;
  let lockDatabase = false;
  let lockBackend = false;
  let lockFrontend = false;
  let lockMobile = false;

  const toggleLockAudience = () => {
    lockAudience = !lockAudience;
  };

  const toggleLockIdea = () => {
    lockIdea = !lockIdea;
  };

  const toggleLockDatabase = () => {
    lockDatabase = !lockDatabase;
  };

  const toggleLockBackend = () => {
    lockBackend = !lockBackend;
  };

  const toggleLockFrontend = () => {
    lockFrontend = !lockFrontend;
  };

  const toggleLockMobile = () => {
    lockMobile = !lockMobile;
  };

  let randomDatabase = 0;
  let randomBackend = 0;
  let randomAPI = 0;
  let randomFrontend = 0;
  let randomMobile = 0;
  let randomIdea = 0;
  let randomAudience = 0;

  const getRandom = (max) => {
    return Math.floor(Math.random() * max);
  };

  const getRandomApp = () => {
    if (!lockDatabase) randomDatabase = getRandom(database.length);
    if (!lockBackend) randomBackend = getRandom(backend.length);
    if (!lockBackend) randomAPI = getRandom(api.length);
    if (!lockFrontend) randomFrontend = getRandom(frontend.length);
    if (!lockMobile) randomMobile = getRandom(mobile.length);
    if (!lockIdea) randomIdea = getRandom(ideas.length);
    if (!lockAudience) randomAudience = getRandom(audiences.length);
  };

  getRandomApp();
</script>

<main>
  <h1>
    Build a <span style="font-weight: 500;">{ideas[randomIdea]}</span> for
    <span style="font-weight: 500;">{audiences[randomAudience]}</span>
    with {"\n"}
    <a
      href={`https://github.com/search?ref=simplesearch&q=${backend[randomBackend]}`}
      >{hasBackend ? `${backend[randomBackend]}\n` : ""}</a
    >
    <a href={`https://github.com/search?ref=simplesearch&q=${api[randomAPI]}`}
      >{(hasFrontend || hasMobile) && hasBackend
        ? `${api[randomAPI]}\n`
        : ""}</a
    ><a
      href={`https://github.com/search?ref=simplesearch&q=${frontend[randomFrontend]}`}
      >{hasFrontend ? `${frontend[randomFrontend]}\n` : ""}</a
    ><a
      href={`https://github.com/search?ref=simplesearch&q=${mobile[randomMobile]}`}
      >{hasMobile ? `${mobile[randomMobile]}\n` : ""}<a
        href={`https://github.com/search?ref=simplesearch&q=${database[randomDatabase]}`}
        >{hasDatabase ? `${database[randomDatabase]}\n` : ""}</a
      >
    </a>
  </h1>
  <p>
    <button
      style="background-color:#7496db;border-radius:2px"
      on:click={getRandomApp}>Roll 🎲 For App</button
    >
    {"\n"}
    Settings:
    {"\n"}
  </p>
  <button on:click={toggleHasBackend}>
    Backend: {hasBackend}
  </button>

  <button on:click={toggleHasFrontend}>
    Frontend Framework: {hasFrontend}
  </button>
  <button on:click={toggleHasMobile}>
    Mobile: {hasMobile}
  </button>
  <button on:click={toggleHasDatabase}>
    Pick Database: {hasDatabase}
  </button>

  <p>
    {"\n"}
    Locks:
    {"\n"}
  </p>

  <button on:click={toggleLockIdea}>
    Keep Idea: {lockIdea}
  </button>
  <button on:click={toggleLockAudience}>
    Keep Audience: {lockAudience}
  </button>
  <button on:click={toggleLockBackend}>
    Keep Backend: {lockBackend}
  </button>
  <button on:click={toggleLockFrontend}>
    Keep Frontend: {lockFrontend}
  </button>
  <button on:click={toggleLockMobile}>
    Keep Mobile: {lockMobile}
  </button>
  <button on:click={toggleLockDatabase}>
    Keep Database: {lockDatabase}
  </button>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    height: 200vh;
  }

  h1 {
    color: #000000;
    font-size: 3em;
    font-weight: 200;
    white-space: pre-line;
  }
  p {
    white-space: pre-line;
    color: #000000;
  }

  a {
    color: #7496db;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
