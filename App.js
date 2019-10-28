import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TOTAL_BILL, TOTAL_TIP, PARTIAL_BILL } from './types';
export default function App() {
	const [ formValue, setFormValue ] = useState({
		totalBill: '',
		totalTip: '',
		partialBill: ''
	});

	const [ tipValue, setTipValue ] = useState({
		tipPercentage: '',
		tipPortion: ''
	});
	const { totalBill, totalTip, partialBill } = formValue;

	useEffect(
		() => {
			calculateTip({ percent: totalTip / totalBill * 100, fraction: totalTip / totalBill });
		},
		[ totalBill, totalTip, partialBill ]
	);

	const { tipPercentage, tipPortion } = tipValue;

	const calculateTip = (calc) => {
		const { percent, fraction } = calc;

		setTipValue({ ...tipValue, tipPercentage: percent, tipPortion: partialBill * fraction });
	};
	const handleInputOnChange = (action) => {
		if (action.type === TOTAL_BILL) {
			setFormValue({ ...formValue, totalBill: action.payload });
		} else if (action.type === TOTAL_TIP) {
			setFormValue({ ...formValue, totalTip: action.payload });
		} else if (action.type === PARTIAL_BILL) {
			setFormValue({ ...formValue, partialBill: action.payload });
		}
	};

	const handleOnKeyPress = () => {};

	return (
		<Grid style={styles.grid}>
			<Row style={styles.headerContainer} size={1}>
				<Text style={styles.header}>Tips Split</Text>
			</Row>
			<Row size={3} style={styles.bodyContainer}>
				<View style={{ marginBottom: '25px', marginTop: '25px' }}>
					<Text style={{ color: '#fff', fontWeight: 'bold', padding: '5px' }}>Total Bill</Text>
					<TextInput
						keyboardType="numeric"
						style={{ height: 40, backgroundColor: '#fff', fontWeight: 'bold', padding: '5px' }}
						placeholder="Total bill here!"
						onChangeText={(e) => handleInputOnChange({ type: TOTAL_BILL, payload: e })}
						value={totalBill}
						onKeyPress={handleOnKeyPress}
					/>
					<Text style={{ color: '#fff', fontSize: '10px' }}>Total bill without tips.</Text>
				</View>
				<View style={{ marginBottom: '25px' }}>
					<Text style={{ color: '#fff', fontWeight: 'bold', padding: '5px' }}>Total Tips</Text>
					<TextInput
						keyboardType="numeric"
						style={{ height: 40, backgroundColor: '#fff', fontWeight: 'bold', padding: '5px' }}
						placeholder="Total bill here!"
						onChangeText={(e) => handleInputOnChange({ type: TOTAL_TIP, payload: e })}
						value={totalTip}
					/>
					<Text style={{ color: '#fff', fontSize: '10px' }}>Total tips without bill.</Text>
				</View>
				<View style={{ marginBottom: '25px' }}>
					<Text style={{ color: '#fff', fontWeight: 'bold', padding: '5px' }}>Your portion of the bill</Text>
					<TextInput
						keyboardType="numeric"
						style={{ height: 40, backgroundColor: '#fff', fontWeight: 'bold', padding: '5px' }}
						placeholder="Total bill here!"
						onChangeText={(e) => handleInputOnChange({ type: PARTIAL_BILL, payload: e })}
						value={partialBill}
					/>
					<Text style={{ color: '#fff', fontSize: '10px' }}>your portion of the bill only.</Text>
				</View>

				<View style={{ marginBottom: '25px' }}>
					<Text style={{ color: '#fff', fontWeight: 'bold', padding: '5px' }}>
						Tips Percentage (%) : {(tipPercentage !== NaN && tipPercentage) || 0} %
					</Text>
					<Text style={{ color: '#fff', fontWeight: 'bold', padding: '5px' }}>
						Your Tips ($) :{' '}
						<Text style={{ color: '#39ff14', fontWeight: 'bold', padding: '5px' }}>
							{' '}
							${(tipPortion !== NaN && tipPortion) || 0}
						</Text>
					</Text>
				</View>
			</Row>
		</Grid>
	);
}

const styles = StyleSheet.create({
	grid: {
		flex: 1
	},
	header: {
		color: 'darkblue',
		fontSize: '25px',
		fontWeight: 'bold'
	},
	headerContainer: {
		justifyContent: 'center',
		backgroundColor: 'lightblue',
		flexDirection: 'column',
		alignItems: 'center'
	},
	bodyContainer: {
		backgroundColor: 'darkblue',
		flexDirection: 'column',
		alignItems: 'center'
	}
});
