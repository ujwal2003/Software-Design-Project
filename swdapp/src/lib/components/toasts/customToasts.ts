import { toast } from "@zerodevx/svelte-toast";
import PrelineToast from "./prelineToast.svelte";

export const successAlert = (msg: string) => toast.push({
    component: {
        src: PrelineToast,
        props: {
            toastText: msg,
            toastType: "custom"
        }
    },

    theme: {
        '--toastBackground': 'rgb(204 251 241)',
        '--toastBorder': 'solid 0.02rem',
        '--toastBorderRadius': '0.5rem',
        '--toastColor': 'rgb(17 94 89)',
        '--toastBarBackground': 'rgb(45 212 191)'
    },

    dismissable: true
});

export const failureAlert = (msg: string) => toast.push({
    component: {
        src: PrelineToast,
        props: {
            toastText: msg,
            toastType: "custom"
        }
    },

    theme: {
        '--toastBackground': 'rgb(254 226 226)',
        '--toastBorder': 'solid 0.02rem',
        '--toastBorderRadius': '0.5rem',
        '--toastColor': 'rgb(153 27 27)',
        '--toastBarBackground': 'rgb(248 113 113)'
    },

    dismissable: true
});

export const genericAlert = (msg: string) => toast.push({
    component: {
        src: PrelineToast,
        props: {
            toastText: msg,
            toastType: "custom"
        }
    },

    theme: {
        '--toastBackground': 'rgb(219 234 254)',
        '--toastBorder': 'solid 0.02rem',
        '--toastBorderRadius': '0.5rem',
        '--toastColor': 'rgb(30 64 175)',
        '--toastBarBackground': 'rgb(96 165 250)'
    },

    dismissable: true
});

export const genericShortAlert = (msg: string) => toast.push({
    component: {
        src: PrelineToast,
        props: {
            toastText: msg,
            toastType: "custom"
        }
    },

    theme: {
        '--toastBackground': 'rgb(219 234 254)',
        '--toastBorder': 'solid 0.02rem',
        '--toastBorderRadius': '0.5rem',
        '--toastColor': 'rgb(30 64 175)',
        '--toastBarBackground': 'rgb(96 165 250)',
        '--toastBarHeight': 0
    },

    dismissable: true,
    duration: 980
});