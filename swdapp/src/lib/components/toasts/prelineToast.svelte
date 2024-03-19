<script lang="ts">
    type ToastType = "success" | "failure" | "generic";
    export let toastType: ToastType = "generic";

    export let toastText: string;

    type TailwindString = string;
    interface ToastStyle {
      background: TailwindString,
      border_color: TailwindString,
      text_color: TailwindString
    };

    export let customToastStyle: ToastStyle | {} = {};

    let toastStyles: string;
    if(customToastStyle) {
      // toastStyles = `max-w-xs ${customToastStyle.background}`
    } else if(toastType == "generic") {
      toastStyles = "max-w-xs bg-blue-100 border border-blue-200 text-sm text-blue-800 rounded-lg";
    } else if(toastType == "success") {
      toastStyles = "max-w-xs bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg";
    } else if(toastType == "failure") {
      toastStyles = "max-w-xs bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg";
    }
</script>

<div class={toastStyles} role="alert">
    <div class="flex p-4">
      {toastText}
    </div>
</div>