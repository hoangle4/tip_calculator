import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TOTAL_BILL, TOTAL_TIP, PARTIAL_BILL } from './types';
export default function App() {
	const [ formValue, setFormValue ] = useState({
		totalBill: '',
		totalTip: '',
		partialBill: ''
	});
	const [ tipPercentage, setTipPercentage ] = useState(0);
	const [ tipPortion, setTipPortion ] = useState(0);

	const { totalBill, totalTip, partialBill } = formValue;
	const handleInputOnChange = (action) => {
		switch (action.type) {
			case TOTAL_BILL:
				setFormValue({ ...formValue, totalBill: action.payload });
				calculateData();
				break;
			case TOTAL_TIP:
				setFormValue({ ...formValue, totalTip: action.payload });
				calculateData();
				break;
			case PARTIAL_BILL:
				setFormValue({ ...formValue, partialBill: action.payload });
				calculateData();
				break;
			default:
				break;
		}
	};

	const calculateData = () => {
		setTipPercentage(totalTip / totalBill);
		setTipPortion(tipPercentage * partialBill);
		return;
	};
	return (
		<Grid style={styles.grid}>
			<Row style={styles.headerContainer} size={1}>
				<Text style={styles.header}>Tip Split</Text>
			</Row>
			<Row size={3} style={styles.bodyContainer}>
				<View style={{ marginBottom: '25px', marginTop: '25px' }}>
					<Text style={{ color: '#fff' }}>Total Bill</Text>
					<TextInput
						keyboardType="numeric"
						style={{ height: 40, backgroundColor: '#fff' }}
						placeholder="Total bill here!"
						onChangeText={(e) => handleInputOnChange({ type: TOTAL_BILL, payload: e })}
						value={totalBill}
					/>
					<Text style={{ color: '#fff', fontSize: '10px' }}>Total bill without tips.</Text>
				</View>
				<View style={{ marginBottom: '25px' }}>
					<Text style={{ color: '#fff' }}>Total Tips</Text>
					<TextInput
						keyboardType="numeric"
						style={{ height: 40, backgroundColor: '#fff' }}
						placeholder="Total bill here!"
						onChangeText={(e) => handleInputOnChange({ type: TOTAL_TIP, payload: e })}
						value={totalTip}
					/>
					<Text style={{ color: '#fff', fontSize: '10px' }}>Total tips without bill.</Text>
				</View>
				<View style={{ marginBottom: '25px' }}>
					<Text style={{ color: '#fff' }}>Your portion of the bill</Text>
					<TextInput
						keyboardType="numeric"
						style={{ height: 40, backgroundColor: '#fff' }}
						placeholder="Total bill here!"
						onChangeText={(e) => handleInputOnChange({ type: PARTIAL_BILL, payload: e })}
						value={partialBill}
					/>
					<Text style={{ color: '#fff', fontSize: '10px' }}>your portion of the bill only.</Text>
				</View>

				<View style={{ marginBottom: '25px' }}>
					<Text style={{ color: '#fff' }}>Tips Percentage (%) : {tipPercentage}</Text>
					<Text style={{ color: '#fff' }}>Your Tips ($) : {tipPortion}</Text>
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
		fontSize: '25px'
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
