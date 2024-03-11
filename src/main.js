import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; 
import('bootstrap/dist/css/bootstrap.css');
import('bootstrap/dist/js/bootstrap.bundle.min.js');
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp(App);

const usedComponents = [
  'VApp',
  'VAppBar',
  'VAppBarNavIcon',
  'VToolbarTitle',
  'VImg',
  'VSpacer',
  'VBtn',
  'VIcon',
  'VNavigationDrawer',
  'VList',
  'VListDensity',
  'VListNav',
  'VListItem',
  'VListItemGroup',
  'VMain',
  'VContainer',
];
const usedDirectives = ['v-model'];

const vuetify = createVuetify({
  components: usedComponents.reduce((acc, component) => {
    acc[component] = components[component];
    return acc;
  }, {}),
  directives: usedDirectives.reduce((acc, directive) => {
    acc[directive] = directives[directive];
    return acc;
  }, {}),
  icons: {
    defaultSet: 'mdi',
  },
});

app.use(store)
  .use(router)
  .use(vuetify)
  .use(VueAxios, axios)
  .mount('#app');
