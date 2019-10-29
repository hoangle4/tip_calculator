import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
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
		<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
			<Grid style={styles.grid}>
				<Row style={styles.headerContainer} size={1}>
					<Text style={styles.header}>Tips Split</Text>
				</Row>
				<Row size={3} style={styles.bodyContainer}>
					<View style={{ marginBottom: 25, marginTop: 25 }}>
						<Text style={{ color: '#fff', fontWeight: 'bold', padding: 5 }}>Total Bill</Text>
						<TextInput
							keyboardType="numeric"
							style={{ height: 40, backgroundColor: '#fff', fontWeight: 'bold', padding: 5 }}
							placeholder="Total bill here!"
							onChangeText={(e) => handleInputOnChange({ type: TOTAL_BILL, payload: e })}
							value={totalBill}
							onKeyPress={handleOnKeyPress}
						/>
						<Text style={{ color: '#fff', fontSize: 10 }}>Total bill without tips.</Text>
					</View>
					<View style={{ marginBottom: 25 }}>
						<Text style={{ color: '#fff', fontWeight: 'bold', padding: 5 }}>Total Tips</Text>
						<TextInput
							keyboardType="numeric"
							style={{ height: 40, backgroundColor: '#fff', fontWeight: 'bold', padding: 5 }}
							placeholder="Total bill here!"
							onChangeText={(e) => handleInputOnChange({ type: TOTAL_TIP, payload: e })}
							value={totalTip}
						/>
						<Text style={{ color: '#fff', fontSize: 10 }}>Total tips without bill.</Text>
					</View>
					<View style={{ marginBottom: 25 }}>
						<Text style={{ color: '#fff', fontWeight: 'bold', padding: 5 }}>Your portion of the bill</Text>
						<TextInput
							keyboardType="numeric"
							style={{ height: 40, backgroundColor: '#fff', fontWeight: 'bold', padding: 5 }}
							placeholder="Total bill here!"
							onChangeText={(e) => handleInputOnChange({ type: PARTIAL_BILL, payload: e })}
							value={partialBill}
						/>
						<Text style={{ color: '#fff', fontSize: 10 }}>your portion of the bill only.</Text>
					</View>

					<View style={{ marginBottom: 25 }}>
						<Text style={{ color: '#fff', fontWeight: 'bold', padding: 5 }}>
							Tips Percentage (%) : {(tipPercentage !== NaN && tipPercentage) || 0} %
						</Text>
						<Text style={{ color: '#fff', fontWeight: 'bold', padding: 5 }}>
							Your Tips ($) :{' '}
							<Text style={{ color: '#39ff14', fontWeight: 'bold', padding: 5, fontSize: 20 }}>
								{' '}
								${(tipPortion !== NaN && tipPortion) || 0}
							</Text>
						</Text>
					</View>
				</Row>
			</Grid>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	grid: {
		flex: 1
	},
	header: {
		color: 'darkblue',
		fontSize: 25,
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
		paddingLeft: 35,
		paddingRight: 35,
		alignItems: 'stretch'
	}
});
