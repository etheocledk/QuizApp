<template>
    <div class="container ">
        <div class="main">
            <div class="circle">
                <h1>Quiz</h1>
                <span>App</span>
            </div>
            <div>
                <label for="name">Entrez votre nom</label>
                <div class="input_container">
                    <input type="text" v-model="name" name="name" id="name">
                </div>
                <p class="error_text" v-text="errorText"></p>
            </div>
            <button @click="startQuiz">Commencer</button>
        </div>
    </div>
</template>
<script setup>
/* eslint-disable */
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';
import { onMounted } from 'vue';

const name = ref('');
const errorText = ref('');
const storedName = useLocalStorage('user-name', '');

const router = useRouter();

const startQuiz = () => {
    if (name.value != '') {
        storedName.value = name.value;
        router.replace('/quiz');
    } else {
        errorText.value = "Veuillez bien remplir le champ"
    }

};


onMounted(() => {
    if (storedName.value.trim() !== '') {
        router.replace('/quiz');
    }
})

</script>

<style scoped>
.container {
    background-color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main {
    background-color: #004643;
    max-width: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 180px;
    padding: 40px 40px;
    border-radius: 10px;
}

.circle {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.circle h1 {
    color: #004643;
}

.circle span {
    color: #F8C660;
}

.input_container {
    width: 350px;
    height: 45px;
}

label {
    color: white;
}

.input_container input {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    background-color: transparent;
    border: 2px solid white;
    border-radius: 8px;
    padding-left: 10px;
    color: white;
    font-size: 16px;
}

.input_container input:focus {
    outline: none;
}

button {
    border: none;
    background-color: #F8C660;
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

button:hover {
    background-color: #d49c2c;
}

.error_text {
    font-size: 14px;
    color: rgb(250, 117, 117);
    font-style: italic;
    margin-top: 15px;
}

@media(max-width: 450px) {
    .main {
        max-width: 380px;
    }

    .input_container {
        width: 350px;
    }

    .main {
        gap: 140px;
        padding: 18px;
    }
}

@media(max-width: 320px) {
    .main {
        max-width: 280px;
    }

    .input_container {
        width: 240px;
    }
}
</style>