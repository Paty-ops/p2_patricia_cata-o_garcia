<script setup lang="ts">
import type { Serie } from '@/models/Series'
import http from '@/plugins/axios'
import { InputNumber } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, onMounted, ref, watch } from 'vue'
import Dropdown from 'primevue/dropdown'
import type { Pais } from '@/models/Pais'

const paises = ref<Pais[]>([])
onMounted(async () => {
    paises.value = await http.get('paises').then(res => res.data)
})

const ENDPOINT = 'series'
const props = defineProps({
    mostrar: Boolean,
    serie: {
        type: Object as () => Serie,
        default: () => ({}) as Serie,
    },
    modoEdicion: Boolean,
})

const idiomasDisponibles = [
    { label: 'Español', value: 'Español' },
    { label: 'Inglés', value: 'Inglés' },
    { label: 'Francés', value: 'Francés' },
    { label: 'Alemán', value: 'Alemán' },
    { label: 'Japonés', value: 'Japonés' },
]

const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
    get: () => props.mostrar,
    set: (value) => {
        if (!value) emit('close')
    },
})

const serie = ref<Serie>({ ...props.serie })
watch(
    () => props.serie,
    (newVal) => {
        serie.value = { ...newVal }
    },
)

async function handleSave() {
    try {
        const body = {
            titulo: serie.value.titulo,
            sinopsis: serie.value.sinopsis,
            director: serie.value.director,
            temporadas: serie.value.temporadas,
            fechaEstreno: serie.value.fechaEstreno,
        }
        if (props.modoEdicion) {
            await http.patch(`${ENDPOINT}/${serie.value.id}`, body)
        } else {
            await http.post(ENDPOINT, body)
        }
        emit('guardar')
        serie.value = {} as Serie
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
                <label for="titulo" class="font-semibold w-24">Titulo:</label>
                <InputText id="titulo" v-model="serie.titulo" class="flex-auto" autocomplete="off" autofocus />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="sinopsis" class="font-semibold w-24">Sinopsis:</label>
                <InputText id="sinopsis" v-model="serie.sinopsis" class="flex-auto" autocomplete="off" autofocus />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="director" class="font-semibold w-24">Director:</label>
                <InputText id="director" v-model="serie.director" class="flex-auto" autocomplete="off" autofocus />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="temporadas" class="font-semibold w-24">Temporadas:</label>
                <InputNumber id="sinopsis" v-model="serie.temporadas" class="flex-auto" autocomplete="off" autofocus />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="idiomaPrincipal" class="font-semibold w-24">Idioma Principal:</label>
                <Dropdown id="idiomaPrincipal" v-model="serie.idiomaPrincipal" :options="idiomasDisponibles"
                    optionLabel="label" optionValue="value" placeholder="Seleccione un idioma" class="flex-auto" />
            </div>

            <div class="flex items-center gap-4 mb-4">
                <label for="fechaestreno" class="font-semibold w-24">Fecha de Estreno:</label>
                <Calendar id="sinopsis" v-model="serie.fechaEstreno" class="flex-auto" autocomplete="off" autofocus />
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