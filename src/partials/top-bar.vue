<template>

    <div class="top-bar">
        <div class="top-bar-left">
            <slot name="left"></slot>
        </div>
        <div class="top-bar-center">
            <slot></slot>
        </div>
        <div class="top-bar-right">
            <slot name="right"></slot>
        </div>
    </div>

</template>

<style lang="scss">

    .top-bar {
        z-index: 2000;

        position: fixed;
        top: 0;
        left: 0;

        width: 100%;
        padding: 20px 10px 10px;

        text-align: center;
        line-height: 1;

        a {
            color: #fff;
        }
    }

    .top-bar-left, .top-bar-right {
        position: absolute;
        top: 20px;

        & > * {
            display: inline-block;
            padding: 10px;
        }
    }

    .top-bar-left {
        right: 0;
    }

    .top-bar-center {
        display: none;
    }

    .top-bar-right {
        right: 0;
    }

</style>