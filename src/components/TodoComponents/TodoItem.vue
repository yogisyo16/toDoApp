<script setup lang="ts">
import { ref } from "vue";
import type { Todo } from "@/services/todoServices/type";

// Define props
const props = defineProps<{
    todo: Todo;
    formatDate: (date: string) => string;
}>();

// Define emits
const emit = defineEmits<{
    delete: [id: string];
}>();

// Local state for this todo item
const openMenuId = ref(false);
const showDetails = ref(false);

const toggleMenu = () => {
    openMenuId.value = !openMenuId.value;
};

const closeMenu = () => {
    openMenuId.value = false;
};

const toggleDetails = () => {
    showDetails.value = !showDetails.value;
};

const handleEdit = () => {
    console.log("Edit todo:", props.todo.id);
    // TODO: Implement edit functionality
    closeMenu();
};

const handleDetails = () => {
    console.log("View details:", props.todo.id);
    // TODO: Implement details view
    closeMenu();
};

const handleDelete = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
        emit("delete", props.todo.id);
        closeMenu();
    }
};
</script>

<template>
    <li
        class="flex justify-between items-center bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
    >
        <div>
            <strong class="block text-white text-lg">{{ todo.task }}</strong>
            <small class="text-gray-400"
                >Start: {{ formatDate(todo.date_start) }}</small
            >
            <br />
            <small class="text-gray-400"
                >Due: {{ formatDate(todo.date_due) }}</small
            >
            <br />

            <!-- Show Details Button -->
            <div
                v-if="
                    todo.todo_details?.task_details ||
                    todo.todo_details?.note_details ||
                    todo.todo_details?.status_details ||
                    todo.todo_details?.priority_details
                "
                :class="showDetails ? 'pt-1 pb-3' : 'pt-1'"
            >
                <button
                    @click="toggleDetails"
                    class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        :class="{ 'rotate-180': showDetails }"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        style="transition: transform 0.2s"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    {{ showDetails ? "Hide Details" : "Show Details" }}
                </button>
            </div>

            <!-- Details Section -->
            <div
                v-if="showDetails"
                class="flex flex-col gap-1 md:gap-1.5 pt-3 mt-3 border-t border-gray-700"
            >
                <p class="block text-white font-semibold">Details:</p>
                <div class="flex flex-row gap-4">
                    <div class="flex flex-col">
                        <small class="text-gray-300">
                            Details:
                            <span class="text-gray-400">
                                {{ todo.todo_details?.task_details || "N/A" }}
                            </span>
                        </small>
                        <small class="text-gray-300">
                            Notes:
                            <span class="text-gray-400">
                                {{ todo.todo_details?.note_details || "N/A" }}
                            </span>
                        </small>
                    </div>
                    <div class="flex flex-col">
                        <small class="text-gray-300">
                            Status:
                            <span class="text-gray-400">
                                {{ todo.todo_details?.status_details || "N/A" }}
                            </span>
                        </small>
                        <small class="text-gray-300">
                            Priority:
                            <span class="text-gray-400">
                                {{
                                    todo.todo_details?.priority_details || "N/A"
                                }}
                            </span>
                        </small>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-4">
            <span class="text-sm font-medium">
                {{ todo.completed ? "✅ Done" : "⏳ Pending" }}
            </span>

            <!-- Menu Button with Dropdown -->
            <div class="relative">
                <button
                    @click="toggleMenu"
                    class="text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-md transition-colors"
                    aria-label="Options menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                        />
                    </svg>
                </button>

                <!-- Dropdown Menu -->
                <div
                    v-if="openMenuId"
                    class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                >
                    <div class="py-1">
                        <button
                            class="w-full text-left px-4 py-2 text-sm text-gray-400 cursor-not-allowed flex items-center gap-2"
                            disabled
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                />
                            </svg>
                            Edit Details(Coming soon)
                        </button>

                        <button
                            class="w-full text-left px-4 py-2 text-sm text-gray-400 cursor-not-allowed flex items-center gap-2"
                            disabled
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path
                                    fill-rule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            Details (Coming soon)
                        </button>

                        <div class="border-t border-gray-200"></div>

                        <button
                            @click="handleDelete"
                            class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </li>

    <!-- Click outside to close menu -->
    <div v-if="openMenuId" @click="closeMenu" class="fixed inset-0 z-0"></div>
</template>
