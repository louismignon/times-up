import { ref } from 'vue';
import { defineStore } from 'pinia';

interface Team {
  first: string,
  second: string,
  score: number
}

export const useGameStore = defineStore('game', () => {
  const wordsNumberPerPlayer = ref<number>(0);
  const playersList = ref<Array<string>>([]);
  const playersOrder = ref<Array<string>>([]);
  const teams = ref<Array<Team>>([]);
  const wordsList = ref<Array<string>>([]);
  const roundWordsList = ref<Array<string>>([]);
  const round = ref<number>(0);

  return { wordsNumberPerPlayer, playersList, playersOrder, teams, wordsList, roundWordsList, round }
})
