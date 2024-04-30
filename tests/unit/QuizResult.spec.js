import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import QuizResult from '@/components/QuizResult.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
});

describe('QuizResult.vue', () => {
  it('Afficher le score correctement', () => {
    const wrapper = mount(QuizResult, {
      props: {
        score: 8,
        total: 10,
      },
      global: {
        plugins: [router], 
      },
    });

    expect(wrapper.find('p').text()).toContain('8/10');
  });

  it('Emettre "reset-quiz" lorsque le bouton "Recommencer" est cliqué', async () => {
    const wrapper = mount(QuizResult, {
      global: {
        plugins: [router], 
      },
    });

    await wrapper.find('.restartBtn').trigger('click');
    expect(wrapper.emitted('reset-quiz')).toBeTruthy();
  });
});
