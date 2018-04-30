import React from 'react';
import TextField from 'material-ui/TextField';
import { FormHelperText, FormControl } from 'material-ui/Form';

export default ({
	setMultiline,
	setFullWidth,
	placeholder,
	setFocus,
	input,
	formFieldsType,
	label,
	style,
	meta: { error, touched }
}) => {
	const helperText = () => {
		if (touched && error) {
			return (
				<FormControl style={{ marginLeft: '8px' }} error>
					<FormHelperText>{error}</FormHelperText>
				</FormControl>
			);
		}
	};
	//'style' comes from 'formFields' styles. See props.
	const subWidth = style === undefined ? {} : style.subWidth;
	return (
		<div style={({ display: 'flex', flexDirection: 'column' }, subWidth)}>
			<TextField
				InputLabelProps={{
					shrink: true
				}}
				autoFocus={setFocus}
				multiline={setMultiline}
				placeholder={placeholder}
				id="name"
				type={formFieldsType}
				label={label}
				margin="normal"
				style={style}
				fullWidth={setFullWidth}
				{...input}
			/>
			{helperText()}
		</div>
	);
};
