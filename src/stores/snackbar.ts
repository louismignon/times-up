import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('snackbar', () => {
  let displaySnackbar = ref<boolean>(false);
  let snackbarText = ref<string>();

  function displayMessage(message: string): void {
    displaySnackbar.value = true;
    snackbarText.value = message;
  }

  return { displaySnackbar, snackbarText, displayMessage }
})
