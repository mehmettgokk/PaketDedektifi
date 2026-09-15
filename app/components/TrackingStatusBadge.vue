<script setup lang="ts">
import { computed } from 'vue' ;
import type { StandartPackageStatus } from '~~/types/tracking';

const props = defineProps<{
    status: StandartPackageStatus;
    statusText: string;
}>();

const badgeConfig = computed(() => {
    switch (props.status) {
        case 'PREPARING':
        return { bgClass: 'bg-secondary', iconClass: 'bi-box-seam' };
        case 'IN_TRANSIT':
        return { bgClass: 'bg-primary', iconClass: 'bi-truck' };
        case 'AT_HUB':
        return { bgClass: 'bg-info text-dark', iconClass: 'bi-buildings' };
        case 'OUT_FOR_DELIVERY':
        return { bgClass: 'bg-warning text-dark', iconClass: 'bi-bicycle' };
        case 'DELIVERED':
        return { bgClass: 'bg-success', iconClass: 'bi-check-circle-fill' };
        case 'EXCEPTION':
        default:
        return { bgClass: 'bg-danger', iconClass: 'bi-exclamation-triangle-fill' };
    }
});
</script>

<template>
    <span 
        class="badge rounded-pill px-3 py-2 fs-6 shadow-sm d-inline-flex align-items-center gap-2"
        :class="badgeConfig.bgClass"
    >
        <i :class="['bi', badgeConfig.iconClass]"></i>
        <span>{{ statusText }}</span>
    </span>
</template>
