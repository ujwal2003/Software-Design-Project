<script>
	import Header from '$lib/components/header.svelte';
    import Sidebar from './Sidebar.svelte';
    import FullName from './FullName.svelte';
    import PaymentInfo from './PaymentInfo.svelte';
    import Location from './Location.svelte';
    import Address from './Address.svelte';
</script>


<style>
    .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        padding: 20px;
    }

    .main-content {
        margin-left: 250px;
        margin-top: 60px;
    }

    .title {
        margin-top: 10px;
        margin-left: 300px;
        font-size: 30px;
        font-weight: 500;
    }
    
</style>

<div>
    <nav class="">
        <Header />
    </nav>

    <Sidebar />

    <h1 class="title">Dashboard</h1>
    <div class="main-content">
        <div class="container">

            <FullName />
            <PaymentInfo />
            <Location />
            <Address />
            

        </div>
    </div>
</div>
