<script setup lang="ts">
  import { ref } from 'vue';
  import { useGameStore } from '@/stores/game';
  import { useSnackbarStore } from '@/stores/snackbar';
  import router from '@/router';
  import ListComp from '../components/ListComp.vue';

  let inputNumber = ref<string>();
  const gameStore = useGameStore();
  const snackbarStore = useSnackbarStore();

  function remove(value: string): void {
    gameStore.playersList = gameStore.playersList.filter(elt => elt !== value);
  }

  function saveWordsNumber(): void {
    const number = parseInt(inputNumber.value ? inputNumber.value : '0');
    if(gameStore.playersList.length === 0) {
      snackbarStore.displayMessage('You need players');
    } else if ( gameStore.playersList.length % 2 === 1) {
      snackbarStore.displayMessage('You need an even number of people');
    } else if ( number < 1) {
      snackbarStore.displayMessage('You need at least one word per person');
    } else {
      gameStore.wordsNumberPerPlayer = number;
      router.push({ name: "words" });
    }
  }
</script>


<template>
  <div class="home">
    <v-btn variant="outlined" @click="saveWordsNumber">
      Choosing words
    </v-btn>
    <v-text-field
      v-model="inputNumber"
      label="Number of words"
      type="number"
    ></v-text-field>
    <ListComp :list="gameStore.playersList" :label="'Name'" @remove="remove"/>
  </div>
</template>