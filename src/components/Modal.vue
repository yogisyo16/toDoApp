<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
    isOpen: boolean;
    title?: string;
}>();

const emit = defineEmits(["close"]);

const handleClose = () => {
    emit("close");
};
</script>

<template>
    <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        leave-active-class="transition-opacity duration-300 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
    >
        <div
            v-if="isOpen"
            class="fixed inset-0 z-9998 flex bg-black bg-opacity-50"
            @click.self="handleClose"
        >
            <div class="w-full flex justify-center items-start pt-12 px-4">
                <Transition
                    enter-active-class="transition-transform duration-300 ease-out"
                    leave-active-class="transition-transform duration-300 ease-in"
                    enter-from-class="scale-110"
                    leave-to-class="scale-110"
                >
                    <div
                        v-if="isOpen"
                        class="w-full max-w-lg bg-white rounded-lg shadow-lg font-sans"
                    >
                        <!-- Header -->
                        <div
                            class="relative px-6 py-4 border-b border-gray-200"
                        >
                            <h3 class="text-xl font-semibold text-gray-900 m-0">
                                {{ title || "Modal Title" }}
                            </h3>
                            <button
                                @click="handleClose"
                                class="absolute top-4 right-4 text-2xl leading-none text-gray-600 hover:text-black bg-transparent border-none cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>

                        <!-- Body -->
                        <div class="px-6 py-5">
                            <slot name="body"></slot>
                        </div>

                        <!-- Footer -->
                        <div class="px-6 py-4 border-t border-gray-200">
                            <slot name="footer">
                                <button
                                    @click="handleClose"
                                    class="bg-emerald-500 text-white px-4 py-2 rounded border-none cursor-pointer hover:bg-emerald-600 transition-colors"
                                >
                                    OK
                                </button>
                            </slot>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </Transition>
</template>
