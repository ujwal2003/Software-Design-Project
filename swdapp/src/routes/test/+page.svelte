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

	function handleCardClick(e: CustomEvent<any>) {
		console.log(e.detail);
	}
</script>

<main class="flex justify-center mt-14">
	<div class="w-1/2">

		<CardContainer>
			<Card cardID="1" btnName={"Card Details"} on:cardClick={(e) => {handleCardClick(e)}}>
				<CardText title={true}>
					Title
				</CardText>
				<CardText>
					description
				</CardText>
			</Card>

			<Card cardID="2" btnName={"Card Details"} on:cardClick={(e) => {handleCardClick(e)}}>
				<CardText title={true}>
					Title
				</CardText>
				<CardText>
					description
				</CardText>
			</Card>

			<Card cardID="3" btnName={"Card Details"} on:cardClick={(e) => {handleCardClick(e)}}>
				<CardText title={true}>
					Title
				</CardText>
				<CardText>
					description
				</CardText>
			</Card>

			<Card cardID="4" btnName={"Card Details"} on:cardClick={(e) => {handleCardClick(e)}}>
				<CardText title={true}>
					Title
				</CardText>
				<CardText>
					description
				</CardText>
			</Card>

			<Card cardID="5" btnName={"Card Details"} on:cardClick={(e) => {handleCardClick(e)}}>
				<CardText title={true}>
					Title
				</CardText>
				<CardText>
					description
				</CardText>
			</Card>
		</CardContainer>


	</div>
</main>
