<template>
    <div class="cell-item">
        <div class="cell-icon">
            <slot name="icon"></slot>
        </div>
        <div class="cell-main">
            <div class="cell-title">
                <slot>{{ title }}</slot>
            </div>
            <div class="cell-label">
                <slot name="label">{{ label }}</slot>
            </div>
        </div>
        <div class="cell-footer">
            <span class="cell-extra">
                <slot name="extra">{{ extra }}</slot>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: ""
        },
        extra: {
            type: String,
            default: ""
        }
    }
};
</script>