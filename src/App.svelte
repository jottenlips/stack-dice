<script>
  export let backend;
  export let api;
  export let frontend;
  export let mobile;
  export let ideas;
  export let topics;

  let randomBackend = 0;
  let randomAPI = 0;
  let randomFrontend = 0;
  let randomMobile = 0;
  let randomIdea = 0;
  let randomTopic = 0;

  const getRandom = (max) => {
    return Math.floor(Math.randomBackend() * max);
  };

  const getRandomApp = () => {
    randomBackend = getRandom(backend.length);
    randomAPI = getRandom(api.length);
    randomFrontend = getRandom(frontend.length);
    randomMobile = getRandom(mobile.length);
    randomIdea = getRandom(ideas.length);
    randomTopic = getRandom(topics.length);
  };

  let hasBackend = true;
  let hasAPI = true;
  let hasFrontend = true;
  let hasMobile = false;

  const toggleHasBackend = () => {
    hasBackend = !hasBackend;
  };
  const toggleHasAPI = () => {
    hasAPI = !hasAPI;
  };
  const toggleHasFrontend = () => {
    hasFrontend = !hasFrontend;
  };

  const toggleHasMobile = () => {
    hasMobile = !hasMobile;
  };
</script>

<main>
  <h1>
    Build a {ideas[randomIdea]} for {topics[randomTopic]} with {hasBackend
      ? `${backend[randomBackend]}, `
      : ""}{hasAPI || hasMobile ? `${api[randomAPI]}, ` : ""}
  </h1>
  <button on:click={getRandomApp}>Roll Dice For App</button>
  <button on:click={toggleHasBackend}>
    Backend: {hasBackend}
  </button>

  <button on:click={toggleHasAPI}>
    API: {hasAPI}
  </button>
  <button on:click={toggleHasFrontend}>
    Frontend: {hasFrontend}
  </button>
  <button on:click={toggleHasMobile}>
    Mobile: {hasMobile}
  </button>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
