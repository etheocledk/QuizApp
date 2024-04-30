import { mount } from '@vue/test-utils';
import QuizQuestion from '@/components/QuizQuestion.vue';

describe('QuizQuestion', () => {
  it('Afficher le bon nombre de questions', () => {
    const wrapper = mount(QuizQuestion, {
      props: { total: 10, question: { question: 'Combien de planètes composent notre système solaire ?', choices: ['7', '8', '9', '10'], correctAnswer: 1 } },
    });
    const quizNumber = wrapper.find('.quiz-number').text();
    expect(quizNumber).toContain('1 / 10');
  });

  it('Mettre à jour l\'index actif lors du clic', async () => {
    const wrapper = mount(QuizQuestion, {
      props: {
        question: {
          question: 'Quelle est la capitale de la France?',
          choices: ['Paris', 'Lyon', 'Marseille'],
          correctAnswer: 0,
        },
      },
    });

    const choice = wrapper.findAll('.choice-skeleton').at(0);
    await choice.trigger('click');

    expect(wrapper.vm.activeIndex).toBe(0); 
  });

  it('Afficher le chronomètre', async () => {
    const wrapper = mount(QuizQuestion);
    expect(wrapper.vm.timer).toBe(30); 
  });

  it('Emettre un événement lors de la réponse', async () => {
    const wrapper = mount(QuizQuestion, {
      props: {
        question: {
          question: 'Quelle est la capitale de la France?',
          choices: ['Paris', 'Lyon', 'Marseille'],
          correctAnswer: 0,
        },
      },
    });

    const choice = wrapper.findAll('.choice-skeleton').at(0);
    await choice.trigger('click');
    await wrapper.vm.next();

    expect(wrapper.emitted('answer')).toBeTruthy(); 
  });
});
