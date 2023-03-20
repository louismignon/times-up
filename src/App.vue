<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { useSnackbarStore } from '@/stores/snackbar';
  const store = useSnackbarStore();
</script>

<template>
  <RouterView />
  <v-snackbar v-model="store.displaySnackbar" timeout="3000">
    {{ store.snackbarText }}
  </v-snackbar>
</template>
