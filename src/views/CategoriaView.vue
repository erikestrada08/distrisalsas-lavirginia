<template>
    <div class="Categoria">
        <v-container fluid class="h-100">
            <v-row 
            class="h-100"
            >
                <v-col cols="4">
                    <v-card 
                    elevation="16"
                    class="p-3"
                    >
            
                        <v-text-field
                        density="compact"
                        v-model="categoria.nombre"
                        label="categoria"
                        >
                        </v-text-field>
            
                        <v-text-field
                        density="compact"
                        v-model="categoria.descripcion"
                        label="Descripción"
                        >
                        </v-text-field>

                        <v-switch
                        color="success"
                        class="d-flex justify-content-center"
                        v-model="categoria.activo"
                        :label="categoria.activo ? 'Activo' : 'Inactivo'"
                        ></v-switch>
            
                        <v-btn 
                        type="submit" 
                        :color="accion ? 'success' : 'primary'"
                        block 
                        class="mt-2" 
                        @click="accion ? guardar() : editar()"
                        >{{ this.accion ? 'Guardar' : 'Actualizar' }}</v-btn>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                    elevation="16"
                    class="p-3"
                    style="height: 379px;"
                    >
                        <v-table
                        fixed-header
                        hover
                        density="compact"
                        height="300px"
                        >
                            <thead>
                            <tr>
                                <th class="text-left">
                                categoria
                                </th>
                                <th class="text-left">
                                Descripción
                                </th>
                                <th class="text-left">
                                Activo
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="(p,i) in categorias"
                                :key="i"
                                @click.prevent="seleccionar(p,'editar')"
                            >
                                <td>{{ p.nombre }}</td>
                                <td>{{ p.descripcion }}</td>
                                <td>{{ p.activo == 1 ? 'Si' : 'No' }}</td>
                            </tr>
                            </tbody>
                            <template v-slot:top>
                                <v-row>
                                    <v-col cols="10">
                                    <v-text-field
                                        density="compact"
                                        v-model="filtro"
                                        label="Filtro"
                                        clearable
                                    />
                                    </v-col>
                                    <v-col>
                                        <v-btn
                                        color="success"
                                        >
                                            <v-icon>
                                                mdi-file-excel
                                            </v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return{
            titulo: 'categorias',
            categoria: {
                id: null,
                nombre: '',
                descripcion: '',
                activo: true,
            },
            categorias:[],
            accion:true,
            filtro:'',
        }
    },
    methods: {
        guardar() {
            axios.post(
                'https://localhost:7128/api/categoria',this.categoria
            ).then((res)=>{
                console.log(res.data);
                this.obtenercategorias();
                this.categoria.nombre = "";
                this.categoria.descripcion = "";
                this.categoria.activo = true;             
            }).catch((err)=>{
                console.error(err);
            });
            this.accion = true;
        },
        seleccionar(categoria){
            this.categoria = {
                id: categoria.id,
                nombre: categoria.nombre,
                descripcion: categoria.descripcion,
                activo: categoria.activo,
            }
            this.accion = false;
        },
        editar(){
            axios.put(
                'https://localhost:7128/api/categoria/actualizar',this.categoria
            ).then(()=>{
                this.obtenercategorias();
                this.categoria.id = null
                this.categoria.nombre = "";
                this.categoria.descripcion = "";
                this.categoria.activo = true;  
                this.accion = true;    
            }).catch((err)=>{
                console.error(err);
            });
        },
        obtenercategorias(){
            axios.get(
                'https://localhost:7128/api/categoria/todos'
            ).then((res)=>{
                console.log(res.data);
                this.categorias = res.data;
            }).catch((err)=>{
                console.error(err);
            });
        },
    },
    mounted(){
        this.obtenercategorias();
    }
}

</script>
<style scoped>

</style>