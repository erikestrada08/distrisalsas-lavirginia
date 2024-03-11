<template>
    <div class="Producto h-100 w-100">
        <v-container fluid class="h-100">
            <v-row>
                <v-col class="pb-0">
                    <v-dialog
                    transition="dialog-bottom-transition"
                    width="auto"
                    >
                        <template v-slot:activator="{ props }">
                            <v-btn
                                color="red-accent-4"
                                variant="outlined"
                                elevation="16"
                                v-bind="props"
                                class="mr-2"
                            >Agregar Marca</v-btn>
                        </template>
                        <template v-slot:default="{ isActive }">
                            <v-card>
                                <v-toolbar
                                color="red-accent-4"
                                title="Agrega una Nueva Marca 👇🏻"
                                ></v-toolbar>
                                <v-card-text>
                                    <!-- <v-row>
                                        <v-col>
                                        </v-col>
                                    </v-row> -->
                                </v-card-text>
                                <v-card-actions class="justify-end">
                                    <v-btn
                                        variant="text"
                                        @click="isActive.value = false"
                                    >Cerrar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                    <v-dialog
                    transition="dialog-bottom-transition"
                    width="auto"
                    >
                        <template v-slot:activator="{ props }">
                            <v-btn
                                color="red-accent-4"
                                variant="outlined"
                                elevation="16"
                                v-bind="props"
                                class="mr-2"
                            >Agregar Referencia</v-btn>
                        </template>
                        <template v-slot:default="{ isActive }">
                            <v-card>
                                <v-toolbar
                                color="red-accent-4"
                                title="Agrega una Nueva Referencia 👇🏻"
                                ></v-toolbar>
                                <v-card-text>
                                    <!-- <v-row>
                                        <v-col>
                                        </v-col>
                                    </v-row> -->
                                </v-card-text>
                                <v-card-actions class="justify-end">
                                    <v-btn
                                        variant="text"
                                        @click="isActive.value = false"
                                    >Cerrar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                    <v-dialog
                    transition="dialog-bottom-transition"
                    width="auto"
                    >
                        <template v-slot:activator="{ props }">
                            <v-btn
                                color="red-accent-4"
                                variant="outlined"
                                elevation="16"
                                v-bind="props"
                            >Agregar Categoría</v-btn>
                        </template>
                        <template v-slot:default="{ isActive }">
                            <v-card>
                                <v-toolbar
                                color="red-accent-4"
                                title="Agrega una Nueva Categoría 👇🏻"
                                ></v-toolbar>
                                <v-card-text>
                                    <!-- <v-row>
                                        <v-col>
                                        </v-col>
                                    </v-row> -->
                                </v-card-text>
                                <v-card-actions class="justify-end">
                                    <v-btn
                                        variant="text"
                                        @click="isActive.value = false"
                                    >Cerrar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </v-col>
            </v-row>
            <v-row 
            class="h-100"
            >
                <v-col
                xs="12"
                sm="6"
                md="4"
                lg="4"
                xl="4"
                >
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
                        v-model="producto.referencia"
                        label="Referencia"
                        >
                        </v-text-field>

                        <!-- <v-text-field
                        density="compact"
                        v-model="producto.marca"
                        label="Marca"
                        >
                        </v-text-field> -->
                        <v-select
                        density="compact"
                        clearable
                        label="Marca"
                        :items="marcas"
                        item-title="marca"
                        item-value="id"
                        v-model="producto.marcaId"
                        ></v-select>
            
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
                        label="Categoría"
                        :items="categorias"
                        item-title="nombre"
                        item-value="id"
                        v-model="producto.categoriaId"
                        ></v-select>

                        <v-switch
                        color="red-accent-4"
                        class="d-flex justify-content-center"
                        v-model="producto.activo"
                        :label="producto.activo ? 'Activo' : 'Inactivo'"
                        ></v-switch>
            
                        <v-btn 
                        type="submit" 
                        :color="accion ? 'red-accent-4' : 'primary'"
                        block 
                        class="mt-2" 
                        @click="accion ? guardar() : editar()"
                        >{{ this.accion ? 'Guardar' : 'Actualizar' }}</v-btn>
                    </v-card>
                </v-col>
                <v-col
                xs="12"
                sm="6"
                md="8"
                lg="8"
                xl="8"
                >
                    <v-card
                    elevation="16"
                    class="p-3"
                    style="height: 379px;"
                    >
                        <v-table
                        fixed-header
                        hover
                        density="compact"
                        height="280px"
                        >
                            <thead>
                            <tr>
                                <th class="text-left">
                                Producto
                                </th>
                                <th class="text-left">
                                Categoria
                                </th>
                                <th class="text-left">
                                Referencia
                                </th>
                                <th class="text-left">
                                Marca
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
                                @click.prevent="seleccionar(p)"
                                class="table"
                            >
                                <td>{{ p.producto }}</td>
                                <td>{{ p.categoria }}</td>
                                <td>{{ p.referencia }}</td>
                                <td>{{ p.marca }}</td>
                                <td>{{ p.descripcion }}</td>
                                <td class="text-right">${{ p.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}</td>
                                <td>{{ p.activo == 1 ? 'Si' : 'No' }}</td>
                            </tr>
                            </tbody>
                            <template v-slot:top>
                                <v-row>
                                    <v-col>
                                    <v-text-field
                                        density="compact"
                                        v-model="filtro"
                                        label="Filtro"
                                        clearable
                                    />
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
                referencia:'',
                marcaId:null,
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
            marcas:[],
            isActive:false
        }
    },
    methods: {
        guardar() {
            console.log(this.producto);
            // axios.post(
            //     'https://localhost:7128/api/Producto',this.producto
            // ).then((res)=>{
            //     console.log(res.data);
            //     this.obtenerProductos();
            //     this.producto.nombre = "";
            //     this.producto.descripcion = "";
            //     this.producto.precio = "";
            //     this.producto.activo = true;     
            //     this.producto.categoriaId = null;         
            // }).catch((err)=>{
            //     console.error(err);
            // });
            this.accion = true;
        },
        seleccionar(producto){
            console.log(producto);
            this.producto = {
                id: producto.productoId,
                nombre: producto.producto,
                referencia: producto.referencia,
                marcaId: producto.marcaId != 0 ? this.marcas.find(m => m.id == producto.marcaId).id : null,
                descripcion: producto.descripcion,
                precio: producto.precio,
                activo: producto.activo,
                categoriaId: producto.categoriaId != 0 ? this.categorias.find(c => c.id == producto.categoriaId).id : null
            }
            this.accion = false;
        },
        editar(){
            const producto = {
                id: this.producto.id,
                nombre: this.producto.nombre,
                descripcion: this.producto.descripcion,
                precio: this.producto.precio,
                activo:this.producto.activo,
                categoriaId: this.producto.categoriaId
            }
            axios.put(
                'https://localhost:7128/api/Producto/actualizar',producto
            ).then(()=>{
                this.obtenerProductos();       
            }).catch((err)=>{
                console.error(err);
            }).finally(()=>{
                this.producto.id = null
                this.producto.nombre = "";
                this.producto.referencia = "";
                this.producto.marcaId = null;
                this.producto.descripcion = "";
                this.producto.precio = "";
                this.producto.activo = true;  
                this.accion = true;
                this.producto.categoriaId = null;  
            });
        },
        obtenerProductos(){
            axios.get(
                'https://localhost:7128/api/Producto/todosLosProductos'
            ).then((res)=>{
                this.productos = res.data;
                console.log(res.data);
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
        },
        async obtenerMarcas(){
            await axios.get(
                'https://localhost:7128/api/Marca/Marcas'
            ).then((res)=>{
                this. marcas = res.data;
                console.log(res.data);
            }).catch((err)=>{
                console.error(err);
            });
        }
    },
    mounted(){
        this.obtenerProductos();
        this.obtenerCategorias();
        this.obtenerMarcas();
    }
}

</script>
<style scoped>
.table td{
    white-space: nowrap;
}
</style>