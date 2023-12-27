<template>
    <div class="Producto h-100 w-100">
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
                        v-model="producto.nombre"
                        label="Producto"
                        >
                        </v-text-field>
            
                        <v-text-field
                        density="compact"
                        v-model="producto.descripcion"
                        label="Descripción"
                        >
                        </v-text-field>
            
                        <v-text-field
                        density="compact"
                        v-model="producto.precio"
                        label="Precio"
                        placeholder="$0"
                        class="text-rigth"
                        >
                        </v-text-field>
            
                        <v-select
                        density="compact"
                        clearable
                        label="Select"
                        :items="categorias"
                        item-title="nombre"
                        item-value="id"
                        v-model="producto.categoriaId"
                        ></v-select>

                        <v-switch
                        color="success"
                        class="d-flex justify-content-center"
                        v-model="producto.activo"
                        :label="producto.activo ? 'Activo' : 'Inactivo'"
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
                                Producto
                                </th>
                                <th class="text-left">
                                Descripción
                                </th>
                                <th class="text-right">
                                Precio
                                </th>
                                <th class="text-left">
                                Activo
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="(p,i) in productos"
                                :key="i"
                                @click.prevent="seleccionar(p,'editar')"
                            >
                                <td>{{ p.nombre }}</td>
                                <td>{{ p.descripcion }}</td>
                                <td class="text-right">{{ p.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}</td>
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
            titulo: 'Productos',
            producto: {
                id: null,
                nombre: '',
                descripcion: '',
                precio: '',
                activo: true,
                categoriaId:null,
            },
            productos:[],
            accion:true,
            filtro:'',
            categorias:[],
            categoria:null,
        }
    },
    methods: {
        guardar() {
            axios.post(
                'https://localhost:7128/api/Producto',this.producto
            ).then((res)=>{
                console.log(res.data);
                this.obtenerProductos();
                this.producto.nombre = "";
                this.producto.descripcion = "";
                this.producto.precio = "";
                this.producto.activo = true;     
                this.producto.categoriaId = null;         
            }).catch((err)=>{
                console.error(err);
            });
            this.accion = true;
        },
        seleccionar(producto){
            this.producto = {
                id: producto.id,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio: producto.precio,
                activo: producto.activo,
                categoriaId: producto.categoriaId != null ? this.categorias.find(c => c.id == producto.categoriaId).id : null
            }
            this.accion = false;
        },
        editar(){
            console.log(this.producto);
            const producto = {
                id: this.producto.id,
                nombre: this.producto.nombre,
                descripcion: this.producto.descripcion,
                precio: this.producto.precio,
                activo:this.producto.activo,
                categoriaId: this.categoriaId
            }
            console.log(producto);
            axios.put(
                'https://localhost:7128/api/Producto/actualizar',producto
            ).then(()=>{
                this.obtenerProductos();
                this.producto.id = null
                this.producto.nombre = "";
                this.producto.descripcion = "";
                this.producto.precio = "";
                this.producto.activo = true;  
                this.accion = true;
                this.producto.categoriaId = null;         
            }).catch((err)=>{
                console.error(err);
            });
        },
        obtenerProductos(){
            axios.get(
                'https://localhost:7128/api/Producto/todos'
            ).then((res)=>{
                console.log(res.data);
                this.productos = res.data;
            }).catch((err)=>{
                console.error(err);
            });
        },
        obtenerCategorias(){
            axios.get(
                'https://localhost:7128/api/Categoria/todos'
            ).then((res)=>{
                this.categorias = res.data;
            }).catch((err)=>{
                console.error(err);
            });
        }
    },
    mounted(){
        this.obtenerProductos();
        this.obtenerCategorias();
    }
}

</script>
<style scoped>

</style>