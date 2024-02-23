<script lang="ts">
    import InputForm from "$lib/components/inputForm.svelte";
  
    let darkMode = false;
    let labels = ['Label 1', 'Label 2', 'Label 3'];
    let numInputs = 3;
    let fromDescription = {
      title: 'Full Name',
      button: 'Submit',
      top: '',
      bottom: ''
    };
  
    function handleInputChange(e: any) {
      console.log('Input changed:', e.detail);
    }
  
    function handleFormSubmit() {
      console.log('Form submitted');
    }
  </script>
  
  <InputForm
    darkMode={darkMode}
    labels={labels}
    numInputs={numInputs}
    fromDescription={fromDescription}
    on:inputChange={handleInputChange}
    on:formSubmit={handleFormSubmit}
  />
  