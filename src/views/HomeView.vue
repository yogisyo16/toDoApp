<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import IcLogoTodos from "@/assets/icons/IcLogoTodos.vue"; // Adjust path as needed

const router = useRouter();
const isMenuOpen = ref(false);

const navigateTo = (path: string) => {
    router.push(path);
    isMenuOpen.value = false;
};
</script>

<template>
    <div class="min-h-screen bg-gray-900">
        <header class="bg-gray-800 shadow-md">
            <nav class="mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center gap-1.5">
                        <IcLogoTodos />
                        <h1 class="text-xl font-bold text-white">RootAura</h1>
                    </div>

                    <!-- Desktop Menu -->
                    <div class="hidden md:flex space-x-4">
                        <button
                            @click="navigateTo('/todos')"
                            class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                        >
                            Todos
                        </button>
                        <button
                            class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                        >
                            Calendar
                        </button>
                        <button
                            @click="navigateTo('/settings')"
                            class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                        >
                            Settings
                        </button>
                    </div>

                    <!-- Mobile Menu Button -->
                    <div class="md:hidden">
                        <button
                            @click="isMenuOpen = !isMenuOpen"
                            class="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <svg
                                class="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    v-if="!isMenuOpen"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    v-else
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Mobile Menu -->
                <div v-if="isMenuOpen" class="md:hidden pb-4">
                    <button
                        @click="navigateTo('/todos')"
                        class="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors mb-2"
                    >
                        Todos
                    </button>
                    <button
                        @click="navigateTo('/settings')"
                        class="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                    >
                        Settings
                    </button>
                </div>
            </nav>
        </header>

        <main class="py-6">
            <router-view />
        </main>
    </div>
</template>
