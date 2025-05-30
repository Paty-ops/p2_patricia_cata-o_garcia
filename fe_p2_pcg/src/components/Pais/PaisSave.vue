<script setup lang="ts">
import type { Pais } from '@/models/Pais'
import http from '@/plugins/axios'
import { InputNumber } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'paises'
const props = defineProps({
    mostrar: Boolean,
    pais: {
        type: Object as () => Pais,
        default: () => ({}) as Pais,
    },
    modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
    get: () => props.mostrar,
    set: (value) => {
        if (!value) emit('close')
    },
})

const pais = ref<Pais>({ ...props.pais })
watch(
    () => props.pais,
    (newVal) => {
        pais.value = { ...newVal }
    },
)

async function handleSave() {
    try {
        const body = {
            id: pais.value.id,
            descripcion: pais.value.descripcion,
        }
        if (props.modoEdicion) {
            await http.patch(`${ENDPOINT}/${pais.value.id}`, body)
        } else {
            await http.post(ENDPOINT, body)
        }
        emit('guardar')
        pais.value = {} as Pais
        dialogVisible.value = false
    } catch (error: any) {
        alert(error?.response?.data?.message)
    }
}
</script>

<template>
    <div class="card flex justify-center">
        <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar' : 'Crear'" style="width: 25rem">
            <div class="flex items-center gap-4 mb-4">
                <label for="id" class="font-semibold w-4">id:</label>
                <InputText id="id" v-model="pais.id" class="flex-auto" autocomplete="off" autofocus />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="descripcion" class="font-semibold w-4">Descripcion:</label>
                <InputText id="decripcion" v-model="pais.descripcion" class="flex-auto" autocomplete="off" autofocus />
            </div>

            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary"
                    @click="dialogVisible = false"></Button>
                <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
            </div>
        </Dialog>
    </div>
</template>

<style scoped></style>
