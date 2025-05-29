<script>
    export let customClass = "";
</script>

<div class="bg-cards w-full rounded-cards p-6 md:p-10 2xl:p-12 flex flex-col overflow-hidden {customClass}">
    <slot></slot>
</div>