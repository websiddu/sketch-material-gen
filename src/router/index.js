import Vue from 'vue';
import Router from 'vue-router';
import Dialogs from '@/components/Dialogs/Dialogs';
import Icons from '@/components/Icons/Icons';
import IconsPng from '@/components/Icons/IconsPng';
import Charts from '@/components/Charts/Charts';
import Snackbar from '@/components/Snackbar/Snackbar';
import Forms from '@/components/Forms/Forms';
import Styles from '@/components/Styles/Styles';
import Menu from '@/components/Menu/Menu';
import Color from '@/components/Color/Color';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/dialogs',
      name: 'Dialogs',
      component: Dialogs,
    },
    {
      path: '/icons',
      name: 'Icons',
      component: Icons,
    },
    {
      path: '/icons-png',
      name: 'IconsPng',
      component: IconsPng,
    },
    {
      path: '/charts',
      name: 'Charts',
      component: Charts,
    },
    {
      path: '/snackbars',
      name: 'Snackbar',
      component: Snackbar,
    },
    {
      path: '/forms',
      name: 'Forms',
      component: Forms,
    },
    {
      path: '/styles',
      name: 'Styles',
      component: Styles,
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu,
    },
    {
      path: '/color',
      name: 'Color',
      component: Color,
    },
  ],
});

export default router;
