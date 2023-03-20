<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useGameStore } from '@/stores/game';   
  import router from '@/router';

  let currentPlayer: number = 0;
  let currentWord: number = 0;
  let score: number = 0;
  let player = ref<string>();
  let word = ref<string>();
  let gameStarted = ref<boolean>(false);
  const store = useGameStore();

  onMounted(() => {
    player.value = store.playersOrder[currentPlayer];
    word.value = store.roundWordsList[currentWord];
  });

  function onCountdownEnd(): void {
    const index = store.teams.findIndex(team => team.first.includes(store.playersOrder[currentPlayer]) || team.second.includes(store.playersOrder[currentPlayer]));
    store.teams[index].score = store.teams[index].score + score;
    score = 0;
    currentPlayer = currentPlayer === store.playersOrder.length-2 ? 1 : (currentPlayer === store.playersOrder.length-1 ? 0 : currentPlayer + 2);
    player.value = store.playersOrder[currentPlayer];
    gameStarted.value = false;
    setNewWord();
  }

  function setNewWord(): void {
    currentWord = randomExcluded(currentWord);
    word.value = store.roundWordsList[currentWord];
  }

  function randomExcluded(excluded: number): number {
    var n = excluded;
    while (n === excluded)
      n = Math.floor(Math.random() * (store.roundWordsList.length-1 - 0) + 0);
    return n;
  }

  function validateWord(): void {
    score = score + 1;
    store.roundWordsList = store.roundWordsList.filter(elt => elt !== word.value);
    if(store.roundWordsList.length === 0) {
      const index = store.teams.findIndex(team => team.first.includes(store.playersOrder[currentPlayer]) || team.second.includes(store.playersOrder[currentPlayer]));
      store.teams[index].score = store.teams[index].score + score;
      router.push({ name: "score" });
    }
    else setNewWord();
  }
</script>
    

<template>
  <div class="game">
    <h1 v-if="!gameStarted">{{  player }}</h1>
    <vue-countdown v-if="gameStarted" :time="5000" v-slot="{ seconds }" @end="onCountdownEnd">
      <p class="game-seconds">{{ seconds }}</p>
    </vue-countdown>
    <v-btn v-if="!gameStarted" variant="outlined" @click="gameStarted = true;">
      Go
    </v-btn>
    <div v-else>
      <p class="game-word">{{  word }}</p>
      <v-btn variant="outlined" @click="setNewWord">
        Pass
      </v-btn>
      <v-btn variant="outlined" @click="validateWord">
        Validate
      </v-btn>
    </div>
  </div>
</template>


<style lang="scss">
  .game {
    h1 {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    p {
      text-align: center;
      &.game-seconds {
        font-size: 5rem;
      }
      &.game-word {
        margin-bottom: 1.5rem;
        font-size: 3rem;
      }
    }
  }
</style>