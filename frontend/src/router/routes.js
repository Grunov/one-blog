import Posts from '@/views/Posts';
import Post from '@/views/Post';
import Signin from '@/views/Signin';
import Signup from '@/views/Signup';
import Dashboard from '@/views/dashboard/index';
import MyPosts from '@/views/dashboard/Posts';
import CreatePost from '@/views/dashboard/CreatePost';
import EditPost from '@/views/dashboard/EditPost';
import guestMiddleware from './middlewares/guest.middleware';
import authMiddleware from './middlewares/auth.middleware';
import store from '@/store/index';

import {
  _set_errors
} from '@/store/constants'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'posts'
  },
  {
    path: '/posts',
    name: 'posts',
    redirect: '/posts/page/1',
    component: Posts,
  },
  {
    path: '/posts/page/:number',
    name: 'posts-page',
    component: Posts,
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: Post,
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
    meta: {
      middleware: [
        guestMiddleware
      ]
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      middleware: [
        guestMiddleware
      ]
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: {name: 'my-posts'},
    component: Dashboard,
    meta: {
      middleware: [
        authMiddleware
      ]
    },
    children: [
      {
        path: 'my-posts',
        name: 'my-posts',
        component: MyPosts,
        meta: {
          middleware: [
            authMiddleware
          ]
        },
      },
      {
        path: 'my-posts/edit/:id',
        name: 'edit-post',
        component: EditPost,
        beforeEnter: (to, from, next) => {
          store.commit(`post/${_set_errors}`, null);
          next();
        },
        meta: {
          middleware: [
            authMiddleware
          ]
        },
      },
      {
        path: 'create',
        name: 'create-post',
        component: CreatePost,
        beforeEnter: (to, from, next) => {
          store.commit(`post/${_set_errors}`, null);
          next();
        },
        meta: {
          middleware: [
            authMiddleware
          ]
        },
      }
    ],
  },
  {
    path: '*',
    component: () => import('@/views/NotFound')
  }
];

export default routes;
