<template>
    <div class="container">
        <div class="container_first_child">
            <div class="icon_container">
                <Icon icon="ph:check-bold" />
            </div>
            <div>Félicitation {{storedName}}</div>
            <p>Votre score : {{ score }}/{{ total }}</p>
            <div>
              <button @click="reset" class="restartBtn">Recommencer</button>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  /* eslint-disable */
  import { onMounted } from 'vue';
  import { useLocalStorage } from '@vueuse/core';
  import { useRouter } from 'vue-router';
  import { Icon } from '@iconify/vue';
  const storedName = useLocalStorage('user-name', '');

  const router = useRouter();

  const props = defineProps({
    score: Number,
    total: Number,
  });
  
  //fonction d'emission des évenements
  const emit = defineEmits(['reset-quiz']);
  
  const reset = () => {
    emit('reset-quiz');
  };

  onMounted(() => {
    if (storedName.value.trim() !== '') {
        router.replace('/quiz');
    }
})

  </script>
  <style scoped>

  .container{
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  
  .container_first_child{
      background-color: white;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 15px;
      padding: 20px 30px;
      border-radius: 10px;
      width: 300px;
  }
  
  .icon_container{
      background-color: #004643;
      color: white;
      height: 60px;
      width: 60px;
      border-radius: 50%;
      font-size: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  
  .restartBtn{
      border: none;
      background-color: #004643;
      border-radius: 5px;
      padding: 10px;
      font-size: 18px;
      color: white;
      cursor: pointer;
  }

  .container_first_child div:nth-child(n+1){
    text-align: center;
  }
  
  </style>
  