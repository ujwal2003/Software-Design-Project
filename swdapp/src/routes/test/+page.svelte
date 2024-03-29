<script lang="ts">
	import FormButton from "$lib/components/submission-form/formButton.svelte";
	import FormInput from "$lib/components/submission-form/formInput.svelte";
	import FormText from "$lib/components/submission-form/formText.svelte";
	import SubmitForm from "$lib/components/submission-form/submitForm.svelte";
</script>

<main class="flex justify-center mt-14">
	<SubmitForm>
		<FormText title>Test</FormText>
		<FormText description>
			{@html "This is a description with a <a href='https://www.google.com/' target='_blank'><u>link!</u></a>"}
		</FormText>

		<FormInput inputType='text' placeholderText='placeholder 1' on:formInput={(e) => {console.log(e.detail)}} />
		<FormInput inputType='password' placeholderText='placeholder 2' />

		<FormButton justify='end' on:formClick={(e) => {console.log(e)}}>
			button
		</FormButton>

		<FormText description>
			bottom text
		</FormText>
	</SubmitForm>
</main>