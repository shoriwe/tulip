<script lang="ts">
	import {
		Button,
		ButtonGroup,
		NumberInput,
		InputAddon,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell
	} from 'flowbite-svelte';

	// Inputs
	let cash: number = 200;
	let leverage: number = 1;
	let open: number = 100;
	let close: number = 1000;
	let buy: boolean = true;
	// Results
	let gainsPercentage: number = 0;
	let gains: number = 0;
	let autoClosePrice: number = 0;
	let gainsCash: number = 0;

	$: {
		gainsPercentage = (buy ? 1 : -1) * ((close - open) / open);
		gains = cash + cash * gainsPercentage * leverage;
		if (leverage === 1) {
			autoClosePrice = 0;
		} else if (buy) {
			autoClosePrice = open - (open / leverage) / 2;
		} else {
			autoClosePrice = open + (open / leverage) / 2;
		}
		gainsCash = gains - cash;
	}
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
	<ButtonGroup>
		<InputAddon>$</InputAddon>
		<NumberInput min={1} bind:value={cash} placeholder="Cash" />
		<InputAddon>X</InputAddon>
		<NumberInput min={1} bind:value={leverage} placeholder="Leverage" />
	</ButtonGroup>
	<ButtonGroup>
		<Button color={buy ? 'green' : 'red'} on:click={() => (buy = !buy)}>
			{buy ? 'Buy' : 'Sell'}
		</Button>
		<InputAddon min={0}>Open Price</InputAddon>
		<NumberInput bind:value={open} placeholder="Open price" />
		<InputAddon>Close Price</InputAddon>
		<NumberInput min={0} bind:value={close} placeholder="Close price" />
	</ButtonGroup>
</div>

<Table>
	<TableHead>
		<TableHeadCell>Total</TableHeadCell>
		<TableHeadCell>{gains >= 0 ? 'Gains' : 'Loss'}</TableHeadCell>
		<TableHeadCell>{gains >= 0 ? 'Gains' : 'Loss'} Percentage</TableHeadCell>
		<TableHeadCell>Minimum price upon close</TableHeadCell>
		<TableHeadCell>Pillow</TableHeadCell>
	</TableHead>
	<TableBody>
		<TableBodyRow>
			<TableBodyCell>
				<p
					class={gainsPercentage > 0
						? 'text-green-500'
						: gainsPercentage == 0
						? 'text-black'
						: 'text-red-500'}
				>
					{gainsPercentage > 0 || gainsPercentage > -1 ? gains : -cash}
				</p>
			</TableBodyCell>
			<TableBodyCell>
				<p
					class={gainsPercentage > 0
						? 'text-green-500'
						: gainsPercentage == 0
						? 'text-black'
						: 'text-red-500'}
				>
					{gainsPercentage > 0 || gainsPercentage > -1 ? gainsCash : -cash}
				</p>
			</TableBodyCell>
			<TableBodyCell>
				<p
					class={gainsPercentage > 0
						? 'text-green-500'
						: gainsPercentage == 0
						? 'text-black'
						: 'text-red-500'}
				>
					{100 * (gainsPercentage > 0 || gainsPercentage > -1 ? gainsPercentage : -1)}%
				</p>
			</TableBodyCell>
			<TableBodyCell>{autoClosePrice}</TableBodyCell>
			<TableBodyCell>{(buy ? -1 : 1) * 100 * ((autoClosePrice - open) / open)}%</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>
