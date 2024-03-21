<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import InputForm from '$lib/components/inputForm.svelte';

	import { failureAlert, genericAlert, successAlert } from '$lib/components/toasts/customToasts';
	import { postRequest } from '$lib/requests';
	import { deleteCookie, setCookie } from '$lib/cookieUtil';

	const loginTopDescription =
		'Once you login, you can create new quotes, and set your quote search settings!';
	const loginBottomDescription = '';

	interface InputValue {
		inputLabel: string;
		inputValue: string;
	}

	let loginVals: InputValue[] = [];
	function handleLoginInputChange(e: any) {
		loginVals = e.detail;
	}

	async function handleLoginSubmit() {
		if(loginVals.length < 2 || !loginVals[0].inputValue || !loginVals[1].inputValue) {
			failureAlert('login fields cannot be empty!');
			return;
		}

		const loginReq = {
			username: loginVals[0].inputValue,
			password: loginVals[1].inputValue
		}

		const loginAPIRes = await postRequest('../api/auth/login', loginReq);
		const loginResJSON = await loginAPIRes.json();
		
		if(!loginResJSON.success) {
			const failReason = loginResJSON.response.failType;

			if(failReason == "invalid_user") {
				failureAlert(`${loginReq.username} not found, please register first if you do not have an account.`);
				return;
			} else if(failReason == "invalid_pass") {
				failureAlert("The password you entered is incorrect.");
				return;
			}

			failureAlert("login failed due to internal error, please try again");
			return;
		}

		successAlert("login succesful. Redirecting...");
		genericAlert("TODO: [REDIRECT TO PROFILE PAGE HERE]");

		deleteCookie('user_session');
		setCookie('user_session', JSON.stringify({
			username: loginReq.username,
			accessToken: loginResJSON.response.accessToken,
			refreshToken: loginResJSON.response.refreshToken
		}));
	}
</script>

<div class="flex h-screen flex-col">
	<nav>
		<Header />
	</nav>

	<main class="flex h-full max-w-full flex-wrap overflow-hidden overflow-x-hidden">
		<!-- left side -->
		<section class="flex h-full w-1/2 items-center justify-center bg-[#282828]">
			<quote class="flex flex-col gap-4 text-white">
				<p class="text-wrap text-center text-3xl font-bold italic">
					&ldquo;My car started to fly after using FuelFinder&rdquo;
				</p>
				<p class="flex flex-row-reverse pr-16 text-xl">- Generic Car Owner</p>
			</quote>
		</section>

		<!-- right side -->
		<section class="flex w-1/2 flex-wrap items-center justify-center bg-[#F0F5F8]">
			<div class="w-1/2">
				<InputForm
					numInputs={2}
					labels={['Username or Email', 'Password']}
					inputTypes={['text', 'password']}
					fromDescription={{
						title: 'Log In to Verify Your Brand New Account',
						button: 'Login',
						top: loginTopDescription,
						bottom: loginBottomDescription
					}}
					bind:formInputValues={loginVals}
					on:inputChange={handleLoginInputChange}
					on:formSubmit={handleLoginSubmit}
				/>
			</div>
		</section>
	</main>

	<footer>
		<Footer />
	</footer>
</div>
