<script lang="ts">
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
		<FormInput inputType='text' placeholderText=''>

		</FormInput>
	</SubmitForm>
</main>
