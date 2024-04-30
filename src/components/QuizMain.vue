<template>
  <div>
    <div v-if="isQuizEnd">
      <QuizResult :score="store.score" :total="store.questions.length" @reset-quiz="resetQuiz" />
    </div>
    <div v-else>
      <QuizQuestion :question="store.questions[store.currentQuestionIndex]" :total="store.questions.length" @answer="handleAnswer" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { onMounted } from 'vue';
import { useQuizStore } from '../stores/quizStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';
import QuizQuestion from './QuizQuestion.vue';
import QuizResult from './QuizResult.vue';

const storedName = useLocalStorage('user-name', '');

const router = useRouter();

const store = useQuizStore();

const handleAnswer = (isCorrect) => {
  store.answerQuestion(isCorrect);
};

const resetQuiz = () => {
  store.resetQuiz();
};


//function random
const shuffle = (array) =>{
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}


onMounted(async () => {
  if (storedName.value.trim() !== '') {
        router.replace('/quiz');
    }
    
  const response = await fetch('/questions.json');
  const data = await response.json();
  store.loadQuestions(shuffle(data.questions).slice(0, 10));
});

const isQuizEnd = computed(() => store.currentQuestionIndex >= store.questions.length);
</script>