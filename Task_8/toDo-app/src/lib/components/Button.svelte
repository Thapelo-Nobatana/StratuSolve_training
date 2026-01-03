<script>
// @ts-nocheck

  let {
    children,
    type = 'button',
    variant = 'primary',
    disabled = false,
    onClick
  } = $props();

  const base =
    'px-4 py-2 w-full  rounded font-medium transition focus:outline-none focus:ring';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300',
    secondary: 'bg-gray-300 text-black hover:bg-gray-400 focus:ring-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300'
  };
</script>

<button
  type={type}
  disabled={disabled}
  class={`${base} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  onclick={onClick}
>
  {@render children?.()}
</button>