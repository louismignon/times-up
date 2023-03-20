import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import WordsView from '@/views/WordsView.vue';
import ScoreView from '@/views/ScoreView.vue';
import GameView from '@/views/GameView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/words',
      name: 'words',
      component: WordsView
    },
    {
      path: '/score',
      name: 'score',
      component: ScoreView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    }
  ]
});

export default router;
