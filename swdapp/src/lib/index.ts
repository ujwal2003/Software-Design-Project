// place files you want to import through the `$lib` alias in this folder.
export const hello = 'Hello from $lib!';

// global dummy data
// dummy data get actual data and format it from database
interface DummyQuoteData {
	_id: string;
	quoteDate: string;
	quoteTime: string;
	loc: string;
	deliveryDate: string;
	gallons: number;
	price: number;
	tax: number;
}

export let dummyUserData = {
	name: {
		firstName: 'John',
		middleName: 'Doe',
		lastName: 'Doe'
	},
	address: {
		address1: '1234 Main St',
		city: 'Houston',
		state: 'TX',
		zip: '77001'
	},
	payment: {
		cardName: 'John Doe',
		cardNumber: '1234567890123456',
		expDate: '12/24',
		cvv: '123'
	}
};

export let dummyQuoteData: DummyQuoteData[] = [
	{
		_id: 'da95101afa3ecfda46d1',
		quoteDate: '2/21/2024',
		quoteTime: '1:59pm',
		loc: 'houston',
		deliveryDate: '2/24/2024',
		gallons: 5,
		price: 2.86,
		tax: 3.14
	},
	{
		_id: '09075d1659108ae43ea4',
		quoteDate: '2/20/2024',
		quoteTime: '11:35am',
		loc: 'houston',
		deliveryDate: '2/23/2024',
		gallons: 3,
		price: 3.86,
		tax: 1.59
	},
	{
		_id: '1042af652e115fc669f3',
		quoteDate: '2/18/2024',
		quoteTime: '4:30pm',
		loc: 'houston',
		deliveryDate: '2/21/2024',
		gallons: 10,
		price: 5.86,
		tax: 2.65
	},
	{
		_id: 'c69380778bd5ed7be644',
		quoteDate: '2/17/2024',
		quoteTime: '9:30am',
		loc: 'houston',
		deliveryDate: '2/19/2024',
		gallons: 9,
		price: 4.86,
		tax: 3.58
	},
	{
		_id: '9e93bebe1a3ee38e761f',
		quoteDate: '2/16/2024',
		quoteTime: '8:30am',
		loc: 'houston',
		deliveryDate: '2/17/2024',
		gallons: 11,
		price: 6.86,
		tax: 2.58
	},
	{
		_id: 'd2e94c214cdae452bacb',
		quoteDate: '2/15/2024',
		quoteTime: '7:30am',
		loc: 'houston',
		deliveryDate: '2/16/2024',
		gallons: 2,
		price: 3.86,
		tax: 1.58
	},
	{
		_id: '50b4e00f06f3383dbc16',
		quoteDate: '2/11/2024',
		quoteTime: '6:30am',
		loc: 'houston',
		deliveryDate: '2/13/2024',
		gallons: 19,
		price: 7.86,
		tax: 3.78
	}
];

interface DummyPaymentData {
	_id: string;
	paymentDate: string;
	paymentTime: string;
	payment: number;
	quoteID: string;
}

export let dummyPaymentData: DummyPaymentData[] = [
	{
		_id: 'fa33707818129e3b3295',
		paymentDate: '2/21/2024',
		paymentTime: '2:10pm',
		payment: 10.45,
		quoteID: 'da95101afa3ecfda46d1'
	},
	{
		_id: 'fa1f775e6bd3f312aff2',
		paymentDate: '2/20/2024',
		paymentTime: '3:10pm',
		payment: 11.55,
		quoteID: '09075d1659108ae43ea4'
	},
	{
		_id: 'c2c9b3f1d8f265da9422',
		paymentDate: '2/19/2024',
		paymentTime: '4:10pm',
		payment: 12.65,
		quoteID: '1042af652e115fc669f3'
	},
	{
		_id: 'dbadeb849cca0a6303be',
		paymentDate: '2/18/2024',
		paymentTime: '5:10pm',
		payment: 13.75,
		quoteID: 'c69380778bd5ed7be644'
	}
];
