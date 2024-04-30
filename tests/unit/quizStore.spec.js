import { setActivePinia, createPinia } from 'pinia';
import { useQuizStore } from '@/stores/quizStore';  

describe('useQuizStore', () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it('Charger des questions', () => {
    const store = useQuizStore();
    const questions = [{ question: 'Question 1' }, { question: 'Question 2' }];
    
    store.loadQuestions(questions);

    expect(store.questions).toEqual(questions);
  });

  it('Met à jour le score et l\'index de la question lors de la réponse', () => {
    const store = useQuizStore();
    store.answerQuestion(true);

    expect(store.score).toBe(1);
    expect(store.currentQuestionIndex).toBe(1);
    

    store.answerQuestion(false); 

    expect(store.score).toBe(1);
    expect(store.currentQuestionIndex).toBe(2);
  });

  it('Réinitialiser le quiz', () => {
    const store = useQuizStore();
    store.answerQuestion(true);
    store.resetQuiz();         
    
    expect(store.score).toBe(0);
    expect(store.currentQuestionIndex).toBe(0);
  });

  it('Retourner la question actuelle', () => {
    const store = useQuizStore();
    const questions = [{ question: 'Question 1' }, { question: 'Question 2' }];
    
    store.loadQuestions(questions);

    expect(store.currentQuestion).toStrictEqual(questions[0]); 
    store.answerQuestion(false); 
    expect(store.currentQuestion).toStrictEqual(questions[1]); 
  });

  it('Indiquer si le quiz est terminé', () => {
    const store = useQuizStore();
    const questions = [{ question: 'Question 1' }];
    
    store.loadQuestions(questions);
    expect(store.isQuizComplete).toBe(false); 

    store.answerQuestion(false); 
    expect(store.isQuizComplete).toBe(true);
  });
});
