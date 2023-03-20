<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useGameStore } from '@/stores/game';

    let winners = ref<string>();
    const store = useGameStore();

    onMounted(() => {
      store.roundWordsList = store.wordsList.sort(() => Math.random() - 0.5);
      if(store.round === 3) {
        let bestTeam: any = {score: 0};
        store.teams.forEach(team => {
          if(team.score > bestTeam.score) bestTeam = team;
        });
        winners.value = bestTeam.first + ' / ' + bestTeam.second;
      }
    });
</script>


<template>
  <div class="score">
    <div class="score-team" v-for="team in store.teams">
      <span>
        <v-icon icon="mdi-account-outline"></v-icon>
        {{ team.first }}
      </span>
      <span>
        <v-icon icon="mdi-account-outline"></v-icon>
        {{ team.second }}
      </span>
      <span>
        Score : {{ team.score }}
      </span>
    </div>
    <router-link v-if="store.round < 3" to="/game" custom v-slot="{ navigate }">
      <v-btn variant="outlined" @click="navigate(); store.round++;" role="link">
        Play
      </v-btn>
    </router-link>
    <span v-else> The winners are {{  winners }}</span>
  </div>
</template>


<style lang="scss">
  .score {
    .score-team {
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      display: flex;
      flex-direction: column;
    }
  }
</style>