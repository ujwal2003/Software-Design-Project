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

	import CardContainer from "$lib/components/cards/cardContainer.svelte";
	import Card from "$lib/components/cards/card.svelte";
	import CardText from "$lib/components/cards/cardText.svelte";

	const cards = [
		{_id: "1", title: "title 1", text: "lorem ipsum dolor"},
		{_id: "2", title: "title 2", text: "abcdefghijklmnopqrstuvwxyz"},
		{_id: "3", title: "title 3", text: "description"},
		{_id: "4", title: "title 4", text: "text"},
		{_id: "5", title: "title 5", text: "card text"},
	]

	function handleCardClick(e: CustomEvent<any>) {
		console.log(e.detail);
	}
</script>

<main class="flex justify-center mt-14">
	<div class="w-1/4">

		<CardContainer>
			{#each cards as card}
				<Card cardID={card._id} btnName={"Card Details"} on:cardClick={(e) => {handleCardClick(e)}}>
					<CardText title={true}>
						{card.title}
					</CardText>
					<CardText>
						{card.text}
					</CardText>
				</Card>
			{/each}
		</CardContainer>

	</div>
</main>
