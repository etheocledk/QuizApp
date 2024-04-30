import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import QuizMain from '@/components/QuizMain.vue';
import { useQuizStore } from '@/stores/quizStore';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ questions: [{ question: "Q1" }, { question: "Q2" }] }),
  })
);

describe('QuizMain.vue Tests', () => {
  let router;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/quiz', component: { template: '<div>Quiz</div>' } },
      ],
    });

    router.push('/');
  });

  it('Afficher le composant QuizQuestion lorsque le quiz n\'est pas terminé', async () => {
    const store = useQuizStore(pinia);
    store.loadQuestions([{ question: 'Sample Question', choices: ['A', 'B', 'C'], correctAnswer: 0 }]);
    store.resetQuiz();

    const wrapper = mount(QuizMain, {
      global: {
        plugins: [pinia, router],
      },
    });

    await router.isReady(); 
    await flushPromises(); 

    expect(wrapper.findComponent({ name: 'QuizQuestion' }).exists()).toBeTruthy();
  });

  it('Afficher le composant QuizResult lorsque le quiz est terminé', async () => {
    const store = useQuizStore(pinia);
    store.loadQuestions([{ question: 'Sample Question', choices: ['A', 'B', 'C'], correctAnswer: 0 }]);
    store.answerQuestion(true);
    store.answerQuestion(true); 

    const wrapper = mount(QuizMain, {
      global: {
        plugins: [pinia, router],
      },
    });

    await router.isReady();
    await flushPromises(); 

    expect(wrapper.findComponent({ name: 'QuizResult' }).exists()).toBeTruthy();
  });
});
