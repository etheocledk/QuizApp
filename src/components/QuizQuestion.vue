<template>
  <div class="container">
    <div class="app-main">
      <p class="quiz-number">{{ numberOfQuestion }} / {{ total }}</p>
      <div class="quiz-main">
        <div><span>{{ timer }}</span> <span>s</span></div>
        <p>{{ question?.question || 'Chargement...' }}</p>
      </div>
      <div class="choice-container">
        <div v-for="(choice, index) in question?.choices || []" :class="{ active: activeIndex === index }" :key="index"
          class="choice-skeleton" @click="choose(index)">
          <p>{{ choice }}</p>
          <div class="circle" :class="{ circle_choose: activeIndex === index }">
            <Icon v-if="activeIndex === index" icon="ph:check-bold" />
          </div>
        </div>
      </div>
      <button @click="next">Suivant</button>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  question: Object,
  total: Number,
});

const emit = defineEmits(['answer']);

const numberOfQuestion = ref(1); 
const activeIndex = ref(null);
const timer = ref(30);
let intervalId = null;

// fonction pour choisir une réponse
const choose = (index) => {
  activeIndex.value = index;
};

// fonction de démarrage du chronomètre
const startTimer = () => {
  if (intervalId) {
    clearInterval(intervalId); 
  }
  timer.value = 30; 
  intervalId = setInterval(() => {
    timer.value--;
    if (timer.value <= 0) {
      clearInterval(intervalId);
      numberOfQuestion.value += 1;
      emit('answer', false); 
      timer.value = 30; 
      startTimer(); 
      activeIndex.value = null;
    }
  }, 1000);
};

//fonction de réponse à la question
const answer = (isCorrect) => {
  numberOfQuestion.value += 1;
  emit('answer', isCorrect);
  timer.value = 30; 
  startTimer();
};

// fonction pour switcher à la question suivante
const next = () => {
  const isCorrect = activeIndex.value === props.question.correctAnswer;
  answer(isCorrect);
  activeIndex.value = null;
};

// Démarrer le chronomètre au montage
onMounted(() => {
  startTimer();
});

// Supprimer l'intervalle au démontage
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>
<style scoped>
.container {
  background-color: #004643;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-main {
  background-color: #e7dddd;
  padding: 25px;
  border-radius: 5px;
}

.quiz-number {
  text-align: center;
  margin-bottom: 3.5rem;
}

.quiz-main {
  background-color: white;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
  border-radius: 10px;
  width: 383px;
  height: 229px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quiz-main div {
  background-color: white;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-left: 8px solid #ABD1C6;
  border-top: 8px solid #ABD1C6;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -35px;
  left: 145px;
}

.quiz-main p {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
}

.choice-container {
  margin-top: 3rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.choice-skeleton {
  background-color: white;
  border-radius: 15px;
  padding: 18px 25px;
  display: flex;
  justify-content: space-between;
}

.choose {
  background-color: #ABD1C6;
}

.circle {
  border: 1px solid black;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  padding: 2px;
}

.circle_choose {
  background-color: #004643;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
}


button {
  border: none;
  background-color: #004643;
  font-weight: 600;
  color: white;
  border-radius: 10px;
  width: 100%;
  margin-top: 70px;
  margin-bottom: 40px;
  padding: 15px 0;
  font-size: 18px;
  cursor: pointer;
}


.active {
  background-color: lightblue;
  font-weight: bold;
}

@media(max-width: 450px) {
  .quiz-main{
    width: 325px;
  }

  button {
  margin-top: 25px;
  margin-bottom: 15px;
}

.choice-container {
  margin-top: 1.5rem;
}

.choice-container {
  gap: 12px;
}

.app-main {
    padding: 15px;
  }
}

@media(max-width: 320px) {
  .quiz-main{
    width: 240px;
  }

  
}
</style>