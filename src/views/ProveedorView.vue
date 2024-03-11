<template>
    <div class="Proveedor h-100 w-100">
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
                            >Vincular Productos</v-btn>
                        </template>
                        <template v-slot:default="{ isActive }">
                            <v-card>
                                <v-toolbar
                                color="red-accent-4"
                                title="Productos Suplidos por este Proveedor 👇🏻"
                                ></v-toolbar>
                                <v-card-text>
                                    <v-row>
                                        <v-col>
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
                                        </v-col>
                                    </v-row>
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
            <v-row class="h-100">
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
                        v-model="proveedor.razonSocial"
                        label="proveedor"
                        >
                        </v-text-field>
            
                        <v-text-field
                        density="compact"
                        v-model="proveedor.telefono"
                        label="telefono"
                        >
                        </v-text-field>
            
                        <v-text-field
                        density="compact"
                        v-model="proveedor.paginaWeb"
                        label="Pagina Web"
                        >
                        </v-text-field>
            
                        <v-text-field
                        density="compact"
                        v-model="proveedor.correoElectronico"
                        label="Correo Electronico"
                        placeholder="ejemplo: usuario@gmail.com"
                        >
                        </v-text-field>

                        <v-select
                        density="compact"
                        clearable
                        label="Departamento"
                        :items="departamentos"
                        item-title="nombre"
                        item-value="id"
                        v-model="proveedor.departamento"
                        ></v-select>

                        <v-select
                        density="compact"
                        clearable
                        label="Ciudad"
                        :items="ciudades"
                        item-title="nombre"
                        item-value="id"
                        v-model="proveedor.ciudad"
                        ></v-select>

                        <v-text-field
                        density="compact"
                        v-model="proveedor.direccion"
                        label="Dirección"
                        placeholder="ejemplo: carrera 11 #8-98A"
                        >
                        </v-text-field>

                        <v-switch
                        color="red-accent-4"
                        class="d-flex justify-content-center"
                        v-model="proveedor.activo"
                        :label="proveedor.activo ? 'Activo' : 'Inactivo'"
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
                                Razón Social
                                </th>
                                <th class="text-left">
                                Telefono
                                </th>
                                <th class="text-right">
                                Pagina Web
                                </th>
                                <th class="text-right">
                                Correo Electrónico
                                </th>
                                <th class="text-right">
                                Departamento
                                </th>
                                <th class="text-right">
                                Ciudad
                                </th>
                                <th class="text-right">
                                Dirección
                                </th>
                                <th class="text-left">
                                Activo
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="(p,i) in proveedores"
                                :key="i"
                                @click.prevent="seleccionar(p,'editar')"
                            >
                                <td>{{ p.razonSocial }}</td>
                                <td>{{ p.telefono }}</td>
                                <td>{{ p.paginaWeb }}</td>
                                <td>{{ p.correoElectronico }}</td>
                                <td>{{ p.departamento }}</td>
                                <td>{{ p.ciudad }}</td>
                                <td>{{ p.direccion }}</td>
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
export default {
    data(){
        return {
            titulo: 'Proveedores',
            proveedor: {
                id:null,
                razonSocial:'',
                telefono:'',
                paginaWeb:'',
                correoElectronico:'',
                departamento:'',
                ciudad:'',
                direccion:'',
                activo:true,
            },
            departamentos:[],
            ciudades:[
                'Pereira',
                'Manizales'
            ],
            proveedores:[
                {
                    id:null,
                razonSocial:'',
                telefono:'',
                paginaWeb:'',
                correoElectronico:'',
                departamento:'',
                ciudad:'',
                direccion:'',
                activo:true,
                }
            ],
            filtro:'',
            accion:true,
            isActive:false,
            productos:[]
        }
    },
    methods:{
        seleccionar(){
            this.isActive = true;
        }
    }
}
</script>
<style scoped>

</style>