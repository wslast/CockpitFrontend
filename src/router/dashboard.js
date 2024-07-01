import person from '@/pages/dashboard/person/index.vue';
import organ from '@/pages/dashboard/organ/index.vue';
export default [
    {
        path: '/portrait/person',
        name: 'person',
        component: person,
    },
    {
        path: '/portrait/organ',
        name: 'organ',
        component: organ,
    },
];
