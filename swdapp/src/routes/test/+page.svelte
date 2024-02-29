<script lang="ts">
	//   import InputForm from "$lib/components/inputForm.svelte";

	//   let darkMode = false;
	//   let labels = ['Label 1', 'Label 2', 'Label 3'];
	//   let numInputs = 3;
	//   let fromDescription = {
	//     title: 'Full Name',
	//     button: 'Submit',
	//     top: '',
	//     bottom: ''
	//   };

	//   function handleInputChange(e: any) {
	//     console.log('Input changed:', e.detail);
	//   }

	//   function handleFormSubmit() {
	//     console.log('Form submitted');
	//   }

	let isOpen = false;

	import Card from "$lib/components/cards/card.svelte";

	function handleCardClick(e: CustomEvent<any>) {
		console.log(e.detail);
	}
</script>

<main class="flex justify-center mt-14">
	<div class="w-1/3">
		<Card cardID="2" on:cardClick={(e) => {handleCardClick(e)}} />
	</div>
</main>
