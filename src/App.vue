<template>
  <v-app>
    <v-app-bar 
    app
    color="red-accent-4"
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-toolbar-title>
        <v-img 
        src="/logo-distrisalsas-del-eje-2.ico"  
        max-width="95"
        contain
        />
        <!-- @click="this.$router.push('dashboard')" -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer 
    v-if="login"
    v-model="drawer" 
    permanent
    :rail="true"
    >
      <v-list
      density="compact" 
      nav
      >
        <v-tooltip text="Facturas">
          <template v-slot:activator="{ props }">
            <v-list-item
            v-bind="props"
            prepend-icon="mdi-group"
            title="Facturas" 
            value="facturas"
            to="/facturas"
            @click="cambiarNombre('Facturas')"
            >
            </v-list-item>        
          </template>
        </v-tooltip>
        <v-tooltip text="Ordenes de Compra">
          <template v-slot:activator="{ props }">
            <v-list-item
            v-bind="props"
            prepend-icon="mdi-file-edit-outline"
            title="Orden de Compra" 
            value="orden-compra"
            to="/orden-compra"
            @click="cambiarNombre('Ordenes de Compra')"
            >
            </v-list-item>
          </template>
        </v-tooltip>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      login:false
    };
  },
  methods: {
    cambiarNombre(titulo) {
      document.title=titulo;
    },
  }
};
</script>
