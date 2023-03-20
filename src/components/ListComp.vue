<script setup lang="ts">
  import { ref, defineProps } from 'vue';
  import { useSnackbarStore } from '@/stores/snackbar';

  let input = ref<string>('');
  const store = useSnackbarStore();
  const emit = defineEmits(['remove']);
  const props = defineProps({
      list: Array<string>,
      label: String
  });

  function addValue(): void {
    if(input.value === '') {
      store.displayMessage('Empty value not allowed');
    }
    else {
      props.list?.push(input.value);
      input.value = '';
    }
  }
</script>


<template>
  <v-text-field v-model="input" :label="props.label"></v-text-field>
  <v-btn variant="outlined" @click="addValue">Add</v-btn>
  <div>
    <v-chip-group>
      <v-chip v-for="value in props.list" @click="emit('remove', value)">
        {{ value }}
      </v-chip>
    </v-chip-group>
  </div>
</template>