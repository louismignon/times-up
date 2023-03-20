<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useGameStore } from '@/stores/game';
    import { useSnackbarStore } from '@/stores/snackbar';
    import ListComp from '../components/ListComp.vue';
    import router from '@/router';

    interface Team {
      first: string,
      second: string,
      score: number
    };

    let nameIndex: number = 0;
    let name = ref<string>('');
    let playerWords = ref<Array<string>>([]);
    const gameStore = useGameStore();
    const snackbarStore = useSnackbarStore();
    const playersNumber: number = gameStore.playersList.length;

    onMounted(() => {
      name.value = gameStore.playersList[nameIndex];
      setPlayersTeam();
    });

    function setPlayersTeam(): void {
      gameStore.playersOrder = [...gameStore.playersList].sort(() => Math.random() - 0.5);
      const teams: Team[] = [];
      for(var i=0; i < gameStore.playersOrder.length; i=i+2) {
        teams.push({
          first: gameStore.playersOrder[i],
          second: gameStore.playersOrder[i+1],
          score: 0
        });
      }
      gameStore.teams = teams;
    }

    function remove(value: string): void {
      playerWords.value = playerWords.value.filter(elt => elt !== value);
    }

    function changePlayer(): void {
      if(playerWords.value.length !== gameStore.wordsNumberPerPlayer) {
        snackbarStore.displayMessage('Some words are missing or there are too many');
      } else {
        if(nameIndex === playersNumber-1) {
          gameStore.wordsList = gameStore.wordsList.concat(playerWords.value);
          router.push({ name: "score" });
        }
        else {
          gameStore.wordsList = gameStore.wordsList.concat(playerWords.value);
          nameIndex = nameIndex + 1;
          name.value = gameStore.playersList[nameIndex];
          playerWords.value = [];
        };
      }
    }
</script>


<template>
  <div class="words">
    <h1>{{ name }}</h1>
    <ListComp :list="playerWords" :label="'Word'" @remove="remove"/>
    <v-btn class="words-next-btn" variant="outlined" @click="changePlayer">
      Next
    </v-btn>
  </div>
</template>


<style lang="scss">
  .words {
    h1 {
      text-align: center;
    }
    .words-next-btn {
      margin-top: 1.5rem;
    }
  }
</style>