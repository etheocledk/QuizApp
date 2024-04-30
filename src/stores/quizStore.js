import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useQuizStore = defineStore('quiz', () => {

  const questions = ref([]);

  const currentQuestionIndex = ref(0);

  const score = ref(0);

  //fonction pour charger les questions dans le store.
  const loadQuestions = (quizQuestions) => {
    questions.value = quizQuestions;
  };

  // fonction pour mettre à jour le score et l'index de la question.
  const answerQuestion = (isCorrect) => {
    if (isCorrect) {
      score.value++;
    }
    currentQuestionIndex.value++;
  };

  // fonction pour réinitialiser le quiz .
  const resetQuiz = () => {
    currentQuestionIndex.value = 0;
    score.value = 0;
  };

  //fonction pour retourner la question actuelle à poser.
  const currentQuestion = computed(() => {
    return questions.value[currentQuestionIndex.value];
  });

  //fonction pour indiquer si le quiz est terminé.
  const isQuizComplete = computed(() => {
    return currentQuestionIndex.value >= questions.value.length;
  });

  return {
    questions,
    currentQuestionIndex,
    score,
    loadQuestions,
    answerQuestion,
    resetQuiz,
    currentQuestion,
    isQuizComplete,
  };
});
