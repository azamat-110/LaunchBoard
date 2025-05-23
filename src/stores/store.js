import {defineStore} from 'pinia';

export const useLaunches = defineStore('launches', {
    state: () => ({
        launches: [],
        error: null,
    }),
    actions: {
        async loadLaunches() {
            this.error = null;
            try {
                const res = await fetch('https://main.proweb.uz/api/v1/launches/external/course/research/');
                if (!res.ok) throw new Error('Ошибка загрузки');
                const data = await res.json();
                this.launches = data.results;
            } catch (e) {
                this.error = e.message;
            }
        }
    }
})




